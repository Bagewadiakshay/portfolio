import { useLayoutEffect, useRef, useCallback } from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

export const ScrollStackItem = ({ children, itemClassName = "" }) => {
  return (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>
      {children}
    </div>
  );
};

export default function ScrollStack({
  children,
  className = "",

  itemDistance = 80,
  itemScale = 0.03,
  itemStackDistance = 26,

  stackPosition = "25%",
  scaleEndPosition = "10%",

  baseScale = 0.86,
  rotationAmount = 0,
  blurAmount = 0,

  useWindowScroll = true, // ✅ IMPORTANT DEFAULT TRUE
}) {
  const scrollerRef = useRef(null);
  const lenisRef = useRef(null);
  const animationFrameRef = useRef(null);
  const cardsRef = useRef([]);
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop <= start) return 0;
    if (scrollTop >= end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    return {
      scrollTop: window.scrollY,
      containerHeight: window.innerHeight,
    };
  }, []);

  const getElementOffset = useCallback((element) => {
    const rect = element.getBoundingClientRect();
    return rect.top + window.scrollY;
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = document.querySelector(".scroll-stack-end");
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    // find top card index (for blur depth)
    let topCardIndex = 0;
    for (let j = 0; j < cardsRef.current.length; j++) {
      const jCardTop = getElementOffset(cardsRef.current[j]);
      const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
      if (scrollTop >= jTriggerStart) topCardIndex = j;
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card);

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;

      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // blur for depth (optional)
      let blur = 0;
      if (blurAmount && i < topCardIndex) {
        blur = (topCardIndex - i) * blurAmount;
      }

      // pin translate
      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      card.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
    });

    isUpdatingRef.current = false;
  }, [
    baseScale,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    rotationAmount,
    blurAmount,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
  ]);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      lerp: 0.08,
    });

    lenis.on("scroll", updateCardTransforms);

    const raf = (time) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    // get cards
    const cards = Array.from(document.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;

    // setup base styles
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;

      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transformStyle = "preserve-3d";
      card.style.perspective = "1000px";
    });

    setupLenis();
    updateCardTransforms();

    const onScroll = () => updateCardTransforms();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, [itemDistance, setupLenis, updateCardTransforms]);

  return (
    <div ref={scrollerRef} className={`scroll-stack-scroller ${className}`.trim()}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}