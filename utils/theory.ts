
import { STRINGS, INTERVAL_COLORS, FRETS, NOTES_SHARP } from '../constants';
import { Marker } from '../types';

export const getNoteName = (midi: number): string => {
  return NOTES_SHARP[midi % 12];
};

/**
 * Calculates Fretboard Markers for a given root note and a set of intervals.
 */
export const calculateMarkers = (
  rootMidiValue: number,
  intervals: number[],
  formulas: string[],
  maxFrets: number = 22
): Marker[] => {
  const markers: Marker[] = [];
  const rootChroma = rootMidiValue % 12;

  const intervalMap = new Map<number, { label: string, color: string }>();
  
  intervals.forEach((interval, index) => {
    const noteChroma = (rootChroma + interval) % 12;
    const label = formulas[index];
    let colorKey = label;
    if(label === 'bb7') colorKey = '6';
    if(label === '#4') colorKey = 'b5';
    if(label === '#5') colorKey = 'b6';

    const color = INTERVAL_COLORS[colorKey] || '#94a3b8'; 
    intervalMap.set(noteChroma, { label, color });
  });

  STRINGS.forEach((string) => {
    for (let fret = 0; fret <= maxFrets; fret++) {
      const currentMidi = string.midi + fret;
      const currentChroma = currentMidi % 12;

      if (intervalMap.has(currentChroma)) {
        const info = intervalMap.get(currentChroma)!;
        const isRoot = info.label === '1' || info.label === 'R';
        
        markers.push({
          string: string.id,
          fret: fret,
          label: info.label,
          color: info.color,
          shape: isRoot ? 'square' : 'circle',
          opacity: 1
        });
      }
    }
  });

  return markers;
};

export const getRootMidi = (noteName: string): number => {
  const map: Record<string, number> = {
    'E': 40, 'F': 41, 'F#': 42, 'Gb': 42, 'G': 43, 'G#': 44, 'Ab': 44, 
    'A': 45, 'A#': 46, 'Bb': 46, 'B': 47, 
    'C': 48, 'C#': 49, 'Db': 49, 'D': 50, 'D#': 51, 'Eb': 51
  };
  return map[noteName] || 40;
}

// --- Overlay Generators ---

// Offsets: [String, FretDelta, IntervalLabel]
// Relative to the "Anchor Root" position of the shape
const CAGED_DEFS: Record<string, {s: number, f: number, i: string}[]> = {
  'C': [
    {s:5, f:0, i:'1'}, {s:4, f:-1, i:'3'}, {s:3, f:-3, i:'5'}, {s:2, f:-2, i:'1'}, {s:1, f:-3, i:'3'},
    {s:6, f:0, i:'5'}, {s:6, f:-3, i:'3'} 
  ],
  'A': [
    {s:5, f:0, i:'1'}, {s:4, f:2, i:'5'}, {s:3, f:2, i:'1'}, {s:2, f:2, i:'3'}, {s:1, f:0, i:'5'},
    {s:6, f:0, i:'5'} // Low E 5th
  ],
  'G': [
    {s:6, f:0, i:'1'}, {s:5, f:-1, i:'3'}, {s:4, f:-3, i:'5'}, {s:3, f:-3, i:'1'}, {s:2, f:-3, i:'3'}, {s:1, f:-3, i:'1'},
    {s:1, f:0, i:'1'} // High E Root
  ],
  'E': [
    {s:6, f:0, i:'1'}, {s:5, f:2, i:'5'}, {s:4, f:2, i:'1'}, {s:3, f:1, i:'3'}, {s:2, f:0, i:'5'}, {s:1, f:0, i:'1'}
  ],
  'D': [
    {s:4, f:0, i:'1'}, {s:3, f:2, i:'5'}, {s:2, f:3, i:'1'}, {s:1, f:2, i:'3'}, {s:5, f:0, i:'5'}
  ]
};

const CAGED_ANCHOR_STRINGS: Record<string, number> = {
  'C': 5, 'A': 5, 'G': 6, 'E': 6, 'D': 4
};

export const generateCagedMarkers = (rootName: string, form: string): Marker[] => {
  const targetRootMidi = getRootMidi(rootName);
  const anchorStringId = CAGED_ANCHOR_STRINGS[form];
  const defs = CAGED_DEFS[form];
  if (!defs) return [];

  // Find where the root note is on the anchor string
  // STRINGS is ordered [High E (1) ... Low E (6)]
  const anchorString = STRINGS.find(s => s.id === anchorStringId);
  if (!anchorString) return [];

  // We need the fret on the anchor string that produces targetRootMidi (or octaves of it)
  // Simple scan:
  let anchorFret = -1;
  for(let f=0; f<=22; f++) {
    if ((anchorString.midi + f) % 12 === targetRootMidi % 12) {
      // Pick the first viable one that allows the shape to exist somewhat on board?
      // Or picking a specific octave? Let's pick the one in the middle of the neck if possible, or low.
      if (f >= 3) { anchorFret = f; break; }
      anchorFret = f; // Fallback
    }
  }

  return defs.map((d): Marker => {
    const fret = anchorFret + d.f;
    const color = INTERVAL_COLORS[d.i] || '#94a3b8';
    return {
      string: d.s,
      fret: fret,
      label: d.i,
      color: color,
      shape: (d.i === '1' || d.i === 'R') ? 'square' : 'circle',
      opacity: 0.3,
      variant: 'hollow'
    };
  }).filter(m => m.fret >= 0 && m.fret <= 22);
};

// 3NPS (Major Scale) Relative Interval Map
// P1 (Ionian) starts on 1. P2 (Dorian) starts on 2, etc.
// Relative interval grid per string (Degrees)
const NPS_PATTERNS: Record<number, number[][]> = {
  1: [[1,2,3], [4,5,6], [7,1,2], [3,4,5], [6,7,1], [2,3,4]], // Order: Str 6 to 1
  2: [[2,3,4], [5,6,7], [1,2,3], [4,5,6], [7,1,2], [3,4,5]],
  3: [[3,4,5], [6,7,1], [2,3,4], [5,6,7], [1,2,3], [4,5,6]],
  // ... pattern generation logic can be procedural
};

export const generate3NPSMarkers = (rootName: string, position: number): Marker[] => {
  // Procedural generation of Major Scale 3NPS
  // Position 1 starts on Degree 1 (Root) on Low E.
  // Position 2 starts on Degree 2 on Low E, etc.
  
  // Major Scale Intervals from Root: W W H W W W H
  // 0, 2, 4, 5, 7, 9, 11
  const majorScale = [0, 2, 4, 5, 7, 9, 11];
  const rootMidi = getRootMidi(rootName) % 12; // Chroma

  // Determine starting degree on Low E
  // Pos 1 = 1st degree, Pos 2 = 2nd degree...
  const startDegreeIndex = position - 1; // 0-based index in majorScale

  // Find the fret on Low E for this degree
  const startInterval = majorScale[startDegreeIndex];
  const targetNoteChroma = (rootMidi + startInterval) % 12;
  
  const lowE = STRINGS.find(s => s.id === 6)!;
  let startFret = -1;
  // Find a fret for this note, ideally mid-neck
  for(let f=0; f<=22; f++) {
    if ((lowE.midi + f) % 12 === targetNoteChroma) {
      if (f >= 3) { startFret = f; break; }
      startFret = f;
    }
  }

  const markers: Marker[] = [];
  
  // Generate 3 notes per string logic
  // This is a simplification; generic 3NPS usually follows specific shapes.
  // We will map the Diatonic Notes in a box of 4-5 frets starting from startFret.
  
  const diatonicChromas = new Set(majorScale.map(i => (rootMidi + i) % 12));
  const degreeLabels = ['1','2','3','4','5','6','7'];

  STRINGS.forEach(str => {
    let count = 0;
    // Scan from startFret (approx) to startFret + 5
    // Adjust startFret for higher strings to maintain box? 
    // Usually 3NPS shifts up 1 fret on B string? 
    // Let's just scan a wide range and pick the ones that fit the visual "block".
    // 3NPS is usually 18 notes.
    
    // Simple approach: Show all diatonic notes in range [startFret, startFret+5]
    // But we need to handle the warp.
    // Let's just show diatonic notes in a window.
    
    for(let f = startFret; f <= startFret + 6; f++) {
      const chroma = (str.midi + f) % 12;
      if (diatonicChromas.has(chroma)) {
        // Find interval
        const intervalIdx = majorScale.findIndex(i => (rootMidi + i) % 12 === chroma);
        const label = degreeLabels[intervalIdx];
        const color = INTERVAL_COLORS[label === '7' ? '7' : label] || INTERVAL_COLORS['R'];
        
        markers.push({
          string: str.id,
          fret: f,
          label: label,
          color: INTERVAL_COLORS[label] || (label === '1' ? '#ef4444' : '#94a3b8'),
          shape: label === '1' ? 'square' : 'circle',
          variant: 'hollow',
          opacity: 0.4
        });
      }
    }
  });

  return markers;
};
