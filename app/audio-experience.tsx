"use client";

import { useEffect, useRef, useState } from "react";

type AudioEngine = {
  stop: () => void;
};

function createAudioEngine(): AudioEngine | null {
  const AudioContextClass = window.AudioContext;
  if (!AudioContextClass) return null;

  const context = new AudioContextClass();
  const master = context.createGain();
  const compressor = context.createDynamicsCompressor();
  master.gain.setValueAtTime(0.055, context.currentTime);
  master.connect(compressor);
  compressor.connect(context.destination);

  const tempo = 126;
  const stepLength = 60 / tempo / 4;
  const bassNotes = [55, 55, 65.41, 55, 82.41, 73.42, 65.41, 49];
  const leadNotes = [220, 261.63, 329.63, 392, 329.63, 261.63, 246.94, 196];
  let step = 0;
  let nextStep = context.currentTime + 0.06;

  const tone = (frequency: number, start: number, length: number, volume: number, type: OscillatorType) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(start);
    oscillator.stop(start + length + 0.02);
  };

  const kick = (start: number) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(120, start);
    oscillator.frequency.exponentialRampToValueAtTime(45, start + 0.12);
    gain.gain.setValueAtTime(0.55, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(start);
    oscillator.stop(start + 0.18);
  };

  const schedule = () => {
    while (nextStep < context.currentTime + 0.16) {
      if (step % 4 === 0) kick(nextStep);
      if (step % 2 === 0) {
        tone(bassNotes[(step / 2) % bassNotes.length], nextStep, stepLength * 1.7, 0.19, "sawtooth");
      }
      if (step % 2 === 1) {
        tone(leadNotes[((step - 1) / 2) % leadNotes.length], nextStep, stepLength * 0.75, 0.055, "square");
      }
      step = (step + 1) % 16;
      nextStep += stepLength;
    }
  };

  schedule();
  const timer = window.setInterval(schedule, 60);

  return {
    stop: () => {
      window.clearInterval(timer);
      master.gain.cancelScheduledValues(context.currentTime);
      master.gain.setValueAtTime(master.gain.value, context.currentTime);
      master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.12);
      window.setTimeout(() => void context.close(), 160);
    },
  };
}

export function AudioExperience() {
  const engineRef = useRef<AudioEngine | null>(null);
  const soundButtonRef = useRef<HTMLButtonElement>(null);
  const [entered, setEntered] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  const startSound = () => {
    engineRef.current?.stop();
    engineRef.current = createAudioEngine();
    setSoundOn(Boolean(engineRef.current));
  };

  const stopSound = () => {
    engineRef.current?.stop();
    engineRef.current = null;
    setSoundOn(false);
  };

  useEffect(() => () => engineRef.current?.stop(), []);

  useEffect(() => {
    if (entered) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [entered]);

  useEffect(() => {
    if (!entered) return;
    soundButtonRef.current?.focus({ preventScroll: true });
  }, [entered]);

  return (
    <>
      {!entered ? (
        <div className="sound-gate" role="dialog" aria-modal="true" aria-labelledby="sound-gate-title">
          <div className="sound-gate-grid" aria-hidden="true" />
          <div className="sound-gate-inner">
            <p className="sound-gate-kicker">GPU // AUDIO SYSTEM</p>
            <h2 id="sound-gate-title">ENTER THE<br />OVERCLOCK.</h2>
            <p>An original high-voltage synth loop is ready.</p>
            <div className="sound-gate-actions">
              <button
                type="button"
                className="button button-primary"
                autoFocus
                onClick={() => {
                  startSound();
                  setEntered(true);
                }}
              >
                Enter with sound <span aria-hidden="true">▶</span>
              </button>
              <button type="button" className="button button-ghost" onClick={() => setEntered(true)}>
                Enter muted <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {entered ? (
        <button
          ref={soundButtonRef}
          type="button"
          className="sound-toggle"
          aria-pressed={soundOn}
          aria-label={soundOn ? "Mute GPU soundtrack" : "Play GPU soundtrack"}
          onClick={() => (soundOn ? stopSound() : startSound())}
        >
          <span className={soundOn ? "sound-bars sound-bars-active" : "sound-bars"} aria-hidden="true">
            <i /><i /><i />
          </span>
          {soundOn ? "Sound on" : "Sound off"}
        </button>
      ) : null}
    </>
  );
}
