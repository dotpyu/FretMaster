
import { PatternDefinition } from '../types';

export const PATTERN_LIBRARY: PatternDefinition[] = [
    // --- 3NPS / Chromatic (Existing) ---
    {
      "id": "p001_3nps_124_single_string",
      "name": "3NPS Core: 1-2-4 burst",
      "category": "3nps",
      "tags": ["124", "leftHand", "speed"],
      "default": { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 100, "frameSpanFrets": 4, "anchorString": 6, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 2, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 0, "fretRel": 4, "finger": 4, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 2, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" }
      ]
    },
    {
      "id": "p002_3nps_134_single_string",
      "name": "3NPS Core: 1-3-4 burst",
      "category": "3nps",
      "tags": ["134", "leftHand", "speed"],
      "default": { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 100, "frameSpanFrets": 4, "anchorString": 6, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 3, "finger": 3, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 0, "fretRel": 4, "finger": 4, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 3, "finger": 3, "dur16": 1, "picking": "U", "tech": "none" }
      ]
    },
    {
      "id": "p003_chromatic_1234_per_string",
      "name": "Chromatic: 1-2-3-4 linear",
      "category": "chromatic",
      "tags": ["1234", "independence", "warmup"],
      "default": { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 90, "frameSpanFrets": 4, "anchorString": 6, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 1, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 0, "fretRel": 2, "finger": 3, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 3, "finger": 4, "dur16": 1, "picking": "U", "tech": "none" }
      ]
    },
    {
      "id": "p004_spider_1324",
      "name": "Spider: 1-3-2-4 crossing",
      "category": "chromatic",
      "tags": ["spider", "coordination"],
      "default": { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 75, "frameSpanFrets": 4, "anchorString": 6, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 1, "fretRel": 2, "finger": 3, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 0, "fretRel": 1, "finger": 2, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 1, "fretRel": 3, "finger": 4, "dur16": 1, "picking": "U", "tech": "none" }
      ]
    },
    {
      "id": "p006_string_cross_124_two_strings",
      "name": "Cross: 1-2-4 (2 strings)",
      "category": "stringCross",
      "tags": ["alternatePicking", "124"],
      "default": { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 95, "frameSpanFrets": 4, "anchorString": 6, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 2, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 0, "fretRel": 4, "finger": 4, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 1, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 1, "fretRel": 2, "finger": 2, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 1, "fretRel": 4, "finger": 4, "dur16": 1, "picking": "U", "tech": "none" }
      ]
    },

    // --- NEW TRIAD PATTERNS (GBE String Set) ---
    {
      "id": "triad_maj_root_gbe",
      "name": "Triad: Major Root Pos (GBE)",
      "category": "triad",
      "tags": ["triad", "major", "rootPos"],
      "default": { "timeSig": [3,4], "subdivision": "8n", "defaultBpm": 80, "frameSpanFrets": 4, "anchorString": 3, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 2, "finger": 3, "dur16": 2, "picking": "D", "tech": "none" }, // Root (e.g. D on G str)
        { "stringRel": 1, "fretRel": 2, "finger": 4, "dur16": 2, "picking": "D", "tech": "none" }, // 3rd (F#)
        { "stringRel": 2, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }  // 5th (A)
      ]
    },
    {
      "id": "triad_maj_1inv_gbe",
      "name": "Triad: Major 1st Inv (GBE)",
      "category": "triad",
      "tags": ["triad", "major", "inversion"],
      "default": { "timeSig": [3,4], "subdivision": "8n", "defaultBpm": 80, "frameSpanFrets": 4, "anchorString": 3, "frameBaseFret": 9, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 2, "finger": 2, "dur16": 2, "picking": "D", "tech": "none" }, // 3rd
        { "stringRel": 1, "fretRel": 1, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }, // 5th
        { "stringRel": 2, "fretRel": 1, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }  // Root
      ]
    },
    {
      "id": "triad_maj_2inv_gbe",
      "name": "Triad: Major 2nd Inv (GBE)",
      "category": "triad",
      "tags": ["triad", "major", "inversion"],
      "default": { "timeSig": [3,4], "subdivision": "8n", "defaultBpm": 80, "frameSpanFrets": 4, "anchorString": 3, "frameBaseFret": 12, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 2, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }, // 5th
        { "stringRel": 1, "fretRel": 3, "finger": 2, "dur16": 2, "picking": "D", "tech": "none" }, // Root
        { "stringRel": 2, "fretRel": 2, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }  // 3rd
      ]
    },
    {
      "id": "triad_min_root_gbe",
      "name": "Triad: Minor Root Pos (GBE)",
      "category": "triad",
      "tags": ["triad", "minor", "rootPos"],
      "default": { "timeSig": [3,4], "subdivision": "8n", "defaultBpm": 80, "frameSpanFrets": 4, "anchorString": 3, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 2, "finger": 3, "dur16": 2, "picking": "D", "tech": "none" }, // Root
        { "stringRel": 1, "fretRel": 1, "finger": 2, "dur16": 2, "picking": "D", "tech": "none" }, // b3
        { "stringRel": 2, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }  // 5th
      ]
    },
    {
      "id": "triad_min_1inv_gbe",
      "name": "Triad: Minor 1st Inv (GBE)",
      "category": "triad",
      "tags": ["triad", "minor", "inversion"],
      "default": { "timeSig": [3,4], "subdivision": "8n", "defaultBpm": 80, "frameSpanFrets": 4, "anchorString": 3, "frameBaseFret": 8, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 2, "finger": 2, "dur16": 2, "picking": "D", "tech": "none" }, // b3
        { "stringRel": 1, "fretRel": 2, "finger": 3, "dur16": 2, "picking": "D", "tech": "none" }, // 5th
        { "stringRel": 2, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }  // Root
      ]
    },
    {
      "id": "triad_cycle_inv_asc",
      "name": "Triad: Inversion Cycle (Ascending)",
      "category": "triad",
      "tags": ["triad", "cycle", "shifting"],
      "default": { "timeSig": [4,4], "subdivision": "8n", "defaultBpm": 70, "frameSpanFrets": 4, "anchorString": 3, "frameBaseFret": 5, "loopBars": 2 },
      "steps": [
        // Root Pos
        { "stringRel": 0, "fretRel": 2, "finger": 3, "dur16": 2, "picking": "D", "tech": "none" },
        { "stringRel": 1, "fretRel": 2, "finger": 4, "dur16": 2, "picking": "D", "tech": "none" },
        { "stringRel": 2, "fretRel": 0, "finger": 1, "dur16": 4, "picking": "D", "tech": "none" },
        // 1st Inv
        { "stringRel": 0, "fretRel": 6, "finger": 2, "dur16": 2, "picking": "D", "tech": "none" }, // Shifted +4
        { "stringRel": 1, "fretRel": 5, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" },
        { "stringRel": 2, "fretRel": 5, "finger": 1, "dur16": 4, "picking": "D", "tech": "none" }
      ],
      "shiftEvents": [
        { "atStepIndex": 3, "deltaFrets": 4, "deltaStrings": 0, "label": "Shift to 1st Inv" }
      ]
    },

    // --- NEW SEVENTH PATTERNS (Shells & Arps) ---
    {
      "id": "shell_maj7_root6",
      "name": "Shell: Maj7 (Root-7-3)",
      "category": "arpeggio",
      "tags": ["shell", "jazz", "maj7"],
      "default": { "timeSig": [3,4], "subdivision": "8n", "defaultBpm": 90, "frameSpanFrets": 4, "anchorString": 6, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }, // Root (6th str)
        { "stringRel": 2, "fretRel": 1, "finger": 2, "dur16": 2, "picking": "D", "tech": "none" }, // 7th (4th str)
        { "stringRel": 3, "fretRel": 1, "finger": 3, "dur16": 2, "picking": "D", "tech": "none" }  // 3rd (3rd str)
      ]
    },
    {
      "id": "shell_min7_root6",
      "name": "Shell: Min7 (Root-b7-b3)",
      "category": "arpeggio",
      "tags": ["shell", "jazz", "min7"],
      "default": { "timeSig": [3,4], "subdivision": "8n", "defaultBpm": 90, "frameSpanFrets": 4, "anchorString": 6, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }, // Root
        { "stringRel": 2, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }, // b7 (Barre)
        { "stringRel": 3, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }  // b3 (Barre)
      ]
    },
    {
      "id": "shell_dom7_root6",
      "name": "Shell: Dom7 (Root-b7-3)",
      "category": "arpeggio",
      "tags": ["shell", "blues", "dom7"],
      "default": { "timeSig": [3,4], "subdivision": "8n", "defaultBpm": 90, "frameSpanFrets": 4, "anchorString": 6, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }, // Root
        { "stringRel": 2, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }, // b7
        { "stringRel": 3, "fretRel": 1, "finger": 2, "dur16": 2, "picking": "D", "tech": "none" }  // 3rd
      ]
    },
    {
      "id": "arp_maj7_sweep_5str",
      "name": "Arp: Maj7 Sweep (5 Strings)",
      "category": "arpeggio",
      "tags": ["sweep", "maj7", "advanced"],
      "default": { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 80, "frameSpanFrets": 5, "anchorString": 5, "frameBaseFret": 3, "loopBars": 2 },
      "steps": [
        // C Maj 7 shape from A string
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" }, // Root
        { "stringRel": 1, "fretRel": 2, "finger": 3, "dur16": 1, "picking": "D", "tech": "none" }, // 3rd
        { "stringRel": 2, "fretRel": 1, "finger": 2, "dur16": 1, "picking": "D", "tech": "none" }, // 5th
        { "stringRel": 3, "fretRel": 2, "finger": 3, "dur16": 1, "picking": "D", "tech": "none" }, // 7th
        { "stringRel": 4, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" }, // Root (E str)
        { "stringRel": 4, "fretRel": 4, "finger": 4, "dur16": 1, "picking": "U", "tech": "none" }, // 3rd (High)
        { "stringRel": 4, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "U", "tech": "pull" }, // Root (Pull)
        { "stringRel": 3, "fretRel": 2, "finger": 3, "dur16": 1, "picking": "U", "tech": "none" }, // 7th
        { "stringRel": 2, "fretRel": 1, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" }, // 5th
        { "stringRel": 1, "fretRel": 2, "finger": 3, "dur16": 1, "picking": "U", "tech": "none" }, // 3rd
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }  // Root
      ]
    },

    // --- NEW SHIFTING PATTERNS ---
    {
      "id": "shift_chromatic_crawler",
      "name": "Shift: Chromatic Crawler",
      "category": "shifts",
      "tags": ["chromatic", "stamina", "shifting"],
      "default": { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 90, "frameSpanFrets": 4, "anchorString": 6, "frameBaseFret": 1, "loopBars": 2 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 1, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 0, "fretRel": 2, "finger": 3, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 3, "finger": 4, "dur16": 1, "picking": "U", "tech": "none" },
        
        // Shift +1
        { "stringRel": 0, "fretRel": 1, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" }, // Fret 1+1 = 2
        { "stringRel": 0, "fretRel": 2, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 0, "fretRel": 3, "finger": 3, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 4, "finger": 4, "dur16": 1, "picking": "U", "tech": "none" },
        
        // Shift +1
        { "stringRel": 0, "fretRel": 1, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" }, // Fret 2+1 = 3
        { "stringRel": 0, "fretRel": 2, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 0, "fretRel": 3, "finger": 3, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 4, "finger": 4, "dur16": 1, "picking": "U", "tech": "none" }
      ],
      "shiftEvents": [
        { "atStepIndex": 4, "deltaFrets": 1, "deltaStrings": 0, "label": "Shift +1" },
        { "atStepIndex": 8, "deltaFrets": 1, "deltaStrings": 0, "label": "Shift +1" }
      ]
    },
    {
      "id": "shift_slide_connect",
      "name": "Shift: Pentatonic Slide Connect",
      "category": "shifts",
      "tags": ["pentatonic", "slide", "phrasing"],
      "default": { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 90, "frameSpanFrets": 5, "anchorString": 3, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 2, "finger": 3, "dur16": 1, "picking": "D", "tech": "slide" }, // Slide to next pos
        { "stringRel": 0, "fretRel": 2, "finger": 3, "dur16": 1, "picking": "U", "tech": "none" }, // Arrive (visual trick, logic handles absolute)
        { "stringRel": 1, "fretRel": 1, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" }
      ],
      "shiftEvents": [
        { "atStepIndex": 2, "deltaFrets": 2, "deltaStrings": 0, "label": "Slide to Box 2" }
      ]
    },
    {
      "id": "shift_octave_displacement",
      "name": "Shift: Octave Displacement",
      "category": "shifts",
      "tags": ["octaves", "jumps", "navigation"],
      "default": { "timeSig": [4,4], "subdivision": "8n", "defaultBpm": 80, "frameSpanFrets": 4, "anchorString": 6, "frameBaseFret": 3, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }, // Root Low E
        { "stringRel": 2, "fretRel": 2, "finger": 3, "dur16": 2, "picking": "D", "tech": "none" }, // Octave D String (rel to frame)
        // Shift frame up 2 frets
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" }, 
        { "stringRel": 2, "fretRel": 2, "finger": 3, "dur16": 2, "picking": "D", "tech": "none" }
      ],
      "shiftEvents": [
        { "atStepIndex": 2, "deltaFrets": 2, "deltaStrings": 0, "label": "Shift +2" }
      ]
    },

    // --- OTHER EXISTING PATTERNS ---
    {
      "id": "p008_shift_frame_plus2_every_bar",
      "name": "Shift Gym: +2 frets / bar",
      "category": "shifts",
      "tags": ["shifting", "frame", "timing"],
      "default": { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 85, "frameSpanFrets": 4, "anchorString": 6, "frameBaseFret": 3, "loopBars": 4 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 1, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 0, "fretRel": 3, "finger": 4, "dur16": 1, "picking": "D", "tech": "slide" },
        { "stringRel": 0, "fretRel": 1, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" }
      ],
      "shiftEvents": [
        { "atStepIndex": 4,  "deltaFrets": 2, "deltaStrings": 0, "label": "Shift +2" },
        { "atStepIndex": 8,  "deltaFrets": 2, "deltaStrings": 0, "label": "Shift +2" },
        { "atStepIndex": 12, "deltaFrets": 2, "deltaStrings": 0, "label": "Shift +2" }
      ]
    },
    {
      "id": "p010_arpeggio_diag_maj7_1nps",
      "name": "Arp: Maj7 Diagonal (Sweep)",
      "category": "arpeggio",
      "tags": ["diagonal", "sweepFriendly", "maj7"],
      "default": { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 90, "frameSpanFrets": 5, "anchorString": 6, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" },
        { "stringRel": 1, "fretRel": 3, "finger": 3, "dur16": 2, "picking": "D", "tech": "none" },
        { "stringRel": 2, "fretRel": 2, "finger": 2, "dur16": 2, "picking": "D", "tech": "none" },
        { "stringRel": 3, "fretRel": 1, "finger": 1, "dur16": 2, "picking": "D", "tech": "none" },
        { "stringRel": 4, "fretRel": 2, "finger": 2, "dur16": 2, "picking": "D", "tech": "none" }
      ]
    },
    {
      "id": "p012_arpeggio_2nps_min7",
      "name": "Arp: Min7 (2NPS)",
      "category": "arpeggio",
      "tags": ["2nps", "min7", "alternatePicking"],
      "default": { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 90, "frameSpanFrets": 5, "anchorString": 6, "frameBaseFret": 5, "loopBars": 1 },
      "steps": [
        { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 0, "fretRel": 3, "finger": 3, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 1, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 1, "fretRel": 2, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" },
        { "stringRel": 2, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
        { "stringRel": 2, "fretRel": 2, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" }
      ]
    },
    {
        id: "p020_burst_turnaround",
        name: "Burst: 3NPS Turnaround",
        category: "3nps",
        tags: ["burst", "turnaround", "control"],
        default: { "timeSig": [4,4], "subdivision": "16n", "defaultBpm": 95, "frameSpanFrets": 5, "anchorString": 6, "frameBaseFret": 5, "loopBars": 1 },
        "steps": [
          { "stringRel": 0, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "D", "tech": "none" },
          { "stringRel": 0, "fretRel": 2, "finger": 2, "dur16": 1, "picking": "U", "tech": "none" },
          { "stringRel": 0, "fretRel": 4, "finger": 4, "dur16": 1, "picking": "D", "tech": "none" },
          { "stringRel": 1, "fretRel": 4, "finger": 4, "dur16": 1, "picking": "U", "tech": "none" },
          { "stringRel": 1, "fretRel": 2, "finger": 2, "dur16": 1, "picking": "D", "tech": "none" },
          { "stringRel": 1, "fretRel": 0, "finger": 1, "dur16": 1, "picking": "U", "tech": "none" }
        ]
      }
];
