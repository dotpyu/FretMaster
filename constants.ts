import { ScalePattern } from "./types";

export const STRINGS = [
  { id: 1, name: 'E', midi: 64 },
  { id: 2, name: 'B', midi: 59 },
  { id: 3, name: 'G', midi: 55 },
  { id: 4, name: 'D', midi: 50 },
  { id: 5, name: 'A', midi: 45 },
  { id: 6, name: 'E', midi: 40 },
];

export const FRETS = 22;

export const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const NOTES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const SCALES: Record<string, ScalePattern> = {
  major: { name: "Major", intervals: [0, 2, 4, 5, 7, 9, 11] },
  minor: { name: "Natural Minor", intervals: [0, 2, 3, 5, 7, 8, 10] },
  pentatonic_minor: { name: "Pentatonic Minor", intervals: [0, 3, 5, 7, 10] },
  blues: { name: "Blues", intervals: [0, 3, 5, 6, 7, 10] },
  mixolydian: { name: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10] },
  dorian: { name: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10] },
};

export const INTERVAL_COLORS: Record<string, string> = {
  "R": "#ef4444", // Red-500
  "b2": "#fca5a5",
  "2": "#fb923c", // Orange-400
  "b3": "#fde047", // Yellow-300
  "3": "#facc15", // Yellow-400
  "4": "#86efac", // Green-300
  "b5": "#22c55e", // Green-500 (Tritone/Blues)
  "5": "#3b82f6", // Blue-500
  "b6": "#818cf8", // Indigo-400
  "6": "#6366f1", // Indigo-500
  "b7": "#c084fc", // Purple-400
  "7": "#a855f7", // Purple-500
};

export const COLORS = {
  fretboardBg: "#27272a", // Zinc 800
  fretWire: "#71717a", // Zinc 500
  inlay: "#52525b", // Zinc 600
  string: "#a1a1aa", // Zinc 400
};