"use client";

import { useEffect, useState } from "react";

interface CandleSceneProps {
  className?: string;
  isHovered?: boolean;
  isActive?: boolean;
}

export default function CandleScene({ className = "", isHovered = false, isActive = false }: CandleSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isActive || isLoaded) return;
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [isActive, isLoaded]);

  const candleGradient = isHovered
    ? "linear-gradient(#41C9C1, #5076DD, #6966E3, #3F3F3F 50%, #000000)"
    : "linear-gradient(#5076DD, #6966E3, #3F3F3F, #000000 50%, #000000)";
  
  const candleTopGradient = isHovered
    ? "radial-gradient(#41C9C1, #5076DD 45%, #6966E3 80%)"
    : "radial-gradient(#5076DD, #3F3F3F 45%, #000000 80%)";
  
  const candleTopBorder = isHovered ? "#41C9C1" : "#3F3F3F";
  
  const threadGradient = isHovered
    ? "linear-gradient(#41C9C1, #5076DD, #3F3F3F, black, #6966E3 90%)"
    : "linear-gradient(#5076DD, #3F3F3F, #000000, black, #3F3F3F 90%)";
  
  const flameOpacity = isHovered ? 1 : 0.7;
  const glowColor = isHovered ? "rgba(65, 201, 193, 0.8)" : "rgba(65, 201, 193, 0.4)";
  const glowShadow = isHovered
    ? "0 -40px 30px 0 #41C9C1, 0 40px 50px 0 #41C9C1, inset 3px 0 2px 0 rgba(65, 201, 193, 0.6), inset -3px 0 2px 0 rgba(65, 201, 193, 0.6)"
    : "0 -20px 15px 0 #5076DD, 0 20px 25px 0 #5076DD, inset 2px 0 1px 0 rgba(65, 201, 193, 0.3), inset -2px 0 1px 0 rgba(65, 201, 193, 0.3)";
  
  const blinkingGlowColor = isHovered ? "#41C9C1" : "#5076DD";
  const blinkingGlowBlur = isHovered ? "60px" : "40px";

  const flameAnimationDuration = isHovered ? "1.5s" : "6s";
  const enlargeAnimationDuration = isHovered ? "1s" : "5s";
  const flameHeight = isHovered ? 130 : 70;
  const flameTop = isHovered 
    ? 'calc(100% - 380px - 130px - 16px)' 
    : 'calc(100% - 380px - 70px - 16px)';
  
  const glowHeight = isHovered ? 56 : 32;
  const glowWidth = isHovered ? 24 : 16;
  const glowTop = isHovered
    ? 'calc(100% - 380px - 44px)'
    : 'calc(100% - 380px - 28px)';
  
  const threadHeight = isHovered ? 32 : 20;

  const introDuration = 6.5;

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
        className={`holder ${isLoaded ? '' : 'not-loaded'}`}
        style={{
          margin: '0 auto',
          width: '140px',
          height: '450px',
          position: 'relative',
          transform: 'scale(0.9)',
          transformOrigin: 'bottom center',
          animation: isLoaded ? `candle-generate ${introDuration}s ease-out both` : 'none',
        }}
      >
        <div 
          style={{
            position: 'absolute',
            width: isHovered ? '90px' : '50px',
            height: isHovered ? '160px' : '80px',
            left: '50%',
            top: '-25%',
            transform: 'translateX(-50%)',
            borderRadius: '50%',
            background: blinkingGlowColor,
            filter: `blur(${blinkingGlowBlur})`,
            animation: isLoaded ? 'blinkIt 0.1s infinite' : 'none',
            transition: 'background 0.5s, filter 0.5s, width 0.5s, height 0.5s',
          }}
        />

        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            width: '140px',
            height: '380px',
            borderRadius: '140px / 38px',
            boxShadow: 'inset 16px -24px 40px 0 rgba(0, 0, 0, 0.4), inset -16px 0 40px 0 rgba(0, 0, 0, 0.4)',
            background: candleGradient,
            transition: 'background 0.5s',
          }}
        >
          <div 
            style={{
              position: 'absolute',
              content: '""',
              width: '100%',
              height: '38px',
              borderRadius: '50%',
              border: `2px solid ${candleTopBorder}`,
              background: candleTopGradient,
              transition: 'background 0.5s, border-color 0.5s',
            }}
          />
          
          <div 
            style={{
              position: 'absolute',
              content: '""',
              width: '23px',
              height: '7px',
              left: '50%',
              transform: 'translateX(-50%)',
              borderRadius: '50%',
              top: '10px',
              boxShadow: '0 0 14px 0 rgba(0, 0, 0, 0.5)',
              background: 'radial-gradient(rgba(0, 0, 0, 0.6), transparent 45%)',
            }}
          />
        </div>

        <div 
          style={{
            position: 'absolute',
            width: '5px',
            height: `${threadHeight}px`,
            top: `calc(100% - 380px - ${threadHeight / 2}px)`,
            left: '50%',
            zIndex: 1,
            borderRadius: '40% 40% 0 0',
            transform: 'translateX(-50%)',
            background: threadGradient,
            transition: 'background 0.5s, height 0.5s, top 0.5s',
          }}
        />

        <div 
          style={{
            position: 'absolute',
            width: `${glowWidth}px`,
            height: `${glowHeight}px`,
            borderRadius: '50% 50% 35% 35%',
            left: '50%',
            top: glowTop,
            transform: 'translateX(-50%)',
            background: glowColor,
            boxShadow: glowShadow,
            transition: 'background 0.5s, box-shadow 0.5s, width 0.5s, height 0.5s, top 0.5s',
          }}
        >
          <div 
            style={{
              position: 'absolute',
              content: '""',
              width: '70%',
              height: '60%',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: 0,
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.35)',
            }}
          />
        </div>

        <div 
          style={{
            position: 'absolute',
            width: isHovered ? '22px' : '16px',
            height: `${flameHeight}px`,
            left: '50%',
            transformOrigin: '50% 100%',
            transform: 'translateX(-50%)',
            top: flameTop,
            borderRadius: '50% 50% 20% 20%',
            background: 'linear-gradient(#DBDBDB 80%, transparent)',
            opacity: flameOpacity,
            animation: isLoaded 
              ? `moveFlame ${flameAnimationDuration} linear infinite, enlargeFlame ${enlargeAnimationDuration} linear infinite`
              : 'none',
            transition: 'opacity 0.5s, height 0.5s ease-out, width 0.5s ease-out, top 0.5s ease-out',
          }}
        >
          <div 
            style={{
              position: 'absolute',
              content: '""',
              width: '100%',
              height: '100%',
              borderRadius: '50% 50% 20% 20%',
              boxShadow: `0 0 10px 0 rgba(65, 201, 193, 0.4), 0 -4px 3px 0 rgba(65, 201, 193, 0.7)`,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes moveFlame {
          0%, 100% {
            transform: translateX(-50%) rotate(-4deg);
          }
          50% {
            transform: translateX(-50%) rotate(4deg);
          }
        }
        
        @keyframes enlargeFlame {
          0%, 100% {
            transform: translateX(-50%) scaleY(1);
          }
          50% {
            transform: translateX(-50%) scaleY(1.15);
          }
        }
        
        @keyframes blinkIt {
          50% {
            opacity: 0.8;
          }
        }
        
        .not-loaded * {
          animation-play-state: paused !important;
        }

        @keyframes candle-generate {
          0% {
            opacity: 0;
            transform: translateY(80px) scale(0.9, 0.2);
          }
          60% {
            opacity: 1;
            transform: translateY(0) scale(0.9, 1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(0.9, 1);
          }
        }
      `}</style>
    </div>
  );
}
