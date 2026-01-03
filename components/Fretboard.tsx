
import React, { useMemo } from 'react';
import { STRINGS, FRETS, COLORS } from '../constants';
import { Marker, HandFrame } from '../types';
import { getNoteName } from '../utils/theory';

interface FretboardProps {
  markers?: Marker[];
  overlayMarkers?: Marker[];
  handFrame?: HandFrame; 
  onFretClick?: (string: number, fret: number) => void;
  showInlays?: boolean;
  className?: string;
  range?: [number, number]; // min fret, max fret view
  showNoteNames?: boolean; // New prop to toggle note names
}

const Fretboard: React.FC<FretboardProps> = ({ 
  markers = [], 
  overlayMarkers = [],
  handFrame,
  onFretClick, 
  showInlays = true,
  className = "",
  range = [0, FRETS],
  showNoteNames = false
}) => {
  const [minFret, maxFret] = range;
  const numFrets = maxFret - minFret + 1;
  
  // Dimensions
  const width = 1200;
  const height = 240;
  const paddingX = 40;
  const paddingY = 30;
  const fretSpacing = (width - paddingX * 2) / numFrets;
  const stringSpacing = (height - paddingY * 2) / 5;

  const getFretX = (fretIndex: number) => paddingX + (fretIndex - minFret) * fretSpacing;
  const getStringY = (stringIndex: number) => paddingY + (stringIndex) * stringSpacing;

  const inlays = useMemo(() => {
    if (!showInlays) return [];
    const inlayFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
    return inlayFrets.filter(f => f >= minFret && f <= maxFret).map(f => ({
      fret: f,
      double: f % 12 === 0
    }));
  }, [minFret, maxFret, showInlays]);

  const renderMarker = (m: Marker, index: number, isOverlay: boolean) => {
    if (m.fret < minFret || m.fret > maxFret) return null;
    
    const sIndex = m.string - 1;
    const x = getFretX(m.fret);
    const drawX = m.fret === 0 ? x : x - fretSpacing / 2;
    const y = getStringY(sIndex);
    
    // Calculate Note Name if needed
    let noteName = '';
    if (showNoteNames) {
        const stringDef = STRINGS.find(s => s.id === m.string);
        if (stringDef) {
            noteName = getNoteName(stringDef.midi + m.fret);
        }
    }

    // Visual Styles based on properties
    const baseR = m.variant === 'small' ? 8 : (m.shape === 'square' ? 12 : 14);
    const r = isOverlay ? baseR - 2 : baseR;
    
    const finalOpacity = m.opacity || (m.variant === 'small' ? 0.6 : 1);
    const finalColor = m.color || "#3b82f6";
    
    // Style determinations
    const isHollow = m.variant === 'hollow';
    const fill = isHollow ? 'transparent' : (isOverlay ? `${finalColor}40` : finalColor); 
    const stroke = isHollow ? finalColor : (m.isPulse ? '#ffffff' : (isOverlay ? finalColor : '#1e293b'));
    const strokeWidth = isHollow ? 2 : (m.isPulse ? 3 : (isOverlay ? 2 : 2));
    const labelColor = isOverlay ? finalColor : (isHollow ? finalColor : "white");

    return (
      <g key={`${isOverlay ? 'ov' : 'mk'}-${index}`} pointerEvents="none" style={{ opacity: finalOpacity, transition: 'all 0.15s ease-out' }}>
        {/* Pulse Effect Ring */}
        {m.isPulse && (
           <circle cx={drawX} cy={y} r={r + 6} fill="none" stroke={finalColor} strokeWidth="2" opacity="0.6">
              <animate attributeName="r" from={r} to={r+14} dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0" dur="0.8s" repeatCount="indefinite" />
           </circle>
        )}

        {/* Marker Body */}
        {m.shape === 'square' ? (
             <rect 
                x={drawX - r} y={y - r} 
                width={r * 2} height={r * 2} 
                fill={fill} 
                stroke={stroke} 
                strokeWidth={strokeWidth}
                rx={4}
             />
        ) : (
            <circle 
                cx={drawX} cy={y} 
                r={r} 
                fill={fill} 
                stroke={stroke} 
                strokeWidth={strokeWidth}
            />
        )}
        
        {isHollow && (
            <circle cx={drawX} cy={y} r={r-1} fill={finalColor} opacity="0.1" />
        )}

        {/* Labels Logic */}
        {/* If showNoteNames is true, we display the note name below the marker to avoid clutter */}
        
        {/* Main Center Label (Finger or Interval) */}
        {(m.label || m.finger) && m.variant !== 'small' && (
          <text 
            x={drawX} y={y} dy="4" 
            textAnchor="middle" 
            fill={labelColor} 
            fontSize={isOverlay ? "9" : "11"} 
            fontWeight="bold"
            className="font-mono"
          >
            {m.finger || m.label}
          </text>
        )}
        
        {/* Secondary Note Name Label (Below) */}
        {showNoteNames && noteName && !isOverlay && (
             <text 
                x={drawX} y={y + r + 12} 
                textAnchor="middle" 
                fill={isHollow ? finalColor : "#ffffff"} 
                fontSize="10" 
                fontWeight="bold"
                className="font-mono"
                style={{ textShadow: '0 1px 2px black' }}
            >
                {noteName}
            </text>
        )}
      </g>
    );
  }

  // Calculate Frame Box
  const frameRect = useMemo(() => {
    if (!handFrame) return null;
    const { string, fret, span } = handFrame;
    const startX = getFretX(fret) - fretSpacing; 
    const boxWidth = span * fretSpacing;
    const startY = getStringY(0) - 10;
    const boxHeight = height - paddingY * 2 + 20;

    return (
        <rect 
            x={startX} y={startY} 
            width={boxWidth} height={boxHeight} 
            fill="rgba(59, 130, 246, 0.1)" 
            stroke="rgba(59, 130, 246, 0.4)"
            strokeWidth="2"
            strokeDasharray="4 4"
            rx="4"
            pointerEvents="none"
        />
    );
  }, [handFrame, fretSpacing, minFret, maxFret]);

  return (
    <div className={`overflow-x-auto overflow-y-hidden select-none ${className}`}>
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full min-w-[800px] bg-zinc-900 rounded-lg shadow-inner border border-zinc-800"
        style={{ cursor: onFretClick ? 'pointer' : 'default' }}
      >
        {/* Fretboard Background */}
        <rect x="0" y="0" width={width} height={height} fill={COLORS.fretboardBg} rx="8" />

        {/* Frets */}
        {Array.from({ length: numFrets + 1 }).map((_, i) => {
          const absoluteFret = minFret + i;
          const x = getFretX(absoluteFret);
          const isNut = absoluteFret === 0;
          return (
            <React.Fragment key={`fret-${i}`}>
               <line 
                x1={x} y1={paddingY} 
                x2={x} y2={height - paddingY} 
                stroke={isNut ? "#d4d4d8" : COLORS.fretWire} 
                strokeWidth={isNut ? 6 : 2} 
              />
              {/* Enhanced Fret Numbers */}
              {absoluteFret > 0 && (
                  <text 
                    x={x + fretSpacing / 2} 
                    y={height - 5} 
                    fill="#a1a1aa" 
                    fontSize="13" 
                    fontWeight="bold"
                    textAnchor="middle"
                    className="font-mono"
                >
                    {absoluteFret}
                </text>
              )}
            </React.Fragment>
           
          );
        })}

        {/* Hand Frame Layer */}
        {frameRect}

        {/* Enhanced Inlays */}
        {inlays.map((inlay, i) => {
          const x = getFretX(inlay.fret) - fretSpacing / 2;
          const y = height / 2;
          return inlay.double ? (
            <g key={`inlay-${i}`}>
               <circle cx={x} cy={y - stringSpacing} r="7" fill={COLORS.inlay} opacity="0.6" />
               <circle cx={x} cy={y + stringSpacing} r="7" fill={COLORS.inlay} opacity="0.6" />
            </g>
          ) : (
            <circle key={`inlay-${i}`} cx={x} cy={y} r="7" fill={COLORS.inlay} opacity="0.6" />
          );
        })}

        {/* Strings */}
        {STRINGS.map((str, i) => {
          const y = getStringY(i);
          return (
            <line 
              key={`str-${i}`} 
              x1={paddingX} y1={y} 
              x2={width - paddingX} y2={y} 
              stroke={COLORS.string} 
              strokeWidth={i + 1} 
              opacity={0.8}
            />
          );
        })}

        {/* Overlay Markers */}
        {overlayMarkers.map((m, i) => renderMarker(m, i, true))}

        {/* Active Markers */}
        {markers.map((m, i) => renderMarker(m, i, false))}

        {/* Click Zones */}
        {onFretClick && Array.from({ length: numFrets }).map((_, f) => {
          const fretNum = minFret + f;
          return STRINGS.map((_, s) => {
            return (
              <rect
                key={`zone-${f}-${s}`}
                x={getFretX(fretNum)}
                y={getStringY(s) - stringSpacing / 2}
                width={fretSpacing}
                height={stringSpacing}
                fill="transparent"
                onClick={() => onFretClick(s + 1, fretNum)} 
                className="hover:fill-white/5 transition-colors"
              />
            );
          });
        })}
      </svg>
    </div>
  );
};

export default Fretboard;
