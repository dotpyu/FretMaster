
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Fretboard from '../components/Fretboard';
import TabStaff from '../components/TabStaff';
import Transport from '../components/Transport';
import { Layers, Zap, Hand, Move, ArrowRight, Activity, Dumbbell, Type } from 'lucide-react';
import { PATTERN_LIBRARY } from '../data/patterns';
import { instantiatePattern } from '../utils/patternEngine';
import { audioEngine } from '../services/audio';
import { SequenceNote, Marker, HandFrame } from '../types';

const PatternsPage: React.FC = () => {
  // Config State
  const [selectedCategory, setSelectedCategory] = useState<string>('3nps');
  const [selectedPatternId, setSelectedPatternId] = useState<string>(PATTERN_LIBRARY[0].id);
  const [anchorString, setAnchorString] = useState<number>(6);
  const [baseFret, setBaseFret] = useState<number>(5);
  const [showNoteNames, setShowNoteNames] = useState(false); // New state

  // Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const timerRef = useRef<number | null>(null);

  // Derived
  const selectedPattern = useMemo(() => 
    PATTERN_LIBRARY.find(p => p.id === selectedPatternId) || PATTERN_LIBRARY[0], 
  [selectedPatternId]);

  const { sequence, frames } = useMemo(() => 
    instantiatePattern(selectedPattern, { 
      anchorString: anchorString, 
      frameBaseFret: baseFret 
    }), 
  [selectedPattern, anchorString, baseFret]);

  // Current Frame Logic
  const getCurrentFrame = useCallback(() => {
    let frameIdx = 0;
    if (selectedPattern.shiftEvents) {
        for(let i=0; i < selectedPattern.shiftEvents.length; i++) {
             if (currentNoteIndex >= selectedPattern.shiftEvents[i].atStepIndex) {
                 frameIdx = i + 1;
             }
        }
    }
    return frames[frameIdx] || frames[0];
  }, [currentNoteIndex, selectedPattern, frames]);

  // Handlers
  const handlePlayPause = () => {
    if (isPlaying) {
        setIsPlaying(false);
        setCurrentNoteIndex(-1);
    } else {
        setIsPlaying(true);
        setCurrentNoteIndex(-1);
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
             next = 0; // Loop
          }
          
          const note = sequence[next];
          if (note) {
              audioEngine.playTone(audioEngine.midiToFreq(note.midi), 0.2);
              if (next % 4 === 0) audioEngine.playClick(next === 0);
          }
          return next;
        });
      };
      
      const interval = msPerBeat / 4; 
      
      if (currentNoteIndex === -1) playNext();
      timerRef.current = window.setInterval(playNext, interval);
    } else {
        if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, bpm, sequence]);


  // Markers
  const activeMarkers = useMemo((): Marker[] => {
    const idx = currentNoteIndex === -1 ? 0 : currentNoteIndex;
    const note = sequence[idx];
    if (!note) return [];
    
    return [{
        string: note.string,
        fret: note.fret,
        label: note.finger.toString(),
        finger: note.finger,
        color: '#f59e0b', // Amber
        isPulse: true,
        variant: 'filled'
    }];
  }, [currentNoteIndex, sequence]);

  return (
    <div className="flex h-full bg-slate-950 text-slate-200 overflow-hidden font-sans">
      
      {/* Sidebar Controls */}
      <div className="w-80 flex-none border-r border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="p-5 border-b border-slate-800">
             <h2 className="text-xl font-bold text-white flex items-center">
                <Dumbbell className="mr-2 text-indigo-500" /> Finger Gym
             </h2>
             <p className="text-xs text-slate-500 mt-1">Mechanical patterns for dexterity.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {/* Categories */}
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Focus Area</label>
                <div className="flex flex-wrap gap-2">
                    {['3nps', 'chromatic', 'stringCross', 'arpeggio', 'shifts', 'triad'].map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1 text-xs rounded-full border transition-all ${selectedCategory === cat ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pattern List */}
            <div>
                 <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Patterns</label>
                 <div className="space-y-1">
                    {PATTERN_LIBRARY.filter(p => p.category === selectedCategory).map(pat => (
                        <button
                            key={pat.id}
                            onClick={() => {
                                setSelectedPatternId(pat.id);
                                setIsPlaying(false);
                                setCurrentNoteIndex(-1);
                                setAnchorString(pat.default.anchorString);
                                setBaseFret(pat.default.frameBaseFret);
                            }}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center ${selectedPatternId === pat.id ? 'bg-slate-800 text-indigo-300 font-medium' : 'text-slate-400 hover:bg-slate-800/50'}`}
                        >
                            {selectedPatternId === pat.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2" />}
                            {pat.name}
                        </button>
                    ))}
                 </div>
            </div>

            {/* Config */}
            <div className="p-4 bg-slate-800 rounded border border-slate-700">
                 <label className="text-xs font-bold text-slate-400 uppercase mb-3 block flex items-center"><Move size={12} className="mr-1"/> Position Config</label>
                 
                 <div className="grid grid-cols-2 gap-4">
                     <div>
                         <label className="text-[10px] text-slate-500 uppercase block mb-1">Anchor String</label>
                         <select 
                            value={anchorString}
                            onChange={(e) => setAnchorString(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white"
                         >
                            {[6,5,4,3,2,1].map(s => <option key={s} value={s}>String {s}</option>)}
                         </select>
                     </div>
                     <div>
                         <label className="text-[10px] text-slate-500 uppercase block mb-1">Base Fret (Index)</label>
                         <input 
                            type="number" 
                            min="0" max="20"
                            value={baseFret}
                            onChange={(e) => setBaseFret(Number(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-600 rounded px-2 py-1 text-sm text-white"
                         />
                     </div>
                 </div>
            </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
           
           {/* Top Visualization */}
           <div className="flex-1 flex flex-col p-8 space-y-8 overflow-y-auto">
                
                {/* Tab View */}
                <div className="flex-none">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                             <Activity size={16} className="text-amber-500" />
                             <h4 className="text-sm font-bold uppercase text-slate-400">Tabs & Picking</h4>
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                           {currentNoteIndex > -1 ? `Note ${currentNoteIndex + 1}` : 'Ready'}
                        </span>
                    </div>
                    <TabStaff 
                        notes={sequence.map((n, i) => ({ 
                            ...n, 
                            beat: i, 
                        }))} 
                        currentIndex={currentNoteIndex}
                    />
                </div>

                {/* Fretboard View */}
                <div className="flex-none">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                             <Hand size={16} className="text-blue-500" />
                             <h4 className="text-sm font-bold uppercase text-slate-400">Hand Frame</h4>
                        </div>
                         
                         <div className="flex items-center space-x-4">
                            <button 
                                onClick={() => setShowNoteNames(!showNoteNames)}
                                className={`flex items-center space-x-2 text-xs px-2 py-1 rounded border transition-colors ${showNoteNames ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                            >
                                <Type size={12} />
                                <span>Show Notes</span>
                            </button>

                             <div className="flex items-center space-x-2 text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                                 <Move size={12} />
                                 <span>{getCurrentFrame().label} (Span {getCurrentFrame().span})</span>
                             </div>
                         </div>
                    </div>
                    <Fretboard 
                        markers={activeMarkers}
                        handFrame={getCurrentFrame()}
                        range={[0, 18]} // Constant full-neck view
                        showNoteNames={showNoteNames}
                    />
                </div>
           </div>

           {/* Footer */}
           <Transport 
                isPlaying={isPlaying} 
                onPlayPause={handlePlayPause}
                onStop={() => { setIsPlaying(false); setCurrentNoteIndex(-1); }}
                bpm={bpm}
                onBpmChange={setBpm}
           />
      </div>

    </div>
  );
};

export default PatternsPage;
