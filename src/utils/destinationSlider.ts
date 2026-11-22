/*
 * ============================================================================
 * TRAVEL TRAILS — VANILLA HORIZONTAL GALLERY CONTROLLER
 * Reusable, dependency-free helper to power each independent sliding gallery.
 * Handles arrow navigation, mouse drag-to-scroll, touch scroll tracking,
 * boundary disabled states, and progress bar calculation.
 * ============================================================================
 */

export interface SliderCallbacks {
  onStateChange: (state: {
    canPrev: boolean;
    canNext: boolean;
    progress: number;
  }) => void;
}

export interface SliderController {
  slidePrev: () => void;
  slideNext: () => void;
  wasDragged: () => boolean;
  destroy: () => void;
}

export function initDestinationSlider(
  trackEl: HTMLElement,
  callbacks: SliderCallbacks
): SliderController {
  let isPointerDown = false;
  let startX = 0;
  let initialScrollLeft = 0;
  let dragged = false;

  const updateScrollState = () => {
    const maxScroll = trackEl.scrollWidth - trackEl.clientWidth;
    if (maxScroll <= 2) {
      callbacks.onStateChange({ canPrev: false, canNext: false, progress: 100 });
      return;
    }

    const current = trackEl.scrollLeft;
    const canPrev = current > 4;
    const canNext = current < maxScroll - 4;
    const progress = Math.min(100, Math.max(0, (current / maxScroll) * 100));

    callbacks.onStateChange({ canPrev, canNext, progress });
  };

  const getStepDistance = () => {
    const firstCard = trackEl.querySelector<HTMLElement>('.tt-gallery-card');
    if (!firstCard) return trackEl.clientWidth * 0.8;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const computedStyle = window.getComputedStyle(trackEl);
    const gap = parseFloat(computedStyle.columnGap || computedStyle.gap || '24');

    // Slide by 1 card on mobile, 2 cards on tablet/desktop
    const cardsPerStep = window.innerWidth >= 768 ? 2 : 1;
    return (cardWidth + gap) * cardsPerStep;
  };

  const slidePrev = () => {
    trackEl.scrollBy({
      left: -getStepDistance(),
      behavior: 'smooth',
    });
  };

  const slideNext = () => {
    trackEl.scrollBy({
      left: getStepDistance(),
      behavior: 'smooth',
    });
  };

  // Mouse drag-to-scroll handlers (touch devices use native smooth swiping)
  const handleMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return;
    isPointerDown = true;
    dragged = false;
    startX = e.pageX;
    initialScrollLeft = trackEl.scrollLeft;
    trackEl.classList.add('is-dragging');
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isPointerDown) return;
    const deltaX = e.pageX - startX;
    if (Math.abs(deltaX) > 6) {
      dragged = true;
    }
    if (dragged) {
      e.preventDefault();
      trackEl.scrollLeft = initialScrollLeft - deltaX;
    }
  };

  const handleMouseUp = () => {
    if (!isPointerDown) return;
    isPointerDown = false;
    trackEl.classList.remove('is-dragging');
    // Reset dragged flag on next tick after click event resolves
    window.setTimeout(() => {
      dragged = false;
    }, 50);
  };

  trackEl.addEventListener('scroll', updateScrollState, { passive: true });
  trackEl.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);

  const resizeObserver = new ResizeObserver(updateScrollState);
  resizeObserver.observe(trackEl);

  // Initial measurement
  updateScrollState();

  return {
    slidePrev,
    slideNext,
    wasDragged: () => dragged,
    destroy: () => {
      trackEl.removeEventListener('scroll', updateScrollState);
      trackEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      resizeObserver.disconnect();
    },
  };
}
