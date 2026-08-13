(() => {
  const storageKey = 'birthday-bg-audio-state';

  const tracks = {
    songs1: { src: '../assets/audio/songs1.mp3', label: 'Jaan ho meri' },
    songs2: { src: '../assets/audio/songs2.mp3', label: 'Khat' },
    songs3: { src: '../assets/audio/songs3.mp3', label: 'Pyaari amaanat' },
    songs4: { src: '../assets/audio/songs4.mp3', label: 'Main rang sharbaton ka' },
    songs5: { src: '../assets/audio/songs5.mp3', label: 'August' }
  };

  const readState = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
      return {};
    }
  };

  const writeState = (nextState) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(nextState));
    } catch {
      // ignore storage errors
    }
  };

  const state = readState();
  let currentTrack = state.track && tracks[state.track] ? state.track : 'songs1';
  let isPlaying = state.enabled !== false;
  const savedResumeTime = Number.isFinite(state.currentTime) ? state.currentTime : 0;

  const audio = document.createElement('audio');
  audio.preload = 'auto';
  audio.loop = true;
  audio.volume = 0.22;
  audio.style.display = 'none';
  audio.setAttribute('aria-hidden', 'true');
  document.body.appendChild(audio);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'bg-music-toggle';
  button.setAttribute('aria-label', 'Toggle birthday background music');
  button.title = 'Toggle birthday music';
  button.textContent = '♫';
  button.style.cssText = [
    'position:fixed',
    'right:18px',
    'bottom:18px',
    'z-index:70',
    'border:none',
    'border-radius:999px',
    'padding:12px 14px',
    'background:rgba(10,10,10,0.74)',
    'color:#fff7e8',
    'box-shadow:0 10px 28px rgba(0,0,0,0.25)',
    'font-size:1rem',
    'cursor:pointer',
    'backdrop-filter:blur(8px)',
    '-webkit-backdrop-filter:blur(8px)'
  ].join(';');
  document.body.appendChild(button);

  let interactionStarted = false;
  const nowPlayingElement = document.getElementById('now-playing');
  const trackPopup = document.getElementById('track-popup');
  const playingBox = document.getElementById('playing-box');

  const getTrackSource = (trackName) => tracks[trackName] ? tracks[trackName].src : tracks.songs1.src;

  const updateNowPlaying = () => {
    if (nowPlayingElement) {
      nowPlayingElement.textContent = `currently playing: ${tracks[currentTrack].label}`;
    }
  };

  const applyTrack = (trackName, options = {}) => {
    const shouldRestore = options.restoreTime ?? savedResumeTime;
    audio.src = getTrackSource(trackName);
    audio.load();

    const restorePlaybackPosition = () => {
      const targetTime = Number.isFinite(shouldRestore) ? shouldRestore : 0;
      if (targetTime > 0 && Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(targetTime, audio.duration - 0.1);
      }
    };

    if (audio.readyState >= 1) {
      restorePlaybackPosition();
    } else {
      audio.addEventListener('loadedmetadata', restorePlaybackPosition, { once: true });
    }

    updateNowPlaying();
  };

  const updateButton = () => {
    button.textContent = isPlaying ? '♫ on' : '♫ off';
    button.setAttribute('data-state', isPlaying ? 'playing' : 'paused');
  };

  const persistState = () => {
    writeState({
      enabled: isPlaying,
      track: currentTrack,
      currentTime: Number.isFinite(audio.currentTime) ? audio.currentTime : 0,
      updatedAt: Date.now()
    });
  };

  const selectTrack = (trackName) => {
    if (!tracks[trackName]) {
      return;
    }
    currentTrack = trackName;
    applyTrack(currentTrack);
    highlightActiveTrack();
    if (isPlaying) {
      audio.play().catch(() => {
        isPlaying = false;
        updateButton();
      });
    }
    persistState();
  };

  const startPlayback = async () => {
    if (!interactionStarted) {
      interactionStarted = true;
    }

    const lastSavedTime = Number.isFinite(state.currentTime) ? state.currentTime : 0;
    const elapsedSinceSave = Number.isFinite(state.updatedAt) ? (Date.now() - state.updatedAt) / 1000 : 0;
    const resumeTime = Math.max(0, lastSavedTime + elapsedSinceSave);

    applyTrack(currentTrack, { restoreTime: resumeTime });

    try {
      await audio.play();
      isPlaying = true;
      updateButton();
      persistState();
    } catch {
      isPlaying = false;
      updateButton();
      persistState();
    }
  };

  const stopPlayback = () => {
    audio.pause();
    isPlaying = false;
    updateButton();
    persistState();
  };

  const toggleTrackPopup = () => {
    if (!trackPopup) {
      return;
    }
    const isHidden = trackPopup.hasAttribute('hidden');
    if (isHidden) {
      trackPopup.removeAttribute('hidden');
    } else {
      trackPopup.setAttribute('hidden', '');
    }
  };

  const hideTrackPopup = () => {
    if (trackPopup) {
      trackPopup.setAttribute('hidden', '');
    }
  };

  const highlightActiveTrack = () => {
    if (!trackPopup) {
      return;
    }
    const buttons = trackPopup.querySelectorAll('button[data-track]');
    buttons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.track === currentTrack);
    });
  };

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  });

  if (playingBox) {
    playingBox.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleTrackPopup();
    });
  }

  if (trackPopup) {
    trackPopup.addEventListener('click', (event) => {
      event.stopPropagation();
      const trackButton = event.target.closest('button[data-track]');
      if (trackButton) {
        selectTrack(trackButton.dataset.track);
      }
    });
  }

  document.addEventListener('click', () => {
    if (trackPopup) {
      hideTrackPopup();
    }
  }, { passive: true });

  const handleInteraction = () => {
    if (!isPlaying) {
      startPlayback();
    }
  };

  document.addEventListener('keydown', handleInteraction, { passive: true });
  document.addEventListener('touchstart', handleInteraction, { passive: true });
  audio.addEventListener('timeupdate', persistState);

  updateButton();
  highlightActiveTrack();
  applyTrack(currentTrack, { restoreTime: Math.max(0, Number.isFinite(state.currentTime) ? state.currentTime : 0) });

  if (isPlaying) {
    window.setTimeout(() => {
      startPlayback();
    }, 180);
  }
})();
