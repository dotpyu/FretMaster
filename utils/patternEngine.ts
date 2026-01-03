
import { PatternDefinition, SequenceNote, PatternStep, ShiftEvent, HandFrame } from '../types';
import { STRINGS } from '../constants';

export interface InstantiationConfig {
  anchorString: number; // 1-6
  frameBaseFret: number;
}

export interface InstantiationResult {
  sequence: SequenceNote[];
  frames: HandFrame[];
}

export const instantiatePattern = (
  pattern: PatternDefinition,
  config: InstantiationConfig
): InstantiationResult => {
  const sequence: SequenceNote[] = [];
  const frames: HandFrame[] = [];

  let currentAnchorString = config.anchorString;
  let currentBaseFret = config.frameBaseFret;
  
  // Create initial frame
  frames.push({
    string: currentAnchorString,
    fret: currentBaseFret,
    span: pattern.default.frameSpanFrets,
    label: `Pos ${currentBaseFret}`
  });

  pattern.steps.forEach((step, index) => {
    // Check for shift events before processing step
    const shift = pattern.shiftEvents?.find(s => s.atStepIndex === index);
    if (shift) {
      currentBaseFret += shift.deltaFrets;
      // Note: deltaStrings > 0 means move to higher pitch string (lower index)
      currentAnchorString -= shift.deltaStrings; 
      
      frames.push({
        string: currentAnchorString,
        fret: currentBaseFret,
        span: pattern.default.frameSpanFrets,
        label: shift.label
      });
    }

    // Calculate Absolute Position
    // stringRel: 0 = anchor, 1 = anchor - 1
    const absStringId = currentAnchorString - step.stringRel;
    const absFret = currentBaseFret + step.fretRel;

    // Safety clamp
    const safeStringId = Math.max(1, Math.min(6, absStringId));
    const safeFret = Math.max(0, Math.min(24, absFret));

    // Get Midi
    const stringDef = STRINGS.find(s => s.id === safeStringId);
    const midi = (stringDef ? stringDef.midi : 0) + safeFret;

    // Convert duration (dur16) to beats. 16th note = 0.25 beats
    const durationInBeats = step.dur16 * 0.25;

    sequence.push({
      string: safeStringId,
      fret: safeFret,
      finger: step.finger,
      duration: durationInBeats,
      label: step.fretRel.toString(), // Relative label by default
      midi: midi,
      picking: step.picking,
      tech: step.tech
    });
  });

  return { sequence, frames };
};
