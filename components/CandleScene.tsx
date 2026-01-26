"use client";

import { useEffect, useState } from "react";

interface CandleSceneProps {
  className?: string;
  isHovered?: boolean;
}

export default function CandleScene({ className = "", isHovered = false }: CandleSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const candleGradient = isHovered
    ? "linear-gradient(#2DB67D, #25a06d, #1a7a52, #0f5a3a 50%, #082e1e)"
    : "linear-gradient(#1a6b4a, #156045, #0f4a35, #0a3525 50%, #051a12)";
  
  const candleTopGradient = isHovered
    ? "radial-gradient(#3dd68f, #1f8a5a 45%, #25a06d 80%)"
    : "radial-gradient(#2a8060, #156045 45%, #1a6b4a 80%)";
  
  const candleTopBorder = isHovered ? "#25a06d" : "#156045";
  
  const threadGradient = isHovered
    ? "linear-gradient(#5de8a8, #2a6b4a, #1a3a2a, black, #7af5bc 90%)"
    : "linear-gradient(#3a8a65, #1a4a35, #0f2a1a, black, #4ab085 90%)";
  
  const flameOpacity = isHovered ? 1 : 0.7;
  const glowColor = isHovered ? "rgba(45, 182, 125, 0.8)" : "rgba(45, 182, 125, 0.4)";
  const glowShadow = isHovered
    ? "0 -40px 30px 0 #2DB67D, 0 40px 50px 0 #2DB67D, inset 3px 0 2px 0 rgba(45, 182, 125, 0.6), inset -3px 0 2px 0 rgba(45, 182, 125, 0.6)"
    : "0 -20px 15px 0 #1a6b4a, 0 20px 25px 0 #1a6b4a, inset 2px 0 1px 0 rgba(45, 182, 125, 0.3), inset -2px 0 1px 0 rgba(45, 182, 125, 0.3)";
  
  const blinkingGlowColor = isHovered ? "#2DB67D" : "#1a6b4a";
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
            background: 'linear-gradient(white 80%, transparent)',
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
              boxShadow: `0 0 10px 0 rgba(45, 182, 125, 0.4), 0 -4px 3px 0 rgba(45, 182, 125, 0.7)`,
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
      `}</style>
    </div>
  );
}
