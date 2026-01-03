class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private distortionCurve: Float32Array | null = null;
  private isEnabled: boolean = false;
  
  constructor() {
    // Lazy init
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.4; // Overall volume
      this.masterGain.connect(this.ctx.destination);
      
      // Create a smooth tube-like overdrive curve
      this.distortionCurve = this.makeDistortionCurve(800); 

      this.isEnabled = true;
    } catch (e) {
      console.error("Web Audio API not supported", e);
    }
  }

  // Soft clipping curve for tube overdrive warmth
  private makeDistortionCurve(amount: number) {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      // Sigmoid function for smoother overdrive than hard clipping
      curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  playTone(frequency: number, duration: number = 0.5, type: OscillatorType = 'sawtooth', velocity: number = 0.7, timeOffset: number = 0) {
    if (!this.isEnabled || !this.ctx || !this.masterGain) {
      this.init(); 
      if (!this.ctx) return;
    }

    const t = this.ctx.currentTime + timeOffset;

    // --- 1. OSCILLATOR SECTION (The String) ---
    // A guitar string is not a pure wave. It has odd harmonics (Square) and even (Saw).
    
    // Osc 1: The "Body" (Triangle/Sine hybrid via filtering)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = frequency;

    // Osc 2: The "Bite" (Sawtooth with Pulse width feel)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.value = frequency;
    // Detune slightly for chorus effect common in guitar tones
    osc2.detune.value = 3; 

    // PITCH ENVELOPE (Crucial for realism)
    // Real strings go sharp when plucked hard due to tension increase
    const pitchAttack = 0.05;
    const pitchDrop = velocity * 10; // Cents
    osc1.frequency.setValueAtTime(frequency + pitchDrop, t);
    osc1.frequency.exponentialRampToValueAtTime(frequency, t + pitchAttack);
    osc2.frequency.setValueAtTime(frequency + pitchDrop, t);
    osc2.frequency.exponentialRampToValueAtTime(frequency, t + pitchAttack);

    // Mix Oscillators
    const oscMix = this.ctx.createGain();
    oscMix.gain.value = 1.0; 

    // --- 2. DYNAMICS & FILTER (The Pick & Tone Knob) ---
    
    // VCA (Volume Envelope)
    const vca = this.ctx.createGain();
    vca.gain.setValueAtTime(0, t);
    vca.gain.linearRampToValueAtTime(velocity, t + 0.002); // Instant attack
    // Decay: Guitar strings decay exponentially
    vca.gain.exponentialRampToValueAtTime(0.01, t + duration + 0.5); 

    // VCF (Filter Envelope) - This removes the "beep" by filtering high harmonics quickly
    const vcf = this.ctx.createBiquadFilter();
    vcf.type = 'lowpass';
    vcf.Q.value = 1; // Slight resonance for "pluck" sound
    
    // Filter opens bright on attack, then closes down to warm sustain
    const maxCutoff = 1000 + (velocity * 3000); // Harder hit = brighter
    const sustainCutoff = 500; 

    vcf.frequency.setValueAtTime(maxCutoff, t);
    vcf.frequency.exponentialRampToValueAtTime(sustainCutoff, t + 0.2); // Pluck decay

    // --- 3. AMP & CABINET SIMULATION (The "Stack") ---
    // This is where "beep bop" turns into "guitar"

    // Tube Drive
    const drive = this.ctx.createWaveShaper();
    if (this.distortionCurve) drive.curve = this.distortionCurve;
    drive.oversample = '4x';

    // Cabinet EQ Stack (Mimic a Celestion V30 Speaker)
    
    // a. Low Cut (Remove mud)
    const eqLowCut = this.ctx.createBiquadFilter();
    eqLowCut.type = 'highpass';
    eqLowCut.frequency.value = 80;

    // b. Cab Resonance (The "Thump" of the box)
    const eqThump = this.ctx.createBiquadFilter();
    eqThump.type = 'peaking';
    eqThump.frequency.value = 120;
    eqThump.Q.value = 1.5;
    eqThump.gain.value = 4;

    // c. Mid Scoop (The "Rock" contour)
    const eqScoop = this.ctx.createBiquadFilter();
    eqScoop.type = 'peaking';
    eqScoop.frequency.value = 400;
    eqScoop.Q.value = 1.0;
    eqScoop.gain.value = -3;

    // d. Presence (The "bite" without fizz)
    const eqPresence = this.ctx.createBiquadFilter();
    eqPresence.type = 'peaking';
    eqPresence.frequency.value = 2500;
    eqPresence.Q.value = 1.0;
    eqPresence.gain.value = 3;

    // e. High Cut (Remove digital fizz/beep)
    const eqHiCut = this.ctx.createBiquadFilter();
    eqHiCut.type = 'lowpass';
    eqHiCut.frequency.value = 5000; // Guitar speakers roll off hard at 5khz

    // --- CONNECTIONS ---
    
    // String Gen
    osc1.connect(oscMix);
    osc2.connect(oscMix);
    
    // Shaping
    oscMix.connect(vcf);
    vcf.connect(vca);
    vca.connect(drive); // Drive the amp with the envelope
    
    // Cab Stack
    drive.connect(eqLowCut);
    eqLowCut.connect(eqThump);
    eqThump.connect(eqScoop);
    eqScoop.connect(eqPresence);
    eqPresence.connect(eqHiCut);
    
    // Output
    eqHiCut.connect(this.masterGain!);

    // Start/Stop
    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + duration + 1.0); // Allow release tail
    osc2.stop(t + duration + 1.0);
  }

  playClick(accent: boolean = false) {
    if (!this.isEnabled || !this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.frequency.setValueAtTime(accent ? 1200 : 800, t);
    osc.frequency.exponentialRampToValueAtTime(10, t + 0.05);
    
    gain.gain.setValueAtTime(accent ? 0.5 : 0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(t);
    osc.stop(t + 0.05);
  }

  midiToFreq(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }
}

export const audioEngine = new AudioEngine();