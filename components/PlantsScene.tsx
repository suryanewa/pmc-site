"use client";

import { useEffect, useState } from "react";

interface PlantsSceneProps {
  className?: string;
  isHovered?: boolean;
}

export default function PlantsScene({ className = "", isHovered = false }: PlantsSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const primaryColor = isHovered ? "#41C9C1" : "#5076DD";
  const accentColor = isHovered ? "#6966E3" : "#3F3F3F";
  const stemColor = "#3F3F3F";

  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{ 
        transform: 'translateY(45%)',
        transition: 'filter 0.6s ease-out',
        filter: isHovered ? 'saturate(1) brightness(1)' : 'saturate(0.7) brightness(0.85)',
      }}
    >
      <div 
        className={`flowers ${isLoaded ? '' : 'not-loaded'}`}
        style={{
          position: 'relative',
          transform: 'scale(0.35, 0.5)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
      >
        <FlowerElement num={1} primaryColor={primaryColor} accentColor={accentColor} stemColor={stemColor} isLoaded={isLoaded} isHovered={isHovered} />
        <FlowerElement num={2} primaryColor={primaryColor} accentColor={accentColor} stemColor={stemColor} isLoaded={isLoaded} isHovered={isHovered} />
        <FlowerElement num={3} primaryColor={primaryColor} accentColor={accentColor} stemColor={stemColor} isLoaded={isLoaded} isHovered={isHovered} />

        <LongGrassGroup position={0} primaryColor={primaryColor} isLoaded={isLoaded} isHovered={isHovered} />
        <LongGrassGroup position={1} primaryColor={primaryColor} isLoaded={isLoaded} isHovered={isHovered} />
        <LongGrassGroup position={5} primaryColor={primaryColor} isLoaded={isLoaded} isHovered={isHovered} />
        <LongGrassGroup position={7} primaryColor={primaryColor} isLoaded={isLoaded} isHovered={isHovered} />

        <GrassCluster side="left" color={stemColor} isLoaded={isLoaded} isHovered={isHovered} />
        <GrassCluster side="right" color={stemColor} isLoaded={isLoaded} isHovered={isHovered} />

        <FrontLeafDecoration stemColor={stemColor} isLoaded={isLoaded} isHovered={isHovered} />
      </div>

      <style jsx>{`
        @keyframes moving-flower-1 {
          0%, 100% { transform: rotate(3deg); }
          50% { transform: rotate(-3deg); }
        }
        @keyframes moving-flower-2 {
          0%, 100% { transform: rotate(18deg); }
          50% { transform: rotate(14deg); }
        }
        @keyframes moving-flower-3 {
          0%, 100% { transform: rotate(-17deg); }
          50% { transform: rotate(-21deg) rotateY(-8deg); }
        }
        @keyframes grow-flower-tree {
          0% { height: 0; border-radius: 1vmin; }
        }
        @keyframes blooming-flower {
          0% { transform: scale(0); }
        }
        @keyframes blooming-leaf-right {
          0% { transform-origin: left; transform: rotate(70deg) rotateY(30deg) scale(0); }
        }
        @keyframes blooming-leaf-left {
          0% { transform-origin: right; transform: rotate(-70deg) rotateY(30deg) scale(0); }
        }
        @keyframes leaf-ans-1 {
          0%, 100% { transform: rotate(-6deg) scale(1); }
          50% { transform: rotate(6deg) scale(1.08); }
        }
        @keyframes leaf-ans-2 {
          0%, 100% { transform: rotateY(-180deg) rotate(6deg); }
          50% { transform: rotateY(-180deg) rotate(-2deg) scale(1.08); }
        }
        @keyframes leaf-ans-3 {
          0%, 100% { transform: rotate(-8deg) rotateY(-180deg); }
          50% { transform: rotate(-18deg) rotateY(-180deg); }
        }
        @keyframes grow-ans {
          0% { transform: scale(0); opacity: 0; }
        }
        @keyframes flower__g-front-ans {
          0%, 100% { transform: rotate(-28deg) rotateY(30deg) scale(1.04); }
          50% { transform: rotate(-34deg) rotateY(38deg) scale(1.04); }
        }
        @keyframes moving-grass {
          0%, 100% { transform: rotate(-48deg) rotateY(40deg); }
          50% { transform: rotate(-51deg) rotateY(40deg); }
        }
        @keyframes moving-grass--2 {
          0%, 100% { transform: scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg); }
          50% { transform: scale(0.5) rotate(78deg) rotateX(10deg) rotateY(-200deg); }
        }
        .not-loaded * {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}

function HoverIntensifier({ children, isHovered, baseRotate = 0, hoverRotate = 0, baseScale = 1, hoverScale = 1 }: {
  children: React.ReactNode;
  isHovered: boolean;
  baseRotate?: number;
  hoverRotate?: number;
  baseScale?: number;
  hoverScale?: number;
}) {
  return (
    <div style={{
      transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      transform: isHovered 
        ? `rotate(${hoverRotate}deg) scale(${hoverScale})` 
        : `rotate(${baseRotate}deg) scale(${baseScale})`,
    }}>
      {children}
    </div>
  );
}

function FlowerElement({ num, primaryColor, accentColor, stemColor, isLoaded, isHovered }: {
  num: number;
  primaryColor: string;
  accentColor: string;
  stemColor: string;
  isLoaded: boolean;
  isHovered: boolean;
}) {
  const flowerConfigs: Record<number, { left?: string; baseTransform: string; animation: string; hoverRotate: number; lineHeight: number; lineDelay: number; leaves: number }> = {
    1: { baseTransform: '', animation: 'moving-flower-1 4s linear infinite', hoverRotate: 12, lineHeight: 70, lineDelay: 0.3, leaves: 6 },
    2: { left: '50%', baseTransform: 'rotate(30deg)', animation: 'moving-flower-2 4s linear infinite', hoverRotate: -15, lineHeight: 60, lineDelay: 0.8, leaves: 4 },
    3: { left: '50%', baseTransform: 'rotate(-15deg)', animation: 'moving-flower-3 4s linear infinite', hoverRotate: 14, lineHeight: 55, lineDelay: 0.9, leaves: 4 },
  };
  
  const config = flowerConfigs[num];
  const leafsDelay = { 1: '1.1s', 2: '1.4s', 3: '1.7s' }[num];

  return (
    <HoverIntensifier isHovered={isHovered} hoverRotate={config.hoverRotate} hoverScale={1.12}>
      <div style={{
        position: 'absolute',
        bottom: '10vmin',
        left: config.left,
        transform: config.baseTransform,
        transformOrigin: 'bottom center',
        zIndex: 10,
        animation: config.animation,
      }}>
        <div style={{
          position: 'relative',
          animation: isLoaded ? `blooming-flower 2s ${leafsDelay} backwards` : 'none',
        }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={leafStyle(i, primaryColor, accentColor)} />
          ))}
          <div style={whiteCircleStyle()} />
        </div>
        <div style={lineStyle(config.lineHeight, stemColor, isLoaded, config.lineDelay)}>
          {Array.from({ length: config.leaves }, (_, i) => i + 1).map(i => (
            <div key={i} style={lineLeafStyle(i, stemColor, isLoaded)} />
          ))}
        </div>
      </div>
    </HoverIntensifier>
  );
}

function LongGrassGroup({ position, primaryColor, isLoaded, isHovered }: {
  position: number;
  primaryColor: string;
  isLoaded: boolean;
  isHovered: boolean;
}) {
  const configs: Record<number, React.CSSProperties & { hoverRotate: number }> = {
    0: { position: 'absolute', bottom: '25vmin', left: '-42vmin', transformOrigin: 'bottom left', hoverRotate: 18 },
    1: { position: 'absolute', bottom: '0vmin', left: '-42vmin', transformOrigin: 'bottom left', transform: 'scale(0.8) rotate(-5deg)', hoverRotate: -14 },
    5: { position: 'absolute', bottom: '0vmin', left: '42vmin', transformOrigin: 'bottom left', transform: 'scale(0.8) rotate(2deg)', hoverRotate: 15 },
    7: { position: 'absolute', bottom: '20vmin', left: '35vmin', transformOrigin: 'bottom left', zIndex: -1, filter: 'blur(0.3vmin)', transform: 'scale(0.6) rotate(2deg)', opacity: 0.7, hoverRotate: -10 },
  };
  
  const { hoverRotate, ...style } = configs[position] || configs[0];
  const delays = [3, 3.2, 3.5, 3.6];

  return (
    <HoverIntensifier isHovered={isHovered} hoverRotate={hoverRotate} hoverScale={isHovered ? 1.15 : 1}>
      <div style={style}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ animation: isLoaded ? `grow-ans 2s ${delays[i]}s backwards` : 'none' }}>
            <div style={longLeafStyle(i, primaryColor)} />
          </div>
        ))}
      </div>
    </HoverIntensifier>
  );
}

function GrassCluster({ side, color, isLoaded, isHovered }: { 
  side: 'left' | 'right'; 
  color: string; 
  isLoaded: boolean;
  isHovered: boolean;
}) {
  const isLeft = side === 'left';
  
  return (
    <HoverIntensifier isHovered={isHovered} hoverRotate={isLeft ? -12 : 12} hoverScale={1.18}>
      <div style={{
        position: 'absolute',
        bottom: isLeft ? '12vmin' : '10vmin',
        left: isLeft ? '-7vmin' : '2vmin',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        zIndex: isLeft ? 20 : 0,
        transformOrigin: 'bottom center',
        transform: isLeft 
          ? 'rotate(-48deg) rotateY(40deg)' 
          : 'scale(0.5) rotate(75deg) rotateX(10deg) rotateY(-200deg)',
        opacity: isLeft ? 1 : 0.8,
        animation: isLoaded 
          ? (isLeft ? 'moving-grass 2s linear infinite' : 'moving-grass--2 1.5s linear infinite')
          : 'none',
      }}>
        <div style={{
          width: '7vmin',
          height: '10vmin',
          borderTopRightRadius: '100%',
          borderRight: `1.5vmin solid ${color}`,
          transformOrigin: 'bottom center',
          transform: 'rotate(-2deg)',
          transition: 'border-color 0.5s',
        }} />
        <div style={{
          marginTop: '-2px',
          width: '1.5vmin',
          height: '25vmin',
          backgroundImage: `linear-gradient(to top, transparent, ${color})`,
          transition: 'background-image 0.5s',
        }} />
      </div>
    </HoverIntensifier>
  );
}

function FrontLeafDecoration({ stemColor, isLoaded, isHovered }: {
  stemColor: string;
  isLoaded: boolean;
  isHovered: boolean;
}) {
  return (
    <HoverIntensifier isHovered={isHovered} hoverRotate={-18} hoverScale={1.2}>
      <div style={{ animation: isLoaded ? 'grow-ans 2s 2.8s backwards' : 'none' }}>
        <div style={{
          position: 'absolute',
          bottom: '6vmin',
          left: '2.5vmin',
          zIndex: 100,
          transformOrigin: 'bottom center',
          transform: 'rotate(-28deg) rotateY(30deg) scale(1.04)',
          animation: 'flower__g-front-ans 2s linear infinite',
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} style={gFrontLeafWrapperStyle(i, isLoaded)}>
              <div style={gFrontLeafStyle(stemColor)} />
            </div>
          ))}
          <div style={gFrontLineStyle(stemColor)} />
        </div>
      </div>
    </HoverIntensifier>
  );
}

function leafStyle(num: number, primary: string, accent: string): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '8vmin',
    height: '11vmin',
    borderRadius: '51% 49% 47% 53%/44% 45% 55% 69%',
    backgroundColor: primary,
    backgroundImage: `linear-gradient(to top, ${primary}, ${accent})`,
    transformOrigin: 'bottom center',
    opacity: 0.9,
    boxShadow: 'inset 0 0 2vmin rgba(255, 255, 255, 0.5)',
    transition: 'background-color 0.5s, background-image 0.5s',
  };

  const transforms: Record<number, string> = {
    1: 'translate(-10%, 1%) rotateY(40deg) rotateX(-50deg)',
    2: 'translate(-50%, -4%) rotateX(40deg)',
    3: 'translate(-90%, 0%) rotateY(45deg) rotateX(50deg)',
    4: 'translate(0%, 18%) rotateX(70deg) rotate(-43deg)',
  };

  if (num === 4) {
    return {
      ...base,
      width: '8vmin',
      height: '8vmin',
      transformOrigin: 'bottom left',
      borderRadius: '4vmin 10vmin 4vmin 4vmin',
      transform: transforms[num],
      zIndex: 1,
      opacity: 0.8,
    };
  }

  return { ...base, transform: transforms[num] };
}

function whiteCircleStyle(): React.CSSProperties {
  return {
    position: 'absolute',
    left: '-3.5vmin',
    top: '-3vmin',
    width: '9vmin',
    height: '4vmin',
    borderRadius: '50%',
    backgroundColor: '#DBDBDB',
  };
}

function lineStyle(height: number, color: string, isLoaded: boolean, delay: number): React.CSSProperties {
  return {
    height: `${height}vmin`,
    width: '1.5vmin',
    backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent, rgba(219, 219, 219, 0.2)), linear-gradient(to top, transparent 10%, ${color}, ${color})`,
    boxShadow: 'inset 0 0 2px rgba(0, 0, 0, 0.5)',
    animation: isLoaded ? `grow-flower-tree 4s ${delay}s backwards` : 'none',
    transition: 'background-image 0.5s',
  };
}

function lineLeafStyle(num: number, color: string, isLoaded: boolean): React.CSSProperties {
  const isLeft = num === 3 || num === 4 || num === 6;
  const topPositions: Record<number, string> = { 1: '20%', 2: '45%', 3: '12%', 4: '40%', 5: '0', 6: '-2%' };
  const delays: Record<number, number> = { 1: 1.6, 2: 1.4, 3: 1.2, 4: 1, 5: 1.8, 6: 2 };

  const base: React.CSSProperties = {
    position: 'absolute',
    top: topPositions[num],
    width: '7vmin',
    height: '9vmin',
    backgroundImage: `linear-gradient(to top, rgba(20, 117, 122, 0.4), ${color})`,
    transition: 'background-image 0.5s',
  };

  if (isLeft) {
    return {
      ...base,
      borderTopLeftRadius: '9vmin',
      borderBottomRightRadius: '9vmin',
      left: '-460%',
      transform: 'rotate(-70deg) rotateY(30deg)',
      animation: isLoaded ? `blooming-leaf-left 0.8s ${delays[num]}s backwards` : 'none',
    };
  }

  if (num === 5) {
    return {
      ...base,
      borderTopRightRadius: '9vmin',
      borderBottomLeftRadius: '9vmin',
      left: '90%',
      transformOrigin: 'left',
      transform: 'rotate(70deg) rotateY(30deg) scale(0.6)',
      animation: isLoaded ? `blooming-leaf-right 0.8s ${delays[num]}s backwards` : 'none',
    };
  }

  return {
    ...base,
    borderTopRightRadius: '9vmin',
    borderBottomLeftRadius: '9vmin',
    left: '90%',
    transform: 'rotate(70deg) rotateY(30deg)',
    animation: isLoaded ? `blooming-leaf-right 0.8s ${delays[num]}s backwards` : 'none',
  };
}

function longLeafStyle(num: number, color: string): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    width: '15vmin',
    height: '40vmin',
    borderTopLeftRadius: '100%',
    borderLeft: `2vmin solid ${color}`,
    maskImage: 'linear-gradient(to top, transparent 20%, black)',
    WebkitMaskImage: 'linear-gradient(to top, transparent 20%, black)',
    transformOrigin: 'bottom center',
    transition: 'border-color 0.5s',
  };

  const configs: Record<number, React.CSSProperties> = {
    0: { ...base, left: '2vmin', animation: 'leaf-ans-1 4s linear infinite' },
    1: { ...base, width: '5vmin', height: '60vmin', animation: 'leaf-ans-1 4s linear infinite' },
    2: { ...base, width: '10vmin', height: '40vmin', left: '-0.5vmin', bottom: '5vmin', transformOrigin: 'bottom left', transform: 'rotateY(-180deg)', animation: 'leaf-ans-2 3s linear infinite' },
    3: { ...base, width: '5vmin', height: '30vmin', left: '-1vmin', bottom: '3.2vmin', transformOrigin: 'bottom left', transform: 'rotate(-10deg) rotateY(-180deg)', animation: 'leaf-ans-3 3s linear infinite' },
  };

  return configs[num] || base;
}

function gFrontLeafWrapperStyle(num: number, isLoaded: boolean): React.CSSProperties {
  const topPositions: Record<number, string> = {
    1: '-8vmin', 2: '-8vmin', 3: '-3vmin', 4: '-3vmin',
    5: '2vmin', 6: '2vmin', 7: '6.5vmin', 8: '6.5vmin',
  };
  const delays: Record<number, number> = {
    1: 5.5, 2: 5.2, 3: 4.9, 4: 4.6, 5: 4.3, 6: 4.1, 7: 3.8, 8: 3.5,
  };
  const isEven = num % 2 === 0;
  const scale = num <= 2 ? 0.7 : (num <= 4 ? 0.9 : 1);

  return {
    position: 'absolute',
    top: topPositions[num],
    left: 0,
    transformOrigin: 'bottom left',
    transform: isEven 
      ? `rotateY(-180deg) scale(${scale})` 
      : `rotate(10deg) scale(${scale})`,
    animation: isLoaded ? `grow-ans 1s ${delays[num]}s ease-in backwards` : 'none',
  };
}

function gFrontLeafStyle(color: string): React.CSSProperties {
  return {
    width: '10vmin',
    height: '10vmin',
    borderRadius: '100% 0% 0% 100%/100% 100% 0% 0%',
    boxShadow: 'inset 0 2px 1vmin rgba(233, 121, 249, 0.2)',
    backgroundImage: `linear-gradient(to bottom left, transparent, rgba(0,0,0,0.8)), linear-gradient(to bottom right, ${color} 50%, transparent 50%, transparent)`,
    maskImage: 'linear-gradient(to bottom right, black 50%, transparent 50%, transparent)',
    WebkitMaskImage: 'linear-gradient(to bottom right, black 50%, transparent 50%, transparent)',
    transition: 'background-image 0.5s',
  };
}

function gFrontLineStyle(color: string): React.CSSProperties {
  return {
    width: '0.3vmin',
    height: '20vmin',
    backgroundImage: `linear-gradient(to top, transparent, ${color}, transparent 100%)`,
    position: 'relative',
    transition: 'background-image 0.5s',
  };
}
