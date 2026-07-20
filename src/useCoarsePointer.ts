import { useEffect, useState } from 'react';

/**
 * True when the primary pointer is coarse (finger/stylus) rather than a mouse.
 *
 * Input modality — not viewport width and not the user agent — is what decides
 * which duration control fits: a desktop window narrowed to phone width still
 * reports a fine pointer and should keep its steppers, and user-agent sniffing
 * misreports iPadOS as macOS. See ADR-260003.
 */
const COARSE_POINTER_QUERY = '(pointer: coarse)';

const matchCoarsePointer = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(COARSE_POINTER_QUERY).matches;
};

export const useCoarsePointer = (): boolean => {
  const [isCoarsePointer, setIsCoarsePointer] = useState(matchCoarsePointer);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const query = window.matchMedia(COARSE_POINTER_QUERY);
    const handleChange = (event: MediaQueryListEvent) => setIsCoarsePointer(event.matches);

    // Re-sync in case the modality changed between first render and effect.
    setIsCoarsePointer(query.matches);
    query.addEventListener('change', handleChange);

    return () => query.removeEventListener('change', handleChange);
  }, []);

  return isCoarsePointer;
};
