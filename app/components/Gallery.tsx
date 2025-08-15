'use client';

import { useState } from 'react';

interface Image {
  src: string;
  alt: string;
}

function ImageGallery({ images }: {images: Image[]}) {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            onClick={() => setSelectedImage(image)}
            style={{
              width: '150px',
              height: '100px',
              objectFit: 'cover',
              margin: '5px',
              cursor: 'pointer',
              border: selectedImage === image ? '2px solid blue' : 'none',
            }}
          />
        ))}
      </div>
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            style={{ maxWidth: '80%', maxHeight: '80%' }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageGallery;