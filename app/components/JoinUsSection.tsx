'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { Button } from './Button';
import { Newsletter } from './Newsletter';
import { FadeUp } from './ScrollAnimations';
import { TextAnimate } from '@/components/ui/text-animate';

type JoinUsVariant = 'default' | 'startup' | 'investing' | 'eir';

const theme = {
  default: {
    bg: 'bg-black',
    accent: '#41C9C1',
    gradientColor: '#41C9C120',
    gradientOpacity: 'opacity-30',
    slashClass: 'text-[#41C9C1]',
    socialBorder: 'rgba(219, 219, 219, 0.6)',
    socialRipple: '#41C9C1',
  },
  startup: {
    bg: 'bg-black',
    accent: '#5076DD',
    gradientColor: '#5076DD20',
    gradientOpacity: 'opacity-25',
    slashClass: 'text-[#5076DD]',
    socialBorder: 'rgba(219, 219, 219, 0.6)',
    socialRipple: '#5076DD',
  },
  investing: {
    bg: 'bg-black',
    accent: '#6966E3',
    gradientColor: '#6966E320',
    gradientOpacity: 'opacity-25',
    slashClass: 'text-[#6966E3]',
    socialBorder: 'rgba(219, 219, 219, 0.6)',
    socialRipple: '#6966E3',
  },
  eir: {
    bg: 'bg-black',
    accent: '#41C9C1',
    gradientColor: '#41C9C120',
    gradientOpacity: 'opacity-25',
    slashClass: 'text-[#41C9C1]',
    socialBorder: 'rgba(219, 219, 219, 0.6)',
    socialRipple: '#41C9C1',
  },
};

interface JoinUsSectionProps {
  variant?: JoinUsVariant;
  newsletterSource?: string;
}

export function JoinUsSection({
  variant = 'default',
  newsletterSource = 'website',
}: JoinUsSectionProps) {
  const t = theme[variant];
  const newsletterRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [newsletterInView, setNewsletterInView] = useState(false);
  const [socialsInView, setSocialsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === newsletterRef.current) {
            setNewsletterInView(true);
            observer.unobserve(entry.target);
          }
          if (entry.target === socialsRef.current) {
            setSocialsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px',
      },
    );

    if (newsletterRef.current) observer.observe(newsletterRef.current);
    if (socialsRef.current) observer.observe(socialsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="join-us"
      className={`pt-32 pb-16 px-6 md:px-16 lg:px-24 ${t.bg} relative z-10 overflow-hidden`}
    >
      <motion.div
        className={`absolute inset-0 ${t.gradientOpacity} overflow-hidden`}
        animate={{
          background: [
            `radial-gradient(circle at 0% 0%, ${t.gradientColor} 0%, transparent 50%)`,
            `radial-gradient(circle at 100% 100%, ${t.gradientColor} 0%, transparent 50%)`,
            `radial-gradient(circle at 0% 0%, ${t.gradientColor} 0%, transparent 50%)`,
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          <div className="col-span-12 flex flex-col justify-center pt-12">
            <div className="mb-20 lg:mb-32">
              <FadeUp>
                <TextAnimate
                  as="h2"
                  animation="slideLeft"
                  by="character"
                  className="section-title text-[#DBDBDB] mb-8 text-center"
                >
                  Join Us
                </TextAnimate>
              </FadeUp>

              <FadeUp delay={0.1}>
                <p className="text-xl md:text-2xl text-[#DBDBDB]/60 leading-relaxed max-w-2xl font-light text-center mx-auto">
                  Get access to exclusive events, mentorship, and a network of
                  ambitious students and industry leaders.
                </p>
              </FadeUp>
            </div>

            <div className="flex flex-col items-center gap-16">
              <div
                ref={newsletterRef}
                className={`w-full max-w-xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${newsletterInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <Newsletter variant="dark" source={newsletterSource} accentColor={t.accent} />
              </div>

              <div
                ref={socialsRef}
                className={`w-full max-w-xl transition-all duration-700 delay-100 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${socialsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <TextAnimate
                  as="h3"
                  animation="slideLeft"
                  by="character"
                  startOnView={false}
                  className="mb-8 sub-section-title text-[#DBDBDB] text-center"
                >
                  Socials
                </TextAnimate>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Button
                      href="https://www.linkedin.com/company/nyueeg/"
                      borderColor={t.socialBorder}
                      textColor="#FFFFFF"
                      rippleColor={t.socialRipple}
                      className="!p-0 !h-14 !w-14 !border"
                    >
                      <Linkedin className="size-6" strokeWidth={1} />
                    </Button>
                    <Button
                      href="https://x.com/nyueeg"
                      borderColor={t.socialBorder}
                      textColor="#FFFFFF"
                      rippleColor={t.socialRipple}
                      className="!p-0 !h-14 !w-14 !border"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="size-6"
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.134l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </Button>
                    <Button
                      href="https://www.instagram.com/nyu.eeg/"
                      borderColor={t.socialBorder}
                      textColor="#FFFFFF"
                      rippleColor={t.socialRipple}
                      className="!p-0 !h-14 !w-14 !border"
                    >
                      <Instagram className="size-6" strokeWidth={1} />
                    </Button>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
