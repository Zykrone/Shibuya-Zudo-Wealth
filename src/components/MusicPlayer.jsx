import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [showPopover, setShowPopover] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef(null);

  // Playlist: Dramaturgy (Eve) -> SPECIALZ (King Gnu)
  const playlist = ["Z9KCbu-XXks", "n2THLWjJ3Wo"];
  const videoId = playlist[0];
  const playlistParam = playlist.join(',');

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    const command = isPlaying ? 'pauseVideo' : 'playVideo';
    iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command }), '*');
    setIsPlaying(!isPlaying);
    if (isMuted) unmute();
  };

  const unmute = () => {
    iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute' }), '*');
    iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [30] }), '*');
    setIsMuted(false);
    setIsPlaying(true);
  };

  const updateVolume = (val) => {
    setVolume(val);
    iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'setVolume', args: [val * 100] }), '*');
  };

  useEffect(() => {
    const handleEnter = () => {
      unmute();
    };
    window.addEventListener('shibuya-enter', handleEnter);

    const handleMessage = (event) => {
      if (typeof event.data === 'string') {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'onReady') {
            setIsReady(true);
            updateVolume(volume); // Ensure volume is set to 30% on ready
          }
          if (data.event === 'infoDelivery' && data.info && data.info.playerState !== undefined) {
            if (data.info.playerState === 1) setIsPlaying(true);
            if (data.info.playerState === 2) setIsPlaying(false);
          }
        } catch (e) {}
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('shibuya-enter', handleEnter);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="music-container">
      <iframe
        ref={iframeRef}
        id="yt-player-frame"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${playlistParam}&controls=0&modestbranding=1&rel=0&origin=${window.location.origin}`}
        style={{ 
          position: 'fixed', 
          top: '-100px', 
          left: '-100px', 
          width: '1px', 
          height: '1px', 
          opacity: 0, 
          pointerEvents: 'none',
          zIndex: -1000 
        }}
        title="Music Player"
        allow="autoplay; encrypted-media"
      />
      
      <div className="music-main-btn" onClick={() => setShowPopover(!showPopover)}>
        <div className="music-icon-wrap">
          <div className={`music-status-dot ${isPlaying ? 'on' : 'off'}`} />
          <span className="music-btn-text">SYSTÈME AUDIO</span>
          <span className="music-state-label">{isPlaying ? 'ACTIF' : 'PAUSE'}</span>
        </div>
      </div>

      {showPopover && (
        <div className="music-popover-luxe" style={{ border: '1px solid var(--violet)' }}>
          <div className="popover-header">
            <span className="popover-title" style={{ color: 'var(--violet-light)' }}>Contrôle de l'Influence</span>
            <button className="popover-play-btn" onClick={togglePlay} style={{ background: 'var(--violet)' }}>
              {isPlaying ? '⏸ PAUSE' : '▶ Lancer'}
            </button>
          </div>

          <div className="visualizer-container">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className={`vis-bar ${isPlaying ? 'animating' : ''}`} 
                style={{ 
                  animationDelay: `${i * 0.08}s`,
                  background: 'linear-gradient(to top, var(--violet), var(--cyan))',
                  height: isPlaying ? '100%' : '4px'
                }}
              />
            ))}
          </div>

          <div className="volume-control-row">
            <span className="volume-icon">{volume === 0 ? '🔇' : '🔊'}</span>
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              value={volume} 
              onChange={(e) => updateVolume(parseFloat(e.target.value))}
              className="volume-slider-luxe"
            />
            <span className="volume-perc">{Math.round(volume * 100)}%</span>
          </div>
          
          <div style={{ marginTop: '1rem', fontSize: '0.6rem', color: 'var(--violet-light)', textAlign: 'center', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>
            TRACKS: DRAMATURGY, SPECIALZ & VALKYRIE (SHIBUYA PLAYLIST)
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
