'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from './Icon';

interface Image {
  src: string;
  alt: string;
}

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

  // Read the grid's current column count so truncation is by whole rows.
  useEffect(() => {
    const el = gridRef.current;
    if (!el || initialRows === undefined) return;
    const update = () => {
      const columns = getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length;
      setPerRow(Math.max(1, columns));
    };
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

  const navButton =
    'absolute flex items-center justify-center w-11 h-11 rounded-pill border border-paper/40 text-paper hover:bg-paper/15 transition-colors';

  return (
    <div>
      <div ref={gridRef} className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-3">
        {visibleImages.map((image, index) => (
          <button
            key={index}
            type="button"
            onClick={() => openAt(index)}
            className={`block overflow-hidden rounded-md outline-none focus-visible:ring-2 focus-visible:ring-forest ${selectedIndex === index ? 'ring-2 ring-forest' : ''}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="!m-0 !rounded-none block w-full aspect-[3/2] object-cover transition-transform duration-500 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {canTruncate && (
        <div className="not-prose mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="btn border border-forest text-forest hover:bg-forest hover:text-paper"
          >
            {expanded ? 'Show fewer' : `Show all ${images.length} photos`}
          </button>
        </div>
      )}

      {hasSelection && current && (
        <div
          role="dialog"
          aria-modal="true"
          className="not-prose fixed inset-0 z-[1000] flex items-center justify-center bg-forest/90 p-6"
          onClick={close}
        >
          {/* Stop click-from-image closing the modal */}
          <div
            className="relative max-w-[90%] max-h-[90%]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev button */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className={`${navButton} -left-14 top-1/2 -translate-y-1/2`}
            >
              <Icon name="chevronLeft" size={20} />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className={`${navButton} -right-14 top-1/2 -translate-y-1/2`}
            >
              <Icon name="chevronRight" size={20} />
            </button>

            {/* Close button */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className={`${navButton} -top-14 right-0`}
              title="Esc"
            >
              <Icon name="close" size={20} />
            </button>

            <img
              src={current.src}
              alt={current.alt}
              className="!m-0 block max-w-full max-h-[80vh] rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
