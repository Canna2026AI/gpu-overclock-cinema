(() => {
  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
      return;
    }
    callback();
  };

  ready(() => {
    const root = document.documentElement;
    const header = document.querySelector(".site-header");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = [...document.querySelectorAll("[data-reveal]")];

    const updateHeader = () => header?.toggleAttribute("data-scrolled", window.scrollY > 32);
    root.classList.add("motion-ready");
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.setAttribute("data-visible", "true"));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-visible", "true");
          observer.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -12%", threshold: 0.08 });
      revealItems.forEach((item) => observer.observe(item));
    }

    const audio = document.querySelector("#gpu-soundtrack");
    const soundButton = document.querySelector("#gpu-sound-toggle");
    const soundLabel = soundButton?.querySelector("[data-audio-label]");
    const soundBars = soundButton?.querySelector(".sound-bars");

    const updateSoundState = () => {
      if (!(audio instanceof HTMLAudioElement) || !(soundButton instanceof HTMLButtonElement)) return;
      const playing = !audio.paused;
      soundButton.setAttribute("aria-pressed", String(playing));
      soundButton.setAttribute("aria-label", playing ? "Pause GPU soundtrack" : "Play GPU soundtrack");
      soundBars?.classList.toggle("sound-bars-active", playing);
      if (soundLabel) soundLabel.textContent = playing ? "Song on" : "Play song";
    };

    const tryAutoplay = async () => {
      if (!(audio instanceof HTMLAudioElement)) return;
      audio.volume = 0.62;
      try {
        await audio.play();
      } catch {
        soundButton?.setAttribute("title", "Your browser blocked autoplay. Tap to play the soundtrack.");
      }
      updateSoundState();
    };

    if (audio instanceof HTMLAudioElement && soundButton instanceof HTMLButtonElement) {
      audio.addEventListener("play", updateSoundState);
      audio.addEventListener("pause", updateSoundState);
      audio.addEventListener("error", () => {
        if (soundLabel) soundLabel.textContent = "Audio unavailable";
      });
      soundButton.addEventListener("click", async () => {
        if (audio.paused) {
          try {
            await audio.play();
            soundButton.removeAttribute("title");
          } catch {
            soundButton.setAttribute("title", "Soundtrack unavailable");
          }
        } else {
          audio.pause();
        }
        updateSoundState();
      });
      void tryAutoplay();
    }

    const copyButton = document.querySelector("#gpu-copy-contract");
    const copyStatus = document.querySelector("#gpu-copy-status");
    copyButton?.addEventListener("click", async () => {
      const address = copyButton.getAttribute("data-contract") ?? "";
      let copied = false;
      try {
        await navigator.clipboard.writeText(address);
        copied = true;
      } catch {
        const input = document.createElement("textarea");
        input.value = address;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        copied = document.execCommand("copy");
        input.remove();
      }
      copyButton.firstChild.textContent = copied ? "Copied " : "Copy failed ";
      if (copyStatus) copyStatus.textContent = copied ? "Contract address copied to clipboard." : "Unable to copy contract address.";
      window.setTimeout(() => {
        copyButton.firstChild.textContent = "Copy CA ";
        if (copyStatus) copyStatus.textContent = "";
      }, 1800);
    });

    const moveRail = (rail, direction) => {
      if (!(rail instanceof HTMLElement)) return;
      const factor = rail.classList.contains("gallery-grid") ? 0.78 : 0.68;
      rail.scrollBy({
        left: direction * Math.max(300, rail.clientWidth * factor),
        behavior: reduceMotion ? "auto" : "smooth",
      });
    };

    document.querySelectorAll("[data-rail-control]").forEach((button) => {
      button.addEventListener("click", () => {
        const rail = document.getElementById(button.getAttribute("data-rail-control") ?? "");
        moveRail(rail, Number(button.getAttribute("data-direction")) || 1);
      });
    });

    document.querySelectorAll("#signal-timeline, #gpu-gallery-rail").forEach((rail) => {
      rail.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        moveRail(rail, event.key === "ArrowLeft" ? -1 : 1);
      });
    });
  });
})();
