'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

interface Image {
  src: string;
  alt: string;
}

// Thumbnail width plus horizontal margins (see the <img> styles below).
const THUMB_OUTER_WIDTH = 160;

function ImageGallery({
  images,
  initialRows,
}: {
  images: Image[];
  // If set, only this many rows of thumbnails show until "Show all" is clicked.
  // The lightbox still steps through every image.
  initialRows?: number;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [perRow, setPerRow] = useState(2);
  const gridRef = useRef<HTMLDivElement>(null);

  // Track how many thumbnails fit per row so truncation is by whole rows.
  useEffect(() => {
    const el = gridRef.current;
    if (!el || initialRows === undefined) return;
    const update = () =>
      setPerRow(Math.max(1, Math.floor(el.clientWidth / THUMB_OUTER_WIDTH)));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [initialRows]);

  const initialCount = initialRows === undefined ? undefined : initialRows * perRow;
  const canTruncate = initialCount !== undefined && images.length > initialCount;
  const visibleImages = canTruncate && !expanded ? images.slice(0, initialCount) : images;

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
      <div ref={gridRef} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {visibleImages.map((image, index) => (
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

      {canTruncate && (
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="px-4 py-2 rounded-lg bg-white text-sm font-medium text-stone-700 hover:bg-stone-200 transition-colors"
          >
            {expanded ? 'Show fewer' : `Show all ${images.length} photos`}
          </button>
        </div>
      )}

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
