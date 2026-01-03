
import React from 'react';
import { ArrowDown, ArrowUp, CornerDownRight } from 'lucide-react';

interface TabNote {
  string: number; // 1-6
  fret: number;
  beat: number; // 0-based beat index
  duration?: number;
  finger?: number; 
  isActive?: boolean;
  picking?: 'D' | 'U' | 'ECO' | 'N';
}

interface TabStaffProps {
  notes: TabNote[];
  measures?: number;
  beatsPerMeasure?: number;
  isPlaying?: boolean;
  currentIndex?: number; 
  className?: string;
}

const TabStaff: React.FC<TabStaffProps> = ({ 
  notes, 
  measures = 4, 
  beatsPerMeasure = 4, 
  currentIndex = -1,
  className = "" 
}) => {
  const lineHeight = 14;
  const staffHeight = lineHeight * 5; 
  const widthPerBeat = 60; 
  const totalWidth = notes.length * widthPerBeat + 100;
  const paddingTop = 24;

  const scrollOffset = currentIndex > 0 ? (currentIndex * widthPerBeat) - 200 : 0;

  const renderPickingSymbol = (direction?: 'D' | 'U' | 'ECO' | 'N') => {
    if (!direction || direction === 'N') return null;
    if (direction === 'D') return <span className="font-bold text-[10px]">П</span>; // Downstroke symbol
    if (direction === 'U') return <span className="font-bold text-[10px]">V</span>; // Upstroke symbol
    if (direction === 'ECO') return <CornerDownRight size={10} />;
    return null;
  };

  return (
    <div className={`relative overflow-x-auto overflow-y-hidden bg-slate-50 border border-slate-200 rounded-md ${className} dark:bg-slate-950 dark:border-slate-800 shadow-inner`}>
      <div 
        style={{ width: Math.max(800, totalWidth), height: staffHeight + 80, transform: `translateX(-${Math.max(0, scrollOffset)}px)`, transition: 'transform 0.2s ease-out' }} 
        className="relative p-4"
      >
        
        {/* Playhead Line */}
        {currentIndex >= 0 && (
          <div 
            className="absolute top-0 w-0.5 h-full bg-amber-500/60 z-0 transition-all duration-75 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
            style={{ left: 20 + currentIndex * widthPerBeat + (widthPerBeat/2) }} 
          />
        )}

        {/* Staff Lines */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute left-0 w-full border-b border-slate-700/50"
            style={{ top: paddingTop + i * lineHeight }}
          />
        ))}

        {/* Notes Timeline */}
        {notes.map((note, idx) => {
          const top = paddingTop + (note.string - 1) * lineHeight;
          const left = 20 + idx * widthPerBeat + (widthPerBeat/2);
          
          const isActive = idx === currentIndex;
          const isPast = idx < currentIndex;

          return (
            <div 
              key={idx}
              className={`absolute flex flex-col items-center justify-center z-10 transition-all duration-150 ${isActive ? 'scale-110' : 'scale-100'}`}
              style={{ 
                top: top - 10, 
                left: left - 12,
                width: 24, 
                opacity: isPast ? 0.3 : 1
              }}
            >
              {/* Finger Badge (Top) */}
              {note.finger && (
                <div className="absolute -top-4 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-slate-500 bg-slate-900/80">
                    {note.finger}
                </div>
              )}

              {/* Main Fret Bubble */}
              <div className={`
                w-7 h-7 flex items-center justify-center rounded-full font-bold text-sm shadow-sm
                ${isActive 
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-500/50' 
                  : 'bg-slate-800 text-slate-200 border border-slate-600'}
              `}>
                 {note.fret}
              </div>
              
              {/* Picking Symbol (Bottom) */}
              {note.picking && (
                <div className={`absolute -bottom-5 flex items-center justify-center ${isActive ? 'text-amber-500' : 'text-slate-500'}`}>
                    {renderPickingSymbol(note.picking)}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 pointer-events-none opacity-50">
        <div className="flex items-center gap-1 text-[9px] text-slate-400">
            <span className="font-bold">П</span> Down
        </div>
        <div className="flex items-center gap-1 text-[9px] text-slate-400">
            <span className="font-bold">V</span> Up
        </div>
      </div>
    </div>
  );
};

export default TabStaff;
