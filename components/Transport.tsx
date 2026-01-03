import React from 'react';
import { Play, Square, SkipBack, Repeat, Activity } from 'lucide-react';

interface TransportProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  bpm: number;
  onBpmChange: (bpm: number) => void;
  className?: string;
  onMetronomeToggle?: () => void;
  metronomeEnabled?: boolean;
  isLooping?: boolean;
  onLoopToggle?: () => void;
}

const Transport: React.FC<TransportProps> = ({ 
  isPlaying, 
  onPlayPause, 
  onStop, 
  bpm, 
  onBpmChange,
  className = "",
  onMetronomeToggle,
  metronomeEnabled,
  isLooping = false,
  onLoopToggle
}) => {
  return (
    <div className={`flex items-center justify-between px-4 py-3 bg-slate-900 border-t border-slate-800 ${className}`}>
      
      {/* Playback Controls */}
      <div className="flex items-center space-x-3">
        <button 
            onClick={() => { onStop(); }}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Return to Start"
        >
          <SkipBack size={20} />
        </button>
        
        <button 
          onClick={onPlayPause}
          className={`p-3 rounded-full shadow-lg hover:brightness-110 active:scale-95 transition-all ${isPlaying ? 'bg-amber-500 text-slate-900 shadow-amber-500/20' : 'bg-green-600 text-white shadow-green-600/20'}`}
        >
          {isPlaying ? <Square size={20} fill="currentColor" className="ml-0.5" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>

        {onLoopToggle && (
            <button 
                onClick={onLoopToggle}
                className={`p-2 rounded transition-all ${isLooping ? 'text-indigo-400 bg-indigo-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
                title="Toggle Loop"
            >
                <Repeat size={20} />
            </button>
        )}
      </div>

      {/* Main Display Area (LCD Style) */}
      <div className="flex-1 mx-4 lg:mx-8 flex justify-center">
         <div className="bg-slate-950 border border-slate-800/60 rounded-lg px-6 py-2 flex items-center space-x-6 lg:space-x-10 font-mono text-cyan-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
            <div className="text-center min-w-[60px]">
                <div className="text-[10px] text-slate-600 uppercase tracking-wider font-bold mb-1">Tempo</div>
                <div className="text-2xl font-bold leading-none text-cyan-400">{bpm}</div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div className="text-center min-w-[60px]">
                <div className="text-[10px] text-slate-600 uppercase tracking-wider font-bold mb-1">Status</div>
                <div className={`text-xl font-bold leading-none uppercase ${isPlaying ? 'text-green-400' : 'text-slate-500'}`}>
                    {isPlaying ? 'PLAY' : 'STOP'}
                </div>
            </div>
         </div>
      </div>

      {/* Settings / Metronome */}
      <div className="flex items-center space-x-4">
         <div className="flex items-center space-x-1 bg-slate-950 border border-slate-800 rounded p-1">
            <button 
                onClick={() => onBpmChange(Math.max(40, bpm - 5))}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >-</button>
            <span className="font-mono w-10 text-center text-sm font-bold text-slate-300">{bpm}</span>
            <button 
                onClick={() => onBpmChange(Math.min(300, bpm + 5))}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
            >+</button>
         </div>
         <button 
            onClick={onMetronomeToggle}
            className={`p-2.5 rounded border transition-all ${metronomeEnabled ? 'border-blue-500/50 bg-blue-500/10 text-blue-400' : 'border-transparent text-slate-600 hover:text-slate-400'}`}
            title="Metronome"
        >
            <Activity size={20} />
         </button>
      </div>
    </div>
  );
};

export default Transport;