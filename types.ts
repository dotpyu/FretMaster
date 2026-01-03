
export interface Note {
  name: string;
  octave: number;
  midi: number;
}

export interface FretboardPosition {
  string: number; // 1-6 (1 is high E)
  fret: number;
  note: Note;
  interval?: string; // e.g., "R", "3", "b7"
  isTarget?: boolean;
  isGhost?: boolean; // For scales context
}

export interface ScalePattern {
  name: string;
  intervals: number[]; // Semitones from root
}

export interface ChordShape {
  name: string;
  positions: { string: number; fret: number }[];
}

export enum TabViewMode {
  TAB_ONLY = 'TAB_ONLY',
  TAB_AND_DEGREES = 'TAB_AND_DEGREES',
}

export enum OverlayMode {
  TARGETS = 'TARGETS',
  TRIADS = 'TRIADS',
  CAGED = 'CAGED',
  SCALES = 'SCALES',
  ARPEGGIOS = 'ARPEGGIOS',
}

export interface WorkoutBlock {
  id: string;
  name: string;
  durationSeconds: number;
  bpm: number;
  description: string;
}

export interface DrillDefinition {
  id: string;
  name: string;
  category: 'Core Vision' | 'Triads & Inversions' | 'Harmonic Color' | 'Scales & Modes' | 'Mental Models';
  description: string;
  formula: string[]; // e.g. ["1", "b3", "5"]
  intervals: number[]; // Semitones from root: [0, 3, 7]
  tips?: string[];
  exercises?: string[];
}

// Visual props for Fretboard
export interface Marker {
  string: number;
  fret: number;
  label?: string;
  color?: string; // Hex or tailwind class
  shape?: 'circle' | 'square' | 'diamond';
  opacity?: number;
  finger?: number; // 1=Index, 2=Middle, 3=Ring, 4=Pinky
  isGhost?: boolean; // If true, it's a "next up" hint
  isPulse?: boolean; // If true, it's the currently playing note
  variant?: 'filled' | 'hollow' | 'small'; // Visual style: filled (active), hollow (next), small (context)
}

export interface SequenceNote {
  string: number;
  fret: number;
  finger: number;
  duration: number; // in beats
  label: string;
  midi: number;
  picking?: 'D' | 'U' | 'ECO' | 'N'; // Picking direction
  tech?: string; // hammer, pull, slide
}

// --- Pattern DSL Types ---

export type PickingDirection = 'D' | 'U' | 'ECO' | 'N';

export interface PatternStep {
  stringRel: number; // 0 = anchor, 1 = higher pitch string
  fretRel: number;   // relative to frame base
  finger: number;
  dur16: number;     // duration in 16th notes
  picking: PickingDirection;
  tech?: string;
}

export interface ShiftEvent {
  atStepIndex: number;
  deltaFrets: number;
  deltaStrings: number;
  label: string;
}

export interface PatternDefinition {
  id: string;
  name: string;
  category: string;
  tags: string[];
  default: {
    timeSig: number[];
    subdivision: string;
    defaultBpm: number;
    frameSpanFrets: number;
    anchorString: number;
    frameBaseFret: number;
    loopBars: number;
  };
  steps: PatternStep[];
  shiftEvents?: ShiftEvent[];
}

export interface HandFrame {
  string: number; // Anchor string (usually lowest string of frame)
  fret: number;   // Base fret (index finger)
  span: number;   // Width in frets
  label?: string;
}
