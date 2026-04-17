import React, { useState, useRef, useEffect } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showPopover, setShowPopover] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Load YouTube API script
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'Z9KCbu-XXks',
        playerVars: {
          'autoplay': 1,
          'loop': 1,
          'playlist': 'Z9KCbu-XXks', // Required for loop
          'controls': 0,
          'showinfo': 0,
          'autohide': 1,
          'modestbranding': 1,
          'mute': 0 // We try to play with sound
        },
        events: {
          'onReady': (event) => {
            event.target.setVolume(volume * 100);
            // Autoplay might be blocked by browser policy without interaction
            // But we try nonetheless. If it fails, isPlaying stays false.
            try {
              event.target.playVideo();
              setIsPlaying(true);
            } catch (e) {
              console.log("Autoplay blocked");
            }
          },
          'onStateChange': (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
            if (event.data === window.YT.PlayerState.BUFFERING) setIsPlaying(true);
          }
        }
      });
    };

    return () => {
      // Cleanup cleanup if needed, but YT API is global
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(volume * 100);
    }
  }, [volume]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    // State is updated by onStateChange event
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  return (
    <div className="music-container">
      {/* Hidden YouTube Container */}
      <div id="youtube-player" style={{ position: 'absolute', top: '-1000px', pointerEvents: 'none', opacity: 0 }}></div>
      
      <div className="music-main-btn" onClick={togglePopover}>
        <div className="music-icon-wrap">
          <div className={`music-status-dot ${isPlaying ? 'on' : 'off'}`} />
          <span className="music-btn-text">MUSIC</span>
          <span className="music-state-label">{isPlaying ? 'ON' : 'OFF'}</span>
        </div>
      </div>

      {showPopover && (
        <div className="music-popover-luxe">
          <div className="popover-header">
            <span className="popover-title">Audio Control — Eve</span>
            <button className="popover-play-btn" onClick={togglePlay}>
              {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
            </button>
          </div>

          <div className="visualizer-container">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className={`vis-bar ${isPlaying ? 'animating' : ''}`} 
                style={{ 
                  animationDelay: `${i * 0.08}s`,
                  height: isPlaying ? '100%' : '4px' // The animation pulse handles the height
                }}
              />
            ))}
          </div>

          <div className="volume-control-row">
            <span className="volume-icon">{volume === 0 ? '🔇' : '🔊'}</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={handleVolumeChange}
              className="volume-slider-luxe"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="volume-perc">{Math.round(volume * 100)}%</span>
          </div>
          
          <div style={{ marginTop: '1rem', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', fontWeight: 700 }}>
            TRACK: DRAMATURGY — EVE (YouTube API)
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
