import React, { useState } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = '/images/placeholder.jpg',
  className = '',
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className={`image-container ${className}`}>
      {loading && (
        <div className="image-loading">
          <div className="loading-spinner">📷</div>
        </div>
      )}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        style={{ display: loading ? 'none' : 'block' }}
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;