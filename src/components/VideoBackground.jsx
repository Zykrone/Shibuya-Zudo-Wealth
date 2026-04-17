import React from 'react';

const VideoBackground = ({ videoId, opacity = 0.4 }) => {
  return (
    <div className="video-background-container">
      <div className="video-overlay" style={{ opacity: 1 - opacity }} />
      <iframe
        className="video-iframe"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Background Video"
      />
    </div>
  );
};

export default VideoBackground;
