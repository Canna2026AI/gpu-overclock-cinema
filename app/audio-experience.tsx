"use client";

import { useRef, useState } from "react";

export function AudioExperience() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const toggleSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      audio.volume = 0.62;
      await audio.play();
      setUnavailable(false);
    } catch {
      setSoundOn(false);
      setUnavailable(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/gpu-overclock.mp3"
        preload="metadata"
        loop
        onPlay={() => setSoundOn(true)}
        onPause={() => setSoundOn(false)}
        onError={() => setUnavailable(true)}
      />
      <button
        type="button"
        className="sound-toggle"
        aria-pressed={soundOn}
        aria-label={soundOn ? "Pause GPU soundtrack" : "Play GPU soundtrack"}
        title={unavailable ? "Soundtrack unavailable" : undefined}
        onClick={toggleSound}
      >
        <span className={soundOn ? "sound-bars sound-bars-active" : "sound-bars"} aria-hidden="true">
          <i /><i /><i />
        </span>
        {unavailable ? "Audio unavailable" : soundOn ? "Song on" : "Play song"}
      </button>
    </>
  );
}
