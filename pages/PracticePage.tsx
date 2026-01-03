
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Fretboard from '../components/Fretboard';
import TabStaff from '../components/TabStaff';
import Transport from '../components/Transport';
import { Target, Activity, Eye, Layers, ChevronDown, Music2, Box, Type } from 'lucide-react';
import { Marker, SequenceNote } from '../types';
import { audioEngine } from '../services/audio';
import { INTERVAL_COLORS } from '../constants';
import { DRILL_PRESETS, DrillPreset } from '../data/sequences';
import { generateCagedMarkers, generate3NPSMarkers } from '../utils/theory';

const PracticePage: React.FC = () => {
  // State
  const [selectedPreset, setSelectedPreset] = useState<DrillPreset>(DRILL_PRESETS[0]);
  const [sequence, setSequence] = useState<SequenceNote[]>(DRILL_PRESETS[0].sequence);
  
  // Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [bpm, setBpm] = useState(DRILL_PRESETS[0].bpm); 
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  
  // Drill Config
  const [learningMode, setLearningMode] = useState<'FULL' | 'GHOST' | 'BLIND'>('FULL');
  const [showPatternContext, setShowPatternContext] = useState(true);
  const [showNoteNames, setShowNoteNames] = useState(false); // New state

  // Overlay Config
  const [overlayMode, setOverlayMode] = useState<'NONE' | 'CAGED' | '3NPS'>('NONE');
  const [overlayRoot, setOverlayRoot] = useState('C');
  const [cagedForm, setCagedForm] = useState('C');
  const [npsPosition, setNpsPosition] = useState(1);
  
  // Refs for timing
  const timerRef = useRef<number | null>(null);

  // Handle Preset Change
  const handlePresetChange = (presetId: string) => {
    const newPreset = DRILL_PRESETS.find(p => p.id === presetId);
    if (newPreset) {
        setIsPlaying(false);
        setCurrentNoteIndex(-1);
        setSelectedPreset(newPreset);
        setSequence(newPreset.sequence);
        setBpm(newPreset.bpm);
    }
  };

  // Playback Loop
  useEffect(() => {
    if (isPlaying) {
      const msPerBeat = 60000 / bpm;
      
      const playNext = () => {
        setCurrentNoteIndex(prev => {
          let next = prev + 1;
          
          if (next >= sequence.length) {
            if (isLooping) {
                next = 0; // Loop back
            } else {
                setIsPlaying(false);
                return -1; // End of drill
            }
          }
          
          // Audio
          const note = sequence[next];
          if (note) {
              audioEngine.playTone(audioEngine.midiToFreq(note.midi), 0.3);
              audioEngine.playClick(next === 0); 
          }
          
          return next;
        });
      };

      if (currentNoteIndex === -1) playNext();

      timerRef.current = window.setInterval(playNext, msPerBeat);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm, sequence, isLooping]);

  // Derived Overlay Markers
  const overlayMarkers = useMemo(() => {
    if (overlayMode === 'CAGED') {
      return generateCagedMarkers(overlayRoot, cagedForm);
    }
    if (overlayMode === '3NPS') {
      return generate3NPSMarkers(overlayRoot, npsPosition);
    }
    return [];
  }, [overlayMode, overlayRoot, cagedForm, npsPosition]);

  // Derived Markers for Visualization
  const activeMarkers = useCallback(() => {
    const idx = currentNoteIndex === -1 ? 0 : currentNoteIndex;
    const currentNote = sequence[idx];
    
    let nextNote = sequence[idx + 1];
    if (!nextNote && isLooping) nextNote = sequence[0];

    const seqRootMidi = sequence[0]?.midi || 0;

    const getRelativeColor = (noteMidi: number) => {
        const interval = (noteMidi - seqRootMidi + 120) % 12;
        const map: Record<number, string> = {
            0: 'R', 1: 'b2', 2: '2', 3: 'b3', 4: '3', 5: '4', 
            6: 'b5', 7: '5', 8: 'b6', 9: '6', 10: 'b7', 11: '7'
        };
        return INTERVAL_COLORS[map[interval]] || '#94a3b8';
    }

    const markers: Marker[] = [];

    // 1. Current Note
    if (currentNote) {
       markers.push({
         string: currentNote.string,
         fret: currentNote.fret,
         label: 'R', 
         finger: learningMode === 'BLIND' ? undefined : currentNote.finger,
         color: getRelativeColor(currentNote.midi),
         isPulse: true,
         variant: 'filled',
         opacity: 1
       });
    }

    // 2. Next Note
    if (nextNote && learningMode !== 'BLIND') {
        markers.push({
            string: nextNote.string,
            fret: nextNote.fret,
            finger: learningMode === 'FULL' ? nextNote.finger : undefined, 
            color: getRelativeColor(nextNote.midi),
            isGhost: true,
            variant: 'hollow',
            opacity: 1
        });
    }

    // 3. Context (Drill Sequence)
    if (showPatternContext && learningMode !== 'BLIND') {
        sequence.forEach((n, i) => {
            const isCurrent = i === idx;
            const isNext = (i === idx + 1) || (isLooping && idx === sequence.length - 1 && i === 0);
            
            if (!isCurrent && !isNext) {
                markers.push({
                    string: n.string,
                    fret: n.fret,
                    finger: undefined,
                    color: getRelativeColor(n.midi),
                    variant: 'small',
                    opacity: 0.2, 
                });
            }
        });
    }

    return markers;
  }, [currentNoteIndex, sequence, learningMode, isLooping, showPatternContext]);


  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200">
      
      {/* 3-Pane Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Controls */}
        <div className="w-80 flex flex-col border-r border-slate-800 bg-slate-900/50">
          
          {/* Header & Drill Selector */}
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center">
                <Music2 size={14} className="mr-2" /> Active Drill
            </h2>
            
            <div className="relative">
                <select 
                    value={selectedPreset.id}
                    onChange={(e) => handlePresetChange(e.target.value)}
                    className="w-full appearance-none bg-slate-800 border border-slate-600 text-white font-bold text-sm rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer hover:bg-slate-750 transition-colors"
                >
                    {DRILL_PRESETS.map(preset => (
                        <option key={preset.id} value={preset.id}>
                            {preset.name}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={16} />
            </div>

            <p className="mt-3 text-xs text-slate-400 leading-relaxed border-l-2 border-slate-700 pl-3">
                {selectedPreset.description}
            </p>
          </div>

          <div className="flex-1 p-4 space-y-6 overflow-y-auto">
            
            {/* Theory Overlays */}
            <div>
                 <h3 className="text-xs font-bold uppercase text-slate-500 mb-3 flex items-center">
                    <Box size={14} className="mr-2" /> Theory Overlay
                </h3>
                
                <div className="flex bg-slate-800 rounded p-1 mb-3">
                    {['NONE', 'CAGED', '3NPS'].map(mode => (
                         <button 
                            key={mode}
                            onClick={() => setOverlayMode(mode as any)}
                            className={`flex-1 text-xs font-bold py-1.5 rounded transition-all ${overlayMode === mode ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                         >
                            {mode}
                         </button>
                    ))}
                </div>

                {overlayMode !== 'NONE' && (
                    <div className="bg-slate-800/50 p-3 rounded border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-slate-500 uppercase">Root</label>
                            <select 
                                value={overlayRoot} 
                                onChange={(e) => setOverlayRoot(e.target.value)}
                                className="bg-slate-900 border border-slate-700 text-xs text-white rounded px-2 py-1 outline-none"
                            >
                                {['C','G','D','A','E','B','F'].map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                        
                        {overlayMode === 'CAGED' && (
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Form</label>
                                <div className="flex gap-1">
                                    {['C','A','G','E','D'].map(form => (
                                        <button 
                                            key={form}
                                            onClick={() => setCagedForm(form)}
                                            className={`flex-1 py-1 text-xs font-bold border rounded ${cagedForm === form ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                                        >
                                            {form}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                         {overlayMode === '3NPS' && (
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Position</label>
                                <div className="flex gap-1">
                                    {[1,2,3,4,5,6,7].map(pos => (
                                        <button 
                                            key={pos}
                                            onClick={() => setNpsPosition(pos)}
                                            className={`flex-1 py-1 text-[10px] font-bold border rounded ${npsPosition === pos ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                                        >
                                            {pos}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Learning Modes */}
            <div>
                <h3 className="text-xs font-bold uppercase text-slate-500 mb-3 flex items-center">
                    <Eye size={14} className="mr-2" /> Visual Aid
                </h3>
                <div className="space-y-2 mb-4">
                    <button 
                        onClick={() => setLearningMode('FULL')}
                        className={`w-full flex items-center justify-between p-3 rounded border transition-all ${learningMode === 'FULL' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                    >
                        <span className="font-bold text-sm">Guided</span>
                        <span className="text-xs opacity-60">Path + Next</span>
                    </button>
                    <button 
                        onClick={() => setLearningMode('GHOST')}
                        className={`w-full flex items-center justify-between p-3 rounded border transition-all ${learningMode === 'GHOST' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                    >
                        <span className="font-bold text-sm">Focus</span>
                        <span className="text-xs opacity-60">Current + Next</span>
                    </button>
                    <button 
                        onClick={() => setLearningMode('BLIND')}
                        className={`w-full flex items-center justify-between p-3 rounded border transition-all ${learningMode === 'BLIND' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                    >
                        <span className="font-bold text-sm">Blind</span>
                        <span className="text-xs opacity-60">Memory Only</span>
                    </button>
                </div>
                
                <div className="flex space-x-2">
                    <button 
                        onClick={() => setShowPatternContext(!showPatternContext)}
                        className={`flex-1 flex items-center justify-center p-2 rounded border border-dashed transition-all ${showPatternContext ? 'border-slate-500 text-slate-300' : 'border-slate-800 text-slate-600'}`}
                    >
                        <Layers size={14} className="mr-2" />
                        <span className="text-xs font-bold uppercase">{showPatternContext ? "Hide Context" : "Show Context"}</span>
                    </button>
                    
                    <button 
                        onClick={() => setShowNoteNames(!showNoteNames)}
                         className={`flex-1 flex items-center justify-center p-2 rounded border transition-all ${showNoteNames ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200' : 'border-slate-800 text-slate-600'}`}
                    >
                        <Type size={14} className="mr-2" />
                        <span className="text-xs font-bold uppercase">Note Names</span>
                    </button>
                </div>

            </div>

          </div>

          <div className="p-4 border-t border-slate-800">
             <button 
                onClick={() => { setIsPlaying(false); setCurrentNoteIndex(-1); }}
                className="w-full py-3 border border-slate-600 hover:bg-slate-800 text-slate-300 font-bold rounded flex items-center justify-center transition-colors"
            >
                Reset Position
            </button>
          </div>
        </div>

        {/* Center Panel: Visualization */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
            
            {/* Split View */}
            <div className="flex-1 flex flex-col p-8 overflow-y-auto space-y-8">
                
                {/* 1. Timeline (Tab) */}
                <div className="flex-none">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                             <Activity size={16} className="text-amber-500" />
                             <h4 className="text-sm font-bold uppercase text-slate-400">Timeline</h4>
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                             {currentNoteIndex >= 0 ? `${currentNoteIndex + 1} / ${sequence.length}` : 'Ready'}
                        </span>
                    </div>
                    
                    <TabStaff 
                        notes={sequence.map((n, i) => ({ 
                            ...n, 
                            beat: i, 
                            finger: n.finger, 
                        }))} 
                        currentIndex={currentNoteIndex}
                    />
                     <div className="text-center mt-2 text-xs text-slate-600 font-mono">
                         Fret (Large) • Finger (Small)
                    </div>
                </div>

                {/* 2. Fretboard Map */}
                <div className="flex-none">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                             <Target size={16} className="text-blue-500" />
                             <h4 className="text-sm font-bold uppercase text-slate-400">Spatial Map</h4>
                        </div>
                        {overlayMode !== 'NONE' && (
                             <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                                 Overlay: <span className="text-indigo-400">{overlayRoot} {overlayMode === 'CAGED' ? `${cagedForm}-Shape` : `Pos ${npsPosition}`}</span>
                             </div>
                        )}
                    </div>
                    <Fretboard 
                        markers={activeMarkers()}
                        overlayMarkers={overlayMarkers}
                        range={[0, 15]} // Extended range to see open strings and up to 15
                        showNoteNames={showNoteNames}
                    />
                </div>

            </div>
        </div>
      </div>

      {/* Footer Transport */}
      <Transport 
        isPlaying={isPlaying} 
        onPlayPause={() => setIsPlaying(!isPlaying)} 
        onStop={() => { setIsPlaying(false); setCurrentNoteIndex(-1); }}
        bpm={bpm}
        onBpmChange={setBpm}
        metronomeEnabled={true}
        onMetronomeToggle={() => {}}
        isLooping={isLooping}
        onLoopToggle={() => setIsLooping(!isLooping)}
      />
    </div>
  );
};

export default PracticePage;
