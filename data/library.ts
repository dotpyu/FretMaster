import { DrillDefinition } from '../types';

export const LIBRARY_DATA: Record<string, DrillDefinition[]> = {
  "Core Vision": [
    {
      id: "root_map",
      name: "Root Map (E & A Strings)",
      category: "Core Vision",
      description: "The absolute foundation of fretboard navigation. Your ability to locate any root on the Low E and A strings determines your speed in finding chords and scales. By mastering these two bass strings, you create 'anchor points' that unlock the rest of the neck via octave shapes and interval formulas.",
      formula: ["1"],
      intervals: [0],
      tips: [
        "Don't memorize the whole fretboard at once. Master E and A strings first.",
        "Use octave shapes to find notes on D and G strings (up 2 frets, up 2 strings).",
        "If you get lost, return to the nearest E or A string anchor immediately."
      ],
      exercises: [
        "Random Note Finder: Pick a note (e.g., 'C') and find it on the E string, then A string, instantly.",
        "Octave Jumps: Play a root on Low E, then find its octave on D. Repeat for A to G."
      ]
    },
    {
      id: "interval_gps",
      name: "Interval GPS (Offsets)",
      category: "Core Vision",
      description: "The 'GPS' system. From any root note, you must instantly visualize the geometric relationship to key intervals: the 3rd (chord quality), 5th (stability), 7th (function), and 9th (color). This trains your eye to see relative shapes rather than just memorizing absolute fret numbers.",
      formula: ["1", "3", "5", "7", "9"],
      intervals: [0, 4, 7, 11, 14],
      tips: [
        "Major 3rd is always one string down, one fret back (from E/A string root).",
        "Perfect 5th is power chord shape (one string down, two frets up).",
        "Practice one-fret switches: 3 ↔ b3, 7 ↔ b7, 9 ↔ b9."
      ],
      exercises: [
        "The Compass Drill: Pick a root. Point to the 3rd, then flat 7th, then 5th without playing.",
        "Switch Flipping: Play Root-3-5, then Root-b3-5 (Major to Minor)."
      ]
    }
  ],
  "Triads & Inversions": [
    {
      id: "triad_major_spread",
      name: "Major Triads (String Sets)",
      category: "Triads & Inversions",
      description: "Triads are where 'vision' becomes real music. Mastering the GBE and DGB string sets allows you to break free from open chords and barre shapes. You will learn to play melodically through chord changes by connecting the nearest available inversions on the top string sets.",
      formula: ["1", "3", "5"],
      intervals: [0, 4, 7],
      tips: [
        "Learn these on string sets GBE and DGB first.",
        "Voice leading is key: Move to the nearest inversion of the next chord, not the same shape.",
        "Triads are just 'CAGED' forms in miniature."
      ],
      exercises: [
        "Cycle of 4ths: Play C Major triad, then nearest F Major triad, then Bb Major.",
        "Inversion Ladder: Play Root pos -> 1st Inv -> 2nd Inv -> Root pos up the neck."
      ]
    },
    {
      id: "triad_minor_spread",
      name: "Minor Triads",
      category: "Triads & Inversions",
      description: "The emotional counterpart to major triads. Essential for minor blues, rock, and jazz. Focus on flattening the 3rd degree of the major shape to instantly transform the quality. Mastering these shapes provides the backbone for understanding minor keys and modal playing.",
      formula: ["1", "b3", "5"],
      intervals: [0, 3, 7],
      tips: [
        "Visualize the Major triad first, then lower the 3rd by one fret.",
        "Pay attention to the b3 interval; it defines the minor quality."
      ],
      exercises: [
        "Quality Swaps: Play C Major, then C Minor in the same position.",
        "Staircase: Ascend with Major triads, descend with Minor triads."
      ]
    }
  ],
  "Harmonic Color": [
    {
      id: "dom9_shell",
      name: "Dominant 9th (Shells)",
      category: "Harmonic Color",
      description: "The funk and blues staple famously used by James Brown and Hendrix. Think of this as a standard Dominant 7th shell (1-3-b7) with an added 9th extension on top for sophistication. It adds a glassy, modern sheen without cluttering the mix.",
      formula: ["1", "3", "b7", "9"],
      intervals: [0, 4, 10, 14],
      tips: [
        "Don't learn this as a new shape. See it as (1-3-5) + b7 + 9.",
        "The 9th is just a Whole Step above the Octave.",
        "If you hit the 3rd and b7, you define the chord. The root is optional."
      ],
      exercises: [
        "Funk Stabs: Play the top 3 notes (3, b7, 9) on strings 4-3-2.",
        "Extension Add: Play Dom7 arp, then add the 9th on top."
      ]
    },
    {
      id: "minor9_color",
      name: "Minor 9th",
      category: "Harmonic Color",
      description: "Sophisticated, soulful, and modern. This shape adds a 9th extension to the minor 7th shell (1-b3-b7), creating a lush, atmospheric sound often found in Neo-Soul, Jazz, and R&B. It's the perfect substitution for standard minor chords when you need more depth.",
      formula: ["1", "b3", "b7", "9"],
      intervals: [0, 3, 10, 14],
      tips: [
        "Formula: (1-b3-5) + b7 + 9.",
        "Great for substituting standard minor chords in slow jams."
      ],
      exercises: [
        "Arpeggio Burst: 1 - b3 - 5 - b7 - 9 - b7 - 5 - b3."
      ]
    }
  ],
  "Mental Models": [
    {
      id: "guide_tones",
      name: "Guide Tones (3rd & 7th)",
      category: "Mental Models",
      description: "The steering wheel of harmony. The 3rd and 7th are the only notes required to define a chord's quality (Major vs Minor) and function (Dominant vs Tonic). Learning to target these specific notes during chord changes is the single biggest step towards sounding like a pro improviser.",
      formula: ["3", "7"],
      intervals: [4, 11],
      tips: [
        "Rule: On chord changes, aim to land on a 3rd or 7th.",
        "If you only play these two notes, the listener hears the full harmony.",
        "They move smoothly: The 7th of a dominant chord resolves down a half-step to the 3rd of the tonic."
      ],
      exercises: [
        "The Skeleton: Play a 12-bar blues using ONLY 3rds and 7ths.",
        "Target Practice: Improvise, but you MUST hit a guide tone on Beat 1 of every bar."
      ]
    },
    {
      id: "approach_notes",
      name: "Approach Notes",
      category: "Mental Models",
      description: "The secret to sounding 'professional' and jazzy. Don't just land directly on a target note; create tension and release by approaching it from a half-step below (chromatic) or from the scale degree above. This turns static scales into fluid, vocal-like lines.",
      formula: ["b1", "1", "2", "b3", "3"],
      intervals: [-1, 0, 2, 3, 4],
      tips: [
        " chromatic approach: 1 fret below -> Target.",
        "Scale approach: Scale note above -> Target.",
        "Think 'Approach -> Target' as a single musical word."
      ],
      exercises: [
        "The Slip: Slide into every root note from one fret below.",
        "Enclosure: Play note above, note below, then Target."
      ]
    }
  ],
  "Scales & Modes": [
    {
      id: "major_scale",
      name: "Major Scale (Ionian)",
      category: "Scales & Modes",
      description: "The foundation of Western music harmony (Ionian Mode). Bright, happy, and stable, it serves as the parent scale from which all other modes are derived. We focus on 3-Notes-Per-String (3NPS) patterns to facilitate speed, legato technique, and full fretboard coverage.",
      formula: ["1", "2", "3", "4", "5", "6", "7"],
      intervals: [0, 2, 4, 5, 7, 9, 11],
      tips: [
        "Use 3NPS (3 Notes Per String) patterns for speed.",
        "Always know where your roots are within the pattern."
      ],
      exercises: [
        "Scale Highway: Run 3NPS from Low E to High E.",
        "Sequencing: Play groups of 4 (1-2-3-4, 2-3-4-5, etc)."
      ]
    },
    {
      id: "pentatonic_minor",
      name: "Minor Pentatonic",
      category: "Scales & Modes",
      description: "The undisputed king of Rock and Blues. By removing the tension-causing 2nd and 6th degrees from the natural minor scale, we get a versatile 5-note vocabulary that is almost impossible to play 'wrong'. Focus on string bending points (b3 and b7) to add vocal expression.",
      formula: ["1", "b3", "4", "5", "b7"],
      intervals: [0, 3, 5, 7, 10],
      tips: [
        "This is your 'safe' zone. You can't really hit a wrong note.",
        "Bending: The b3 and b7 are the best notes to bend slightly sharp."
      ],
      exercises: [
        "The Box Breaker: Connect Box 1 and Box 2 using a slide on the G string.",
        "Call & Response: Play a simple phrase, then answer it."
      ]
    },
     {
      id: "mixolydian",
      name: "Mixolydian",
      category: "Scales & Modes",
      description: "The sound of Classic Rock and Jam Bands. It is identical to the Major Scale but features a flattened 7th degree (b7), which removes the 'leading tone' tension and makes it perfectly compatible with Dominant 7 chords. Essential for the 'Jerry Garcia' or 'Allman Brothers' sound.",
      formula: ["1", "2", "3", "4", "5", "6", "b7"],
      intervals: [0, 2, 4, 5, 7, 9, 10],
      tips: [
        "Use over Dominant 7 chords.",
        "It's just a Major scale with a 'rock' 7th."
      ],
      exercises: [
        "Jerry's Run: Highlight the b7 to 1 resolution."
      ]
    }
  ]
};