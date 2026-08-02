import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const sampleRate = 44_100;
const bpm = 128;
const beat = 60 / bpm;
const bar = beat * 4;
const bars = 56;
const duration = bars * bar + 1.5;
const frames = Math.ceil(duration * sampleRate);
const left = new Float32Array(frames);
const right = new Float32Array(frames);
let seed = 0x475055;

const output = resolve(process.argv[2] ?? "/tmp/gpu-overclock.wav");
const midiToHz = (midi) => 440 * 2 ** ((midi - 69) / 12);
const random = () => {
  seed = (seed * 1_664_525 + 1_013_904_223) >>> 0;
  return seed / 0xffffffff;
};

function addSample(time, sample, pan = 0) {
  const index = Math.floor(time * sampleRate);
  if (index < 0 || index >= frames) return;
  left[index] += sample * Math.sqrt((1 - pan) / 2);
  right[index] += sample * Math.sqrt((1 + pan) / 2);
}

function envelope(t, length, attack = 0.02, release = 0.14) {
  return Math.min(1, t / attack) * Math.min(1, (length - t) / release);
}

function synth(start, length, frequency, volume, pan = 0, kind = "saw") {
  const startFrame = Math.floor(start * sampleRate);
  const endFrame = Math.min(frames, Math.ceil((start + length) * sampleRate));
  for (let frame = startFrame; frame < endFrame; frame += 1) {
    const t = frame / sampleRate - start;
    const phase = 2 * Math.PI * frequency * t;
    let wave = Math.sin(phase);
    if (kind === "saw") wave = 0.72 * Math.sin(phase) + 0.22 * Math.sin(phase * 2) + 0.08 * Math.sin(phase * 3);
    if (kind === "square") wave = Math.tanh(2.2 * (Math.sin(phase) + 0.24 * Math.sin(phase * 3)));
    const sample = wave * envelope(t, length) * volume;
    addSample(frame / sampleRate, sample, pan);
  }
}

function kick(start, volume = 0.74) {
  const length = 0.34;
  const end = Math.ceil(length * sampleRate);
  for (let i = 0; i < end; i += 1) {
    const t = i / sampleRate;
    const frequency = 48 + 112 * Math.exp(-t * 23);
    const body = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 12);
    const click = (random() * 2 - 1) * Math.exp(-t * 85) * 0.2;
    addSample(start + t, (body + click) * volume, 0);
  }
}

function snare(start, volume = 0.28) {
  for (let i = 0; i < 0.26 * sampleRate; i += 1) {
    const t = i / sampleRate;
    const noise = (random() * 2 - 1) * Math.exp(-t * 17);
    const tone = Math.sin(2 * Math.PI * 184 * t) * Math.exp(-t * 22);
    addSample(start + t, (noise * 0.78 + tone * 0.22) * volume, 0.08);
  }
}

function hat(start, volume = 0.07, pan = 0) {
  for (let i = 0; i < 0.055 * sampleRate; i += 1) {
    const t = i / sampleRate;
    const noise = (random() * 2 - 1) * Math.exp(-t * 68);
    const metallic = noise - Math.sin(2 * Math.PI * 4100 * t) * 0.12;
    addSample(start + t, metallic * volume, pan);
  }
}

function riser(start, length) {
  for (let i = 0; i < length * sampleRate; i += 1) {
    const t = i / sampleRate;
    const progress = t / length;
    const noise = (random() * 2 - 1) * progress ** 2 * 0.1;
    const tone = Math.sin(2 * Math.PI * (180 + 620 * progress ** 2) * t) * progress ** 3 * 0.07;
    addSample(start + t, noise + tone, Math.sin(progress * Math.PI * 4) * 0.45);
  }
}

const progression = [45, 41, 48, 43];
const leadPattern = [0, 3, 7, 10, 7, 12, 10, 7, 3, 7, 15, 12, 10, 7, 5, 3];

for (let barIndex = 0; barIndex < bars; barIndex += 1) {
  const start = barIndex * bar;
  const root = progression[barIndex % progression.length];
  const intro = barIndex < 8;
  const build = barIndex >= 8 && barIndex < 16;
  const dropOne = barIndex >= 16 && barIndex < 32;
  const breakDown = barIndex >= 32 && barIndex < 40;
  const dropTwo = barIndex >= 40 && barIndex < 52;
  const outro = barIndex >= 52;
  const energy = intro ? 0.52 : build ? 0.72 : breakDown ? 0.58 : outro ? 0.46 : 1;

  [0, 7, 12, 16].forEach((offset, voice) => {
    synth(start, bar * 1.08, midiToHz(root + offset + 12), 0.035 * energy, (voice - 1.5) * 0.18, "saw");
  });

  if (!intro && !outro) {
    for (let beatIndex = 0; beatIndex < 4; beatIndex += 1) {
      const beatStart = start + beatIndex * beat;
      if (!breakDown || beatIndex === 0) kick(beatStart, breakDown ? 0.42 : 0.68);
      if (beatIndex === 1 || beatIndex === 3) snare(beatStart, breakDown ? 0.17 : 0.27);
      for (let eighth = 0; eighth < 2; eighth += 1) {
        hat(beatStart + eighth * beat * 0.5, breakDown ? 0.035 : 0.065, eighth ? 0.34 : -0.22);
      }
    }
  }

  if (build || dropOne || dropTwo) {
    for (let eighth = 0; eighth < 8; eighth += 1) {
      const note = root + (eighth % 4 === 3 ? 7 : eighth % 2 === 0 ? 0 : 12);
      synth(start + eighth * beat * 0.5, beat * 0.42, midiToHz(note), dropOne || dropTwo ? 0.125 : 0.085, -0.08, "square");
    }
  }

  if (dropOne || dropTwo) {
    for (let step = 0; step < 16; step += 1) {
      const note = root + 24 + leadPattern[(step + (dropTwo ? 5 : 0)) % leadPattern.length];
      const noteStart = start + step * beat * 0.25;
      synth(noteStart, beat * 0.2, midiToHz(note), 0.045, step % 2 ? 0.28 : -0.28, "saw");
      synth(noteStart + 0.18, beat * 0.16, midiToHz(note), 0.016, step % 2 ? -0.34 : 0.34, "saw");
    }
  }
}

riser(bar * 14, bar * 2);
riser(bar * 38, bar * 2);

let peak = 0;
for (let i = 0; i < frames; i += 1) peak = Math.max(peak, Math.abs(left[i]), Math.abs(right[i]));
const gain = 0.91 / Math.max(peak, 0.01);
const dataSize = frames * 4;
const wav = Buffer.alloc(44 + dataSize);
wav.write("RIFF", 0);
wav.writeUInt32LE(36 + dataSize, 4);
wav.write("WAVEfmt ", 8);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(sampleRate, 24);
wav.writeUInt32LE(sampleRate * 4, 28);
wav.writeUInt16LE(4, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(dataSize, 40);

for (let i = 0; i < frames; i += 1) {
  wav.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(left[i] * gain * 32767))), 44 + i * 4);
  wav.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(right[i] * gain * 32767))), 46 + i * 4);
}

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, wav);
console.log(`Wrote ${duration.toFixed(1)}s stereo soundtrack to ${output}`);
