import type { SpringOptions } from 'motion/react';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import PixelHoverCanvas from '@/components/PixelHoverCanvas';
import { useIsMobile } from '../hooks/use-is-mobile';

interface TiltedCardProps {
  imageSrc?: React.ComponentProps<'img'>['src'];
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  imageScaleOnHover?: number;
  overlayContent?: React.ReactNode | ((isHovered: boolean) => React.ReactNode);
  displayOverlayContent?: boolean;
  backgroundColor?: string;
  backgroundContent?: React.ReactNode | ((isHovered: boolean) => React.ReactNode);
  borderRadius?: number;
  pixelEffect?: {
    colors: string;
    gap?: number;
    speed?: number;
    className?: string;
  };
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  imageScaleOnHover = 1.0,
  overlayContent = null,
  displayOverlayContent = false,
  backgroundColor,
  backgroundContent,
  borderRadius = 0,
  pixelEffect
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const imageScale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    imageScale.set(imageScaleOnHover);
    opacity.set(1);
    setIsHovered(true);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    imageScale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
    setIsHovered(false);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={isMobile ? undefined : handleMouse}
      onMouseEnter={isMobile ? undefined : handleMouseEnter}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative overflow-hidden [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          scale: isMobile ? 1 : scale,
          backgroundColor,
          borderRadius: `${borderRadius}px`
        }}
      >
        {pixelEffect && !isMobile && (
          <PixelHoverCanvas
            active={isHovered}
            colors={pixelEffect.colors}
            gap={pixelEffect.gap}
            speed={pixelEffect.speed}
            className={pixelEffect.className}
            radius={borderRadius}
          />
        )}
        {backgroundContent && (
          <div className="absolute inset-0 z-[1]" style={{ borderRadius: `${borderRadius}px`, overflow: 'hidden' }}>
            {typeof backgroundContent === 'function' ? backgroundContent(isHovered) : backgroundContent}
          </div>
        )}
        {imageSrc && (
          <motion.img
            src={imageSrc}
            alt={altText}
            draggable={false}
            className="absolute left-0 top-0 h-full w-full object-cover will-change-transform [transform:translateZ(0)] select-none"
            style={{
              width: imageWidth,
              height: imageHeight,
              scale: isMobile ? 1 : imageScale,
              borderRadius: `${borderRadius}px`
            }}
          />
        )}

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute inset-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {typeof overlayContent === 'function' ? overlayContent(isHovered) : overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && !isMobile && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-[#3F3F3F] px-[10px] py-[4px] text-[10px] text-[#DBDBDB] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
