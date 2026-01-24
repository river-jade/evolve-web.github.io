'use client';

import { useEffect, useMemo, useState } from 'react';

interface Image {
  src: string;
  alt: string;
}

function ImageGallery({ images }: { images: Image[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const hasSelection = selectedIndex !== null;
  const current = useMemo(
    () => (hasSelection ? images[selectedIndex as number] : null),
    [hasSelection, images, selectedIndex]
  );

  const openAt = (index: number) => setSelectedIndex(index);
  const close = () => setSelectedIndex(null);

  const next = () => {
    if (!hasSelection) return;
    setSelectedIndex((i) => {
      const idx = i as number;
      return (idx + 1) % images.length; // wrap around
    });
  };

  const prev = () => {
    if (!hasSelection) return;
    setSelectedIndex((i) => {
      const idx = i as number;
      return (idx - 1 + images.length) % images.length; // wrap around
    });
  };

  // Keyboard: Esc to close, ← → to navigate
  useEffect(() => {
    if (!hasSelection) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hasSelection]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
            onClick={() => openAt(index)}
            style={{
              width: '150px',
              height: '100px',
              objectFit: 'cover',
              margin: '5px',
              cursor: 'pointer',
              border: selectedIndex === index ? '2px solid blue' : 'none',
            }}
          />
        ))}
      </div>

      {hasSelection && current && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '24px',
          }}
          onClick={close}
        >
          {/* Stop click-from-image closing the modal */}
          <div
            style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev button */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              style={{
                position: 'absolute',
                left: '-56px',
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'rgba(255,255,255,0.15)',
                padding: '12px 14px',
                cursor: 'pointer',
                fontSize: '18px',
                borderRadius: '8px',
                backdropFilter: 'blur(2px)',
              }}
            >
              ‹
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              style={{
                position: 'absolute',
                right: '-56px',
                top: '50%',
                transform: 'translateY(-50%)',
                border: 'none',
                background: 'rgba(255,255,255,0.15)',
                padding: '12px 14px',
                cursor: 'pointer',
                fontSize: '18px',
                borderRadius: '8px',
                backdropFilter: 'blur(2px)',
              }}
            >
              ›
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '-48px',
                right: '0',
                border: 'none',
                background: 'rgba(255,255,255,0.15)',
                padding: '8px 10px',
                cursor: 'pointer',
                fontSize: '16px',
                borderRadius: '8px',
                backdropFilter: 'blur(2px)',
              }}
              title="Esc"
            >
              ✕
            </button>

            <img
              src={current.src}
              alt={current.alt}
              style={{
                display: 'block',
                maxWidth: '100%',
                maxHeight: '80vh',
                borderRadius: '6px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
