import React, { useState, useMemo } from 'react';
import Fretboard from '../components/Fretboard';
import { BookOpen, Play, Volume2, Music, Layers, Hexagon, Lightbulb, Dumbbell, Zap } from 'lucide-react';
import { LIBRARY_DATA } from '../data/library';
import { calculateMarkers, getRootMidi } from '../utils/theory';
import { audioEngine } from '../services/audio';

const LibraryPage: React.FC = () => {
  // State
  const [selectedCategory, setSelectedCategory] = useState<string>("Core Vision");
  const [selectedDrillId, setSelectedDrillId] = useState<string>(LIBRARY_DATA["Core Vision"][0].id);
  const [rootNote, setRootNote] = useState('A'); // Default to A

  // Derived state
  const selectedDrill = useMemo(() => {
    const category = LIBRARY_DATA[selectedCategory];
    return category?.find(d => d.id === selectedDrillId) || category?.[0];
  }, [selectedCategory, selectedDrillId]);

  const markers = useMemo(() => {
    if (!selectedDrill) return [];
    return calculateMarkers(
      getRootMidi(rootNote), 
      selectedDrill.intervals, 
      selectedDrill.formula
    );
  }, [selectedDrill, rootNote]);

  // Audio Handler
  const handlePlay = () => {
    if (!selectedDrill) return;
    
    const rootMidi = getRootMidi(rootNote);
    const sequence: { frequency: number, duration: number, time: number }[] = [];
    let currentTime = 0;
    const noteDuration = 0.25;

    // Play 2 octaves ascending
    // Octave 1
    selectedDrill.intervals.forEach(interval => {
       sequence.push({
         frequency: audioEngine.midiToFreq(rootMidi + interval),
         duration: 0.2,
         time: currentTime
       });
       currentTime += noteDuration;
    });
    // Octave 2 root if scale
    if (selectedDrill.intervals.length > 1) {
        sequence.push({
             frequency: audioEngine.midiToFreq(rootMidi + 12),
             duration: 0.8,
             time: currentTime
        });
    }
    
    sequence.forEach(note => {
        audioEngine.playTone(note.frequency, note.duration, 'triangle', 0.4, note.time);
    });
  };

  return (
    <div className="flex h-full bg-slate-950 text-slate-200 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <div className="w-72 flex-none border-r border-slate-800 bg-slate-900 overflow-y-auto">
        <div className="p-6 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
           <h2 className="text-xl font-bold text-white flex items-center tracking-tight">
             <BookOpen className="mr-3 text-indigo-500" size={24}/> Library
           </h2>
        </div>
        
        <div className="py-4 px-2">
          {Object.keys(LIBRARY_DATA).map(category => (
            <div key={category} className="mb-8">
              <h3 className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{category}</h3>
              <ul>
                {LIBRARY_DATA[category].map(drill => (
                  <li key={drill.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setSelectedDrillId(drill.id);
                      }}
                      className={`w-full text-left px-4 py-2.5 mb-1 rounded-lg text-sm flex items-center transition-all ${selectedDrillId === drill.id ? 'bg-indigo-600/20 text-indigo-200 font-medium border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
                    >
                      {selectedDrillId === drill.id && <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />}
                      {drill.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-slate-950">
        {selectedDrill && (
          <div className="max-w-6xl mx-auto p-8 lg:p-12">
            
            {/* Header */}
            <header className="mb-10">
               <div className="flex items-center space-x-2 text-sm text-indigo-400 font-mono mb-3 uppercase tracking-wider">
                 <Hexagon size={14} />
                 <span>{selectedDrill.category}</span>
               </div>
               <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">{selectedDrill.name}</h1>
               <p className="text-slate-300 text-lg leading-relaxed max-w-3xl border-l-4 border-slate-700 pl-6">
                 {selectedDrill.description}
               </p>
            </header>

            {/* Controls Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-10 flex flex-wrap items-center justify-between gap-6 shadow-xl">
               
               {/* Formula Display */}
               <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Formula</span>
                  <div className="flex space-x-1">
                    {selectedDrill.formula.map((degree, idx) => (
                        <span key={idx} className={`w-10 h-10 flex items-center justify-center rounded-lg font-mono font-bold text-base shadow-sm ${degree === '1' || degree === '3' || degree === 'b3' || degree === '7' || degree === 'b7' ? 'bg-indigo-600 text-white shadow-indigo-500/20' : 'bg-slate-800 text-indigo-300 border border-slate-700'}`}>
                            {degree}
                        </span>
                    ))}
                  </div>
               </div>

               <div className="flex items-center gap-6">
                    {/* Root Selector */}
                   <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Root</span>
                      <div className="relative">
                          <select 
                            value={rootNote}
                            onChange={(e) => setRootNote(e.target.value)}
                            className="bg-slate-950 border border-slate-700 text-white text-sm font-bold rounded-lg px-4 py-2 pr-8 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer hover:bg-slate-900 transition-colors"
                          >
                            {['C','G','D','A','E','B','F'].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                      </div>
                   </div>

                   {/* Audio Action */}
                   <button 
                    onClick={handlePlay}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95 border border-emerald-500"
                   >
                     <Volume2 size={20} />
                     <span>Hear It</span>
                   </button>
               </div>
            </div>

            {/* Visualization */}
            <section className="bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-2xl mb-12 overflow-hidden">
                <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-800 flex justify-between items-center">
                    <h3 className="font-bold text-slate-300 flex items-center text-sm uppercase tracking-wider">
                        <Layers size={16} className="mr-2 text-indigo-400" /> Fretboard Map
                    </h3>
                    <span className="text-xs font-mono text-slate-500">ROOT: <span className="text-white">{rootNote}</span></span>
                </div>
                <div className="p-6 overflow-x-auto">
                    <Fretboard 
                        markers={markers}
                        onFretClick={(s, f) => {
                            audioEngine.playTone(audioEngine.midiToFreq(40 + f + (s * 5)), 0.2); 
                        }}
                    />
                </div>
                <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-center space-x-8 text-xs font-mono">
                    <div className="flex items-center"><span className="w-3 h-3 bg-red-500 mr-2 rounded-sm"></span> ROOT (1)</div>
                    <div className="flex items-center"><span className="w-3 h-3 bg-yellow-400 mr-2 rounded-sm"></span> 3RD / b3</div>
                    <div className="flex items-center"><span className="w-3 h-3 bg-purple-500 mr-2 rounded-sm"></span> 7TH / b7</div>
                </div>
            </section>

            {/* Content Columns: Tips & Exercises */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Pro Tips */}
                {selectedDrill.tips && (
                    <div className="bg-gradient-to-br from-indigo-900/10 to-slate-900 border border-indigo-500/20 rounded-xl p-8">
                        <h3 className="text-lg font-bold text-indigo-300 mb-6 flex items-center">
                            <Lightbulb className="mr-3 text-yellow-400" size={20} /> Pro Tips
                        </h3>
                        <ul className="space-y-4">
                            {selectedDrill.tips.map((tip, i) => (
                                <li key={i} className="flex items-start text-slate-300 leading-relaxed">
                                    <span className="text-indigo-500 font-bold mr-3 mt-1 text-lg">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Exercises */}
                {selectedDrill.exercises && (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                        <h3 className="text-lg font-bold text-emerald-400 mb-6 flex items-center">
                            <Dumbbell className="mr-3" size={20} /> Command Routines
                        </h3>
                        <div className="space-y-4">
                            {selectedDrill.exercises.map((ex, i) => (
                                <div key={i} className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex items-start">
                                    <div className="bg-emerald-500/10 text-emerald-400 font-bold px-2 py-1 rounded text-xs mr-3 mt-0.5">#{i+1}</div>
                                    <span className="text-slate-300 text-sm font-medium">{ex}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;