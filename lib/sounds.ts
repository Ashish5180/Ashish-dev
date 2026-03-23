"use client";

/**
 * Premium Typing Sound Generator
 * Uses Web Audio API to synthesize a subtle, high-end "thock" sound.
 * No external assets required.
 */

class TypeSound {
  private audioCtx: AudioContext | null = null;

  constructor() {
    // AudioContext is initialized on first play to comply with browser policies
  }

  private init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  play() {
    try {
      this.init();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      // 1. High-frequency "click" (Short noise burst)
      const noiseBuffer = this.audioCtx.createBuffer(1, this.audioCtx.sampleRate * 0.01, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noiseSource = this.audioCtx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const noiseFilter = this.audioCtx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(4000, now);

      const noiseGain = this.audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.05, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.audioCtx.destination);

      // 2. Low-frequency "thock" (Decaying sine wave)
      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

      oscGain.gain.setValueAtTime(0.1, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(oscGain);
      oscGain.connect(this.audioCtx.destination);

      noiseSource.start(now);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  }

  playNotify() {
    try {
      this.init();
      if (!this.audioCtx) return;
      
      const now = this.audioCtx.currentTime;
      
      const osc = this.audioCtx.createOscillator();
      const oscGain = this.audioCtx.createGain();
      
      // Two-tone chime (premium digital feel)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(0.3, now + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      
      osc.connect(oscGain);
      oscGain.connect(this.audioCtx.destination);
      
      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {
      console.warn("Notification audio failed", e);
    }
  }
}


export const typeSound = new TypeSound();
