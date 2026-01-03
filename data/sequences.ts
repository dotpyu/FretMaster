import { SequenceNote } from '../types';

export interface DrillPreset {
    id: string;
    name: string;
    category: string;
    bpm: number;
    description: string;
    sequence: SequenceNote[];
}

export const DRILL_PRESETS: DrillPreset[] = [
    {
        id: 'c_maj_3nps',
        name: 'C Major Scale (3NPS)',
        category: 'Scales',
        bpm: 80,
        description: 'Standard 3-notes-per-string pattern. Great for alternate picking speed.',
        sequence: [
            // Low E
            { string: 6, fret: 8, finger: 1, duration: 1, label: '8', midi: 48 }, // C
            { string: 6, fret: 10, finger: 2, duration: 1, label: '10', midi: 50 }, // D
            { string: 6, fret: 12, finger: 4, duration: 1, label: '12', midi: 52 }, // E
            // A String
            { string: 5, fret: 8, finger: 1, duration: 1, label: '8', midi: 53 }, // F
            { string: 5, fret: 10, finger: 2, duration: 1, label: '10', midi: 55 }, // G
            { string: 5, fret: 12, finger: 4, duration: 1, label: '12', midi: 57 }, // A
            // D String
            { string: 4, fret: 9, finger: 1, duration: 1, label: '9', midi: 59 }, // B
            { string: 4, fret: 10, finger: 2, duration: 1, label: '10', midi: 60 }, // C
            { string: 4, fret: 12, finger: 4, duration: 1, label: '12', midi: 62 }, // D
            // G String
            { string: 3, fret: 9, finger: 1, duration: 1, label: '9', midi: 64 }, // E
            { string: 3, fret: 10, finger: 2, duration: 1, label: '10', midi: 65 }, // F
            { string: 3, fret: 12, finger: 4, duration: 1, label: '12', midi: 67 }, // G
            // B String
            { string: 2, fret: 10, finger: 1, duration: 1, label: '10', midi: 69 }, // A
            { string: 2, fret: 12, finger: 3, duration: 1, label: '12', midi: 71 }, // B
            { string: 2, fret: 13, finger: 4, duration: 1, label: '13', midi: 72 }, // C
            // High E
            { string: 1, fret: 10, finger: 1, duration: 1, label: '10', midi: 74 }, // D
            { string: 1, fret: 12, finger: 3, duration: 1, label: '12', midi: 76 }, // E
            { string: 1, fret: 13, finger: 4, duration: 1, label: '13', midi: 77 }, // F
        ]
    },
    {
        id: 'chromatic_spider_5',
        name: 'Chromatic Spider (Warmup)',
        category: 'Technique',
        bpm: 100,
        description: 'The ultimate finger independence drill. 1-2-3-4 on every string. Keep fingers close to the fretboard.',
        sequence: [
             // E
             { string: 6, fret: 5, finger: 1, duration: 1, label: '5', midi: 45 },
             { string: 6, fret: 6, finger: 2, duration: 1, label: '6', midi: 46 },
             { string: 6, fret: 7, finger: 3, duration: 1, label: '7', midi: 47 },
             { string: 6, fret: 8, finger: 4, duration: 1, label: '8', midi: 48 },
             // A
             { string: 5, fret: 5, finger: 1, duration: 1, label: '5', midi: 50 },
             { string: 5, fret: 6, finger: 2, duration: 1, label: '6', midi: 51 },
             { string: 5, fret: 7, finger: 3, duration: 1, label: '7', midi: 52 },
             { string: 5, fret: 8, finger: 4, duration: 1, label: '8', midi: 53 },
             // D
             { string: 4, fret: 5, finger: 1, duration: 1, label: '5', midi: 55 },
             { string: 4, fret: 6, finger: 2, duration: 1, label: '6', midi: 56 },
             { string: 4, fret: 7, finger: 3, duration: 1, label: '7', midi: 57 },
             { string: 4, fret: 8, finger: 4, duration: 1, label: '8', midi: 58 },
             // G
             { string: 3, fret: 5, finger: 1, duration: 1, label: '5', midi: 60 },
             { string: 3, fret: 6, finger: 2, duration: 1, label: '6', midi: 61 },
             { string: 3, fret: 7, finger: 3, duration: 1, label: '7', midi: 62 },
             { string: 3, fret: 8, finger: 4, duration: 1, label: '8', midi: 63 },
             // B
             { string: 2, fret: 5, finger: 1, duration: 1, label: '5', midi: 64 },
             { string: 2, fret: 6, finger: 2, duration: 1, label: '6', midi: 65 },
             { string: 2, fret: 7, finger: 3, duration: 1, label: '7', midi: 66 },
             { string: 2, fret: 8, finger: 4, duration: 1, label: '8', midi: 67 },
             // E
             { string: 1, fret: 5, finger: 1, duration: 1, label: '5', midi: 69 },
             { string: 1, fret: 6, finger: 2, duration: 1, label: '6', midi: 70 },
             { string: 1, fret: 7, finger: 3, duration: 1, label: '7', midi: 71 },
             { string: 1, fret: 8, finger: 4, duration: 1, label: '8', midi: 72 },
        ]
    },
    {
        id: 'e_maj_open',
        name: 'E Major Scale (Open)',
        category: 'Scales',
        bpm: 70,
        description: 'Utilize open strings to play the E Major scale across all 6 strings. Fundamental for cowboy chords.',
        sequence: [
            // E
            { string: 6, fret: 0, finger: 0, duration: 1, label: '0', midi: 40 }, // E
            { string: 6, fret: 2, finger: 2, duration: 1, label: '2', midi: 42 }, // F#
            { string: 6, fret: 4, finger: 4, duration: 1, label: '4', midi: 44 }, // G#
            // A
            { string: 5, fret: 0, finger: 0, duration: 1, label: '0', midi: 45 }, // A
            { string: 5, fret: 2, finger: 2, duration: 1, label: '2', midi: 47 }, // B
            { string: 5, fret: 4, finger: 4, duration: 1, label: '4', midi: 49 }, // C#
            // D
            { string: 4, fret: 1, finger: 1, duration: 1, label: '1', midi: 51 }, // D#
            { string: 4, fret: 2, finger: 2, duration: 1, label: '2', midi: 52 }, // E
            { string: 4, fret: 4, finger: 4, duration: 1, label: '4', midi: 54 }, // F#
            // G
            { string: 3, fret: 1, finger: 1, duration: 1, label: '1', midi: 56 }, // G#
            { string: 3, fret: 2, finger: 2, duration: 1, label: '2', midi: 57 }, // A
            { string: 3, fret: 4, finger: 4, duration: 1, label: '4', midi: 59 }, // B
            // B
            { string: 2, fret: 0, finger: 0, duration: 1, label: '0', midi: 59 }, // B (Alt position)
            { string: 2, fret: 2, finger: 2, duration: 1, label: '2', midi: 61 }, // C#
            { string: 2, fret: 4, finger: 4, duration: 1, label: '4', midi: 63 }, // D#
            // E
            { string: 1, fret: 0, finger: 0, duration: 1, label: '0', midi: 64 }, // E
            { string: 1, fret: 2, finger: 2, duration: 1, label: '2', midi: 66 }, // F#
            { string: 1, fret: 4, finger: 4, duration: 1, label: '4', midi: 68 }, // G#
        ]
    },
    {
        id: 'a_min_penta',
        name: 'A Minor Pentatonic (Box 1)',
        category: 'Scales',
        bpm: 90,
        description: 'The rock/blues staple. Focus on the 1-4 finger stretch.',
        sequence: [
            // Low E
            { string: 6, fret: 5, finger: 1, duration: 1, label: '5', midi: 45 }, // A
            { string: 6, fret: 8, finger: 4, duration: 1, label: '8', midi: 48 }, // C
            // A String
            { string: 5, fret: 5, finger: 1, duration: 1, label: '5', midi: 50 }, // D
            { string: 5, fret: 7, finger: 3, duration: 1, label: '7', midi: 52 }, // E
            // D String
            { string: 4, fret: 5, finger: 1, duration: 1, label: '5', midi: 55 }, // G
            { string: 4, fret: 7, finger: 3, duration: 1, label: '7', midi: 57 }, // A
            // G String
            { string: 3, fret: 5, finger: 1, duration: 1, label: '5', midi: 60 }, // C
            { string: 3, fret: 7, finger: 3, duration: 1, label: '7', midi: 62 }, // D
            // B String
            { string: 2, fret: 5, finger: 1, duration: 1, label: '5', midi: 64 }, // E
            { string: 2, fret: 8, finger: 4, duration: 1, label: '8', midi: 67 }, // G
            // High E
            { string: 1, fret: 5, finger: 1, duration: 1, label: '5', midi: 69 }, // A
            { string: 1, fret: 8, finger: 4, duration: 1, label: '8', midi: 72 }, // C
        ]
    },
    {
        id: 'a_min_penta_box2',
        name: 'A Minor Pentatonic (Box 2)',
        category: 'Scales',
        bpm: 90,
        description: 'Extends Box 1 up the neck. Starts on C (8th fret). Essential for breaking out of the box.',
        sequence: [
            // Low E
            { string: 6, fret: 8, finger: 2, duration: 1, label: '8', midi: 48 }, // C
            { string: 6, fret: 10, finger: 4, duration: 1, label: '10', midi: 50 }, // D
            // A String
            { string: 5, fret: 7, finger: 1, duration: 1, label: '7', midi: 52 }, // E
            { string: 5, fret: 10, finger: 4, duration: 1, label: '10', midi: 55 }, // G
            // D String
            { string: 4, fret: 7, finger: 1, duration: 1, label: '7', midi: 57 }, // A
            { string: 4, fret: 10, finger: 4, duration: 1, label: '10', midi: 60 }, // C
            // G String
            { string: 3, fret: 7, finger: 1, duration: 1, label: '7', midi: 62 }, // D
            { string: 3, fret: 9, finger: 3, duration: 1, label: '9', midi: 64 }, // E
            // B String
            { string: 2, fret: 8, finger: 2, duration: 1, label: '8', midi: 67 }, // G
            { string: 2, fret: 10, finger: 4, duration: 1, label: '10', midi: 69 }, // A
            // High E
            { string: 1, fret: 8, finger: 2, duration: 1, label: '8', midi: 72 }, // C
            { string: 1, fret: 10, finger: 4, duration: 1, label: '10', midi: 74 }, // D
        ]
    },
    {
        id: 'd_dorian_3nps',
        name: 'D Dorian Mode (3NPS)',
        category: 'Modes',
        bpm: 90,
        description: 'The "Santana" sound. Minor scale with a natural 6th. Smooth 3NPS run starting on 10th fret.',
        sequence: [
            // Low E (10,12,13)
            { string: 6, fret: 10, finger: 1, duration: 1, label: '10', midi: 50 }, // D
            { string: 6, fret: 12, finger: 2, duration: 1, label: '12', midi: 52 }, // E
            { string: 6, fret: 13, finger: 4, duration: 1, label: '13', midi: 53 }, // F
            // A String (10,12,14)
            { string: 5, fret: 10, finger: 1, duration: 1, label: '10', midi: 55 }, // G
            { string: 5, fret: 12, finger: 2, duration: 1, label: '12', midi: 57 }, // A
            { string: 5, fret: 14, finger: 4, duration: 1, label: '14', midi: 59 }, // B
            // D String (10,12,14)
            { string: 4, fret: 10, finger: 1, duration: 1, label: '10', midi: 60 }, // C
            { string: 4, fret: 12, finger: 2, duration: 1, label: '12', midi: 62 }, // D
            { string: 4, fret: 14, finger: 4, duration: 1, label: '14', midi: 64 }, // E
            // G String (10,12,14)
            { string: 3, fret: 10, finger: 1, duration: 1, label: '10', midi: 65 }, // F
            { string: 3, fret: 12, finger: 2, duration: 1, label: '12', midi: 67 }, // G
            { string: 3, fret: 14, finger: 4, duration: 1, label: '14', midi: 69 }, // A
            // B String (shift to 12,13,15)
            { string: 2, fret: 12, finger: 1, duration: 1, label: '12', midi: 71 }, // B
            { string: 2, fret: 13, finger: 2, duration: 1, label: '13', midi: 72 }, // C
            { string: 2, fret: 15, finger: 4, duration: 1, label: '15', midi: 74 }, // D
            // E String (12,13,15)
            { string: 1, fret: 12, finger: 1, duration: 1, label: '12', midi: 76 }, // E
            { string: 1, fret: 13, finger: 2, duration: 1, label: '13', midi: 77 }, // F
            { string: 1, fret: 15, finger: 4, duration: 1, label: '15', midi: 79 }, // G
        ]
    },
    {
        id: 'g_dom7_arp',
        name: 'G Dom7 Arpeggio (Sweep)',
        category: 'Arpeggios',
        bpm: 60,
        description: 'Classic chord tone sweep. 1 - 3 - 5 - b7 intervals.',
        sequence: [
            { string: 6, fret: 3, finger: 1, duration: 1, label: '3', midi: 43 }, // G (Root)
            { string: 6, fret: 7, finger: 4, duration: 1, label: '7', midi: 47 }, // B (3rd)
            { string: 5, fret: 5, finger: 2, duration: 1, label: '5', midi: 50 }, // D (5th)
            { string: 4, fret: 3, finger: 1, duration: 1, label: '3', midi: 53 }, // F (b7)
            { string: 4, fret: 5, finger: 3, duration: 1, label: '5', midi: 55 }, // G (Octave)
            // Descending
            { string: 4, fret: 3, finger: 1, duration: 1, label: '3', midi: 53 }, // F
            { string: 5, fret: 5, finger: 2, duration: 1, label: '5', midi: 50 }, // D
            { string: 6, fret: 7, finger: 4, duration: 1, label: '7', midi: 47 }, // B
        ]
    },
    {
        id: 'b_min_sweep',
        name: 'B Minor Sweep (Triad)',
        category: 'Arpeggios',
        bpm: 70,
        description: '3-string sweep picking pattern. Keep right hand motion continuous and smooth.',
        sequence: [
            { string: 3, fret: 7, finger: 1, duration: 1, label: '7', midi: 62 }, // D
            { string: 2, fret: 7, finger: 1, duration: 1, label: '7', midi: 66 }, // F#
            { string: 1, fret: 7, finger: 1, duration: 1, label: '7', midi: 71 }, // B
            { string: 1, fret: 10, finger: 4, duration: 1, label: '10', midi: 74 }, // D (Hammer on)
            { string: 1, fret: 7, finger: 1, duration: 1, label: '7', midi: 71 }, // B (Pull off)
            { string: 2, fret: 7, finger: 1, duration: 1, label: '7', midi: 66 }, // F#
            // Loop point
        ]
    },
    {
        id: 'becker_serrana_c',
        name: 'Becker Style Sweep (C Major)',
        category: 'Styles',
        bpm: 110,
        description: 'Multi-octave sweep inspired by Jason Becker. Requires clean muting and fluid right hand motion.',
        sequence: [
            // Ascending
            { string: 5, fret: 15, finger: 4, duration: 1, label: '15', midi: 60 }, // C
            { string: 4, fret: 14, finger: 3, duration: 1, label: '14', midi: 64 }, // E
            { string: 3, fret: 12, finger: 1, duration: 1, label: '12', midi: 67 }, // G
            { string: 2, fret: 13, finger: 2, duration: 1, label: '13', midi: 72 }, // C
            { string: 1, fret: 12, finger: 1, duration: 1, label: '12', midi: 76 }, // E
            { string: 1, fret: 15, finger: 4, duration: 1, label: '15', midi: 79 }, // G
            // Descending
            { string: 1, fret: 12, finger: 1, duration: 1, label: '12', midi: 76 }, // E
            { string: 2, fret: 13, finger: 2, duration: 1, label: '13', midi: 72 }, // C
            { string: 3, fret: 12, finger: 1, duration: 1, label: '12', midi: 67 }, // G
            { string: 4, fret: 14, finger: 3, duration: 1, label: '14', midi: 64 }, // E
        ]
    },
    {
        id: 'ej_pentatonic_fives',
        name: 'EJ Style Pentatonic Fives',
        category: 'Styles',
        bpm: 95,
        description: 'Cascading "groups of 5" run in E Minor Pentatonic. A hallmark of Eric Johnson\'s seamless phrasing.',
        sequence: [
            // Group 1 (High E, B, G)
            { string: 1, fret: 15, finger: 4, duration: 1, label: '15', midi: 79 }, // G
            { string: 1, fret: 12, finger: 1, duration: 1, label: '12', midi: 76 }, // E
            { string: 2, fret: 15, finger: 4, duration: 1, label: '15', midi: 74 }, // D
            { string: 2, fret: 12, finger: 1, duration: 1, label: '12', midi: 71 }, // B
            { string: 3, fret: 14, finger: 3, duration: 1, label: '14', midi: 69 }, // A
            // Group 2 (B, G, D)
            { string: 2, fret: 15, finger: 4, duration: 1, label: '15', midi: 74 }, // D
            { string: 2, fret: 12, finger: 1, duration: 1, label: '12', midi: 71 }, // B
            { string: 3, fret: 14, finger: 3, duration: 1, label: '14', midi: 69 }, // A
            { string: 3, fret: 12, finger: 1, duration: 1, label: '12', midi: 67 }, // G
            { string: 4, fret: 14, finger: 3, duration: 1, label: '14', midi: 62 }, // E
        ]
    },
    {
        id: 'bonamassa_shred_a',
        name: 'Bonamassa Style Shred (A Minor)',
        category: 'Styles',
        bpm: 115,
        description: 'Fast, repeating pentatonic cells. Use bursts of alternate picking to create intensity.',
        sequence: [
            { string: 1, fret: 5, finger: 1, duration: 1, label: '5', midi: 69 }, // A
            { string: 1, fret: 8, finger: 4, duration: 1, label: '8', midi: 72 }, // C
            { string: 1, fret: 5, finger: 1, duration: 1, label: '5', midi: 69 }, // A
            { string: 2, fret: 8, finger: 4, duration: 1, label: '8', midi: 67 }, // G
            { string: 2, fret: 5, finger: 1, duration: 1, label: '5', midi: 64 }, // E
            { string: 3, fret: 7, finger: 3, duration: 1, label: '7', midi: 62 }, // D
            { string: 3, fret: 5, finger: 1, duration: 1, label: '5', midi: 60 }, // C
            { string: 4, fret: 7, finger: 3, duration: 1, label: '7', midi: 57 }, // A
        ]
    },
    {
        id: 'petrucci_chromatic',
        name: 'Petrucci 1-3-2-4 (Chromatic)',
        category: 'Styles',
        bpm: 100,
        description: 'From "Rock Discipline". The 1-3-2-4 finger combination builds independence between middle and ring fingers.',
        sequence: [
            // Low E
            { string: 6, fret: 5, finger: 1, duration: 1, label: '5', midi: 45 },
            { string: 6, fret: 7, finger: 3, duration: 1, label: '7', midi: 47 },
            { string: 6, fret: 6, finger: 2, duration: 1, label: '6', midi: 46 },
            { string: 6, fret: 8, finger: 4, duration: 1, label: '8', midi: 48 },
            // A
            { string: 5, fret: 5, finger: 1, duration: 1, label: '5', midi: 50 },
            { string: 5, fret: 7, finger: 3, duration: 1, label: '7', midi: 52 },
            { string: 5, fret: 6, finger: 2, duration: 1, label: '6', midi: 51 },
            { string: 5, fret: 8, finger: 4, duration: 1, label: '8', midi: 53 },
            // D
            { string: 4, fret: 5, finger: 1, duration: 1, label: '5', midi: 55 },
            { string: 4, fret: 7, finger: 3, duration: 1, label: '7', midi: 57 },
            { string: 4, fret: 6, finger: 2, duration: 1, label: '6', midi: 56 },
            { string: 4, fret: 8, finger: 4, duration: 1, label: '8', midi: 58 },
            // G
            { string: 3, fret: 5, finger: 1, duration: 1, label: '5', midi: 60 },
            { string: 3, fret: 7, finger: 3, duration: 1, label: '7', midi: 62 },
            { string: 3, fret: 6, finger: 2, duration: 1, label: '6', midi: 61 },
            { string: 3, fret: 8, finger: 4, duration: 1, label: '8', midi: 63 },
             // B
            { string: 2, fret: 5, finger: 1, duration: 1, label: '5', midi: 64 },
            { string: 2, fret: 7, finger: 3, duration: 1, label: '7', midi: 66 },
            { string: 2, fret: 6, finger: 2, duration: 1, label: '6', midi: 65 },
            { string: 2, fret: 8, finger: 4, duration: 1, label: '8', midi: 67 },
             // E
            { string: 1, fret: 5, finger: 1, duration: 1, label: '5', midi: 69 },
            { string: 1, fret: 7, finger: 3, duration: 1, label: '7', midi: 71 },
            { string: 1, fret: 6, finger: 2, duration: 1, label: '6', midi: 70 },
            { string: 1, fret: 8, finger: 4, duration: 1, label: '8', midi: 72 },
        ]
    },
    {
        id: 'yngwie_harm_min',
        name: 'Yngwie A Harmonic Minor',
        category: 'Styles',
        bpm: 110,
        description: 'Neoclassical Fury. The defining sound of Yngwie is the Major 7th (G#) used in a minor context.',
        sequence: [
             // Low E
            { string: 6, fret: 5, finger: 1, duration: 1, label: '5', midi: 45 }, // A
            { string: 6, fret: 7, finger: 3, duration: 1, label: '7', midi: 47 }, // B
            { string: 6, fret: 8, finger: 4, duration: 1, label: '8', midi: 48 }, // C
             // A
            { string: 5, fret: 5, finger: 1, duration: 1, label: '5', midi: 50 }, // D
            { string: 5, fret: 7, finger: 3, duration: 1, label: '7', midi: 52 }, // E
            { string: 5, fret: 8, finger: 4, duration: 1, label: '8', midi: 53 }, // F
             // D (The G# is key here)
            { string: 4, fret: 6, finger: 1, duration: 1, label: '6', midi: 56 }, // G#
            { string: 4, fret: 7, finger: 2, duration: 1, label: '7', midi: 57 }, // A
            { string: 4, fret: 9, finger: 4, duration: 1, label: '9', midi: 59 }, // B
             // G
            { string: 3, fret: 5, finger: 1, duration: 1, label: '5', midi: 60 }, // C
            { string: 3, fret: 7, finger: 3, duration: 1, label: '7', midi: 62 }, // D
            { string: 3, fret: 9, finger: 4, duration: 1, label: '9', midi: 64 }, // E
             // B
            { string: 2, fret: 6, finger: 1, duration: 1, label: '6', midi: 65 }, // F
            { string: 2, fret: 9, finger: 4, duration: 1, label: '9', midi: 68 }, // G#
            { string: 2, fret: 10, finger: 4, duration: 1, label: '10', midi: 69 }, // A
        ]
    },
    {
        id: 'richardson_tech_dim',
        name: 'Richardson Tech (Diminished)',
        category: 'Styles',
        bpm: 120,
        description: 'Modern technical metal run using diagonal diminished 7th shapes. Strict alternate picking required.',
        sequence: [
            // E Diminished 7 Run (E, G, Bb, Db)
            // A String
            { string: 5, fret: 7, finger: 1, duration: 1, label: '7', midi: 52 }, // E
            { string: 5, fret: 10, finger: 4, duration: 1, label: '10', midi: 55 }, // G
            // D String
            { string: 4, fret: 8, finger: 2, duration: 1, label: '8', midi: 58 }, // Bb
            { string: 4, fret: 11, finger: 4, duration: 1, label: '11', midi: 61 }, // Db
            // G String
            { string: 3, fret: 9, finger: 2, duration: 1, label: '9', midi: 64 }, // E
            { string: 3, fret: 12, finger: 4, duration: 1, label: '12', midi: 67 }, // G
             // B String
            { string: 2, fret: 11, finger: 3, duration: 1, label: '11', midi: 70 }, // Bb
            { string: 2, fret: 14, finger: 4, duration: 1, label: '14', midi: 73 }, // Db
             // High E
            { string: 1, fret: 12, finger: 2, duration: 1, label: '12', midi: 76 }, // E
            { string: 1, fret: 15, finger: 4, duration: 1, label: '15', midi: 79 }, // G
        ]
    }
];