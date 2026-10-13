"use client";

// Web Audio API Synthesizer for high-quality, zero-dependency sound effects
class SoundEffects {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Cute magical winning fanfare with sparkling chimes & celebratory notes
  playWinSound() {
    try {
      const ctx = this.initCtx();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Major Chord Victory Sequence: C5, E5, G5, B5, C6, E6, G6
      const notes = [
        { freq: 523.25, time: 0.0, dur: 0.35, vol: 0.2 },  // C5
        { freq: 659.25, time: 0.11, dur: 0.35, vol: 0.22 }, // E5
        { freq: 783.99, time: 0.22, dur: 0.35, vol: 0.24 }, // G5
        { freq: 987.77, time: 0.33, dur: 0.4, vol: 0.25 },  // B5
        { freq: 1046.5, time: 0.44, dur: 0.6, vol: 0.28 },  // C6
        { freq: 1318.5, time: 0.58, dur: 0.7, vol: 0.3 },   // E6
        { freq: 1567.98, time: 0.72, dur: 1.1, vol: 0.32 }, // G6
      ];

      notes.forEach(({ freq, time, dur, vol }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + time);

        // Soft music box / glockenspiel envelope
        gain.gain.setValueAtTime(0, now + time);
        gain.gain.linearRampToValueAtTime(vol, now + time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

        // Harmonic shimmer overtone (Octave higher)
        const harmonic = ctx.createOscillator();
        const harmGain = ctx.createGain();
        harmonic.type = "triangle";
        harmonic.frequency.setValueAtTime(freq * 2, now + time);

        harmGain.gain.setValueAtTime(0, now + time);
        harmGain.gain.linearRampToValueAtTime(vol * 0.35, now + time + 0.012);
        harmGain.gain.exponentialRampToValueAtTime(0.001, now + time + dur * 0.75);

        harmonic.connect(harmGain);
        harmGain.connect(ctx.destination);
        harmonic.start(now + time);
        harmonic.stop(now + time + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur);
      });

      // Shimmering Magic Sparkle Cascade at the climax
      const sparkleTimes = [0.8, 0.88, 0.96, 1.04, 1.12, 1.2, 1.28, 1.36, 1.45];
      const sparkleFreqs = [1760, 2093, 2349, 2637, 2793, 3135, 3520, 3951, 4186];

      sparkleTimes.forEach((sTime, idx) => {
        const sOsc = ctx.createOscillator();
        const sGain = ctx.createGain();

        sOsc.type = "sine";
        sOsc.frequency.setValueAtTime(sparkleFreqs[idx % sparkleFreqs.length], now + sTime);

        sGain.gain.setValueAtTime(0, now + sTime);
        sGain.gain.linearRampToValueAtTime(0.08, now + sTime + 0.01);
        sGain.gain.exponentialRampToValueAtTime(0.0001, now + sTime + 0.3);

        sOsc.connect(sGain);
        sGain.connect(ctx.destination);

        sOsc.start(now + sTime);
        sOsc.stop(now + sTime + 0.35);
      });
    } catch (e) {
      console.warn("Audio play error:", e);
    }
  }

  // Soft spin start sound
  playSpinStartSound() {
    try {
      const ctx = this.initCtx();
      if (!ctx) return;
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // ignore
    }
  }
}

export const soundEffects = new SoundEffects();
