import React from 'react';

const VideoBackground = ({ videoId, src, opacity = 0.4 }) => {
  console.log("--- SHIBUYA DEBUG: VideoBackground Rendering (Local Only Mode) ---");
  // On force le chemin local. Même si un videoId est passé par erreur, on l'ignore.
  const localSrc = src || "/jjk_shibuya_bg.mp4";

  return (
    <div className="video-background-container" style={{ pointerEvents: 'none' }}>
      <div className="video-overlay" style={{ opacity: 1 - opacity, zIndex: 1 }} />
      <video
        key={localSrc}
        className="video-iframe"
        autoPlay
        muted
        loop
        playsInline
        style={{ 
          objectFit: 'cover', 
          width: '100vw', 
          height: '100vh',
          display: 'block',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 0
        }}
      >
        <source src={localSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;
