'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './components/Button';
import { Newsletter } from './components/Newsletter';
import { FadeUp, FadeLeft, FadeIn, StaggerContainer, StaggerItem } from './components/ScrollAnimations';
import { Polaroid } from './components/Polaroid';
import Link from "next/link";

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="size-10 flex items-center justify-center hover:opacity-70 transition-opacity"
    >
      {children}
    </a>
  );
}

// Parallax decorative element
function ParallaxDecoration({
  src,
  className,
  speed = 0.5,
  position = 'fixed'
}: {
  src: string;
  className: string;
  speed?: number;
  position?: 'fixed' | 'absolute';
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, -300 * speed]);

  return (
    <motion.img
      src={src}
      alt=""
      style={{ y }}
      className={`${position} pointer-events-none ${className}`}
    />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F3EE] relative overflow-hidden pt-[130px]">
      {/* Parallax Decorative elements - layered throughout page */}

      {/* Hero Section decorations - expanded coverage */}
      {/* Large blue - right edge, bleeds off screen */}
      <ParallaxDecoration
        src="/building-block-blue.svg"
        className="w-[550px] top-[12vh] right-[-8vw] opacity-55"
        speed={0.15}
      />
      {/* Medium blue - upper right area */}
      <ParallaxDecoration
        src="/building-block-blue.svg"
        className="w-[280px] top-[5vh] right-[25vw] opacity-40"
        speed={0.1}
      />
      {/* Small blue - mid right */}
      <ParallaxDecoration
        src="/building-block-blue.svg"
        className="w-[200px] top-[45vh] right-[12vw] opacity-35"
        speed={0.2}
      />
      {/* Large pink - bottom left, bleeds off */}
      <ParallaxDecoration
        src="/building-block.svg"
        className="w-[400px] top-[60vh] left-[-6vw] opacity-50"
        speed={0.25}
      />
      {/* Medium pink - upper left area */}
      <ParallaxDecoration
        src="/building-block.svg"
        className="w-[220px] top-[8vh] left-[55vw] opacity-35"
        speed={0.12}
      />
      {/* Small pink - mid right */}
      <ParallaxDecoration
        src="/building-block.svg"
        className="w-[180px] top-[35vh] right-[5vw] opacity-40"
        speed={0.18}
      />
      {/* Extra blue - bottom right corner */}
      <ParallaxDecoration
        src="/building-block-blue.svg"
        className="w-[320px] top-[70vh] right-[20vw] opacity-30"
        speed={0.22}
      />
      {/* Extra pink - center right, adds depth */}
      <ParallaxDecoration
        src="/building-block.svg"
        className="w-[150px] top-[25vh] right-[35vw] opacity-25"
        speed={0.08}
      />

      {/* Programs Section decorations */}
      {/* Pink - right side */}
      <ParallaxDecoration
        src="/building-block.svg"
        className="w-[320px] top-[105vh] right-[6vw] opacity-45"
        speed={0.35}
        position="absolute"
      />
      {/* Blue - left edge, bleeds off */}
      <ParallaxDecoration
        src="/building-block-blue.svg"
        className="w-[380px] top-[135vh] left-[-6vw] opacity-40"
        speed={0.3}
        position="absolute"
      />

      {/* Events Section decorations */}
      {/* Pink - right */}
      <ParallaxDecoration
        src="/building-block.svg"
        className="w-[260px] top-[195vh] right-[22vw] opacity-45"
        speed={0.4}
        position="absolute"
      />
      {/* Blue - bottom left */}
      <ParallaxDecoration
        src="/building-block-blue.svg"
        className="w-[300px] top-[240vh] left-[8vw] opacity-40"
        speed={0.45}
        position="absolute"
      />

      <main className="relative z-10">
        {/* Hero Section - Full viewport height */}
        <section className="min-h-screen px-[80px] pt-8">
          <div className="max-w-[874px]">
            {/* Hero Headline */}
            <FadeUp>
              <h1 className="text-[92px] font-medium leading-none tracking-[-0.075em] text-black mb-8">
                Where NYU&apos;s Founders & Investors Are Made
              </h1>
            </FadeUp>

            {/* Description */}
            <FadeUp delay={0.15}>
              <p className="text-[28px] font-medium leading-snug tracking-[-0.075em] text-black max-w-[639px] mb-8">
                Established in 2003, EEG is NYU Stern&apos;s premier entrepreneurship club,
                immersing students in the worlds of entrepreneurship, technology, and venture
                capital. To stay up to date, subscribe to our newsletter and follow our socials below!
              </p>
            </FadeUp>

            {/* Email Subscription */}
            <FadeUp delay={0.3}>
              <div className="flex flex-col gap-4">
                <Newsletter variant="light" />

                {/* Social Icons */}
                <div className="flex items-center gap-5">
                  {/* LinkedIn */}
                  <SocialIcon href="https://www.linkedin.com/company/nyueeg/" label="LinkedIn">
                    <svg className="size-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M33.3333 5H6.66667C5.74619 5 5 5.74619 5 6.66667V33.3333C5 34.2538 5.74619 35 6.66667 35H33.3333C34.2538 35 35 34.2538 35 33.3333V6.66667C35 5.74619 34.2538 5 33.3333 5ZM14.1667 30H9.16667V16.6667H14.1667V30ZM11.6667 14.1667C10.0983 14.1667 8.83333 12.9017 8.83333 11.3333C8.83333 9.765 10.0983 8.5 11.6667 8.5C13.235 8.5 14.5 9.765 14.5 11.3333C14.5 12.9017 13.235 14.1667 11.6667 14.1667ZM30.8333 30H25.8333V23.3333C25.8333 21.4917 25.8 19.1667 23.3333 19.1667C20.8333 19.1667 20.5 21.1667 20.5 23.1667V30H15.5V16.6667H20.3333V18.8333H20.4C21.0667 17.5667 22.7333 16.2333 25.2333 16.2333C30.3 16.2333 30.8333 19.5333 30.8333 23.8333V30Z" fill="black"/>
                    </svg>
                  </SocialIcon>

                  {/* X (Twitter) */}
                  <SocialIcon href="https://x.com/nyueeg" label="X">
                    <svg className="size-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M29.6875 6.25H34.3125L23.6562 18.4375L36.25 33.75H26.25L18.5938 23.9062L9.84375 33.75H5.15625L16.5625 20.625L4.375 6.25H14.6875L21.5625 15.1562L29.6875 6.25ZM27.8125 30.9375H30.3125L12.8125 8.75H10.1562L27.8125 30.9375Z" fill="black"/>
                    </svg>
                  </SocialIcon>

                  {/* Instagram */}
                  <SocialIcon href="https://www.instagram.com/nyu.eeg/" label="Instagram">
                    <svg className="size-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 10.625C16.875 10.625 16.4844 10.6406 15.2656 10.6969C14.0469 10.7531 13.2031 10.9531 12.4531 11.25C11.6875 11.5469 11.0156 11.9844 10.4375 12.5625C9.85938 13.1406 9.42188 13.8125 9.125 14.5781C8.82812 15.3281 8.62813 16.1719 8.57188 17.3906C8.51563 18.6094 8.5 19 8.5 22.125C8.5 25.25 8.51563 25.6406 8.57188 26.8594C8.62813 28.0781 8.82812 28.9219 9.125 29.6719C9.42188 30.4375 9.85938 31.1094 10.4375 31.6875C11.0156 32.2656 11.6875 32.7031 12.4531 33C13.2031 33.2969 14.0469 33.4969 15.2656 33.5531C16.4844 33.6094 16.875 33.625 20 33.625C23.125 33.625 23.5156 33.6094 24.7344 33.5531C25.9531 33.4969 26.7969 33.2969 27.5469 33C28.3125 32.7031 28.9844 32.2656 29.5625 31.6875C30.1406 31.1094 30.5781 30.4375 30.875 29.6719C31.1719 28.9219 31.3719 28.0781 31.4281 26.8594C31.4844 25.6406 31.5 25.25 31.5 22.125C31.5 19 31.4844 18.6094 31.4281 17.3906C31.3719 16.1719 31.1719 15.3281 30.875 14.5781C30.5781 13.8125 30.1406 13.1406 29.5625 12.5625C28.9844 11.9844 28.3125 11.5469 27.5469 11.25C26.7969 10.9531 25.9531 10.7531 24.7344 10.6969C23.5156 10.6406 23.125 10.625 20 10.625ZM20 12.6875C23.0625 12.6875 23.4219 12.7031 24.625 12.7594C25.7344 12.8125 26.3438 13.0031 26.7469 13.1656C27.2812 13.3813 27.6719 13.6406 28.0781 14.0469C28.4844 14.4531 28.7438 14.8438 28.9594 15.3781C29.1219 15.7813 29.3125 16.3906 29.3656 17.5C29.4219 18.7031 29.4375 19.0625 29.4375 22.125C29.4375 25.1875 29.4219 25.5469 29.3656 26.75C29.3125 27.8594 29.1219 28.4688 28.9594 28.8719C28.7438 29.4062 28.4844 29.7969 28.0781 30.2031C27.6719 30.6094 27.2812 30.8688 26.7469 31.0844C26.3438 31.2469 25.7344 31.4375 24.625 31.4906C23.4219 31.5469 23.0625 31.5625 20 31.5625C16.9375 31.5625 16.5781 31.5469 15.375 31.4906C14.2656 31.4375 13.6562 31.2469 13.2531 31.0844C12.7188 30.8688 12.3281 30.6094 11.9219 30.2031C11.5156 29.7969 11.2562 29.4062 11.0406 28.8719C10.8781 28.4688 10.6875 27.8594 10.6344 26.75C10.5781 25.5469 10.5625 25.1875 10.5625 22.125C10.5625 19.0625 10.5781 18.7031 10.6344 17.5C10.6875 16.3906 10.8781 15.7813 11.0406 15.3781C11.2562 14.8438 11.5156 14.4531 11.9219 14.0469C12.3281 13.6406 12.7188 13.3813 13.2531 13.1656C13.6562 13.0031 14.2656 12.8125 15.375 12.7594C16.5781 12.7031 16.9375 12.6875 20 12.6875ZM20 16.375C17.0938 16.375 14.75 18.7188 14.75 21.625C14.75 24.5312 17.0938 26.875 20 26.875C22.9062 26.875 25.25 24.5312 25.25 21.625C25.25 18.7188 22.9062 16.375 20 16.375ZM20 24.8125C18.2344 24.8125 16.8125 23.3906 16.8125 21.625C16.8125 19.8594 18.2344 18.4375 20 18.4375C21.7656 18.4375 23.1875 19.8594 23.1875 21.625C23.1875 23.3906 21.7656 24.8125 20 24.8125ZM27.5469 16.1406C27.5469 16.8906 26.9375 17.5 26.1875 17.5C25.4375 17.5 24.8281 16.8906 24.8281 16.1406C24.8281 15.3906 25.4375 14.7812 26.1875 14.7812C26.9375 14.7812 27.5469 15.3906 27.5469 16.1406Z" fill="black"/>
                    </svg>
                  </SocialIcon>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* Programs Section */}
        <section className="min-h-screen px-[80px] py-16 bg-[#F7F3EE]">
          <FadeUp>
            <h2 className="text-[28px] font-bold text-[#041540] tracking-[-0.075em] mb-2">
              /programs
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-[28px] font-medium text-black tracking-[-0.075em] mb-8 max-w-[1183px]">
              Whether you&apos;re interested in startups, investing, or are already building, our semester-long programs bring students into NYU&apos;s startup, tech, and venture capital ecosystem.
            </p>
          </FadeUp>

          <StaggerContainer className="flex flex-col gap-8" staggerDelay={0.15}>
            {/* Startup Program */}
            <StaggerItem>
              <div className="border-t border-black pt-8">
                <div className="flex items-center gap-12">
                  <h3 className="text-[46px] font-bold text-[#AD1DE0] tracking-[-0.075em] min-w-[200px]">
                    /startup
                  </h3>
                  <p className="text-[28px] font-medium text-black tracking-[-0.075em] flex-1">
                  A 9-week, build-from-zero accelerator. You'll interview users to validate a real market gap, design and ship a product, and ultimately take it to market and maximize revenue.
                  </p>
                  <div className="flex flex-col gap-5">
                    <Button size="lg" className="w-[175px]">
                      <Link href="/programs/startup">Learn More</Link>
                    </Button>
                    <Button size="lg" className="w-[175px]">Apply</Button>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Investing Program */}
            <StaggerItem>
              <div className="border-t border-black pt-8">
                <div className="flex items-center gap-12">
                  <h3 className="text-[46px] font-bold text-[#2DB67D] tracking-[-0.075em] min-w-[200px]">
                    /investing
                  </h3>
                  <p className="text-[28px] font-medium text-black tracking-[-0.075em] flex-1">
                  An intensive 9-week program focused on how real investors evaluate startups.
                  You’ll break down deals, analyze companies, build investment theses, and learn how funds source, diligence, and decide</p>               <div className="flex flex-col gap-5">
                  <Button size="lg" className="w-[175px]">
                      <Link href="/programs/investing">Learn More</Link>
                    </Button>
                    <Button size="lg" className="w-[175px]">Apply</Button>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* EIR Program */}
            <StaggerItem>
              <div className="border-t border-black pt-8">
                <div className="flex items-center gap-12">
                  <h3 className="text-[46px] font-bold text-[#F0C75B] tracking-[-0.075em] min-w-[200px]">
                    /eir
                  </h3>
                  <p className="text-[28px] font-medium text-black tracking-[-0.075em] flex-1">
                  A selective program for NYU founders who are actively building.
                  Get 1-on-1 mentorship, hands-on workshops, and direct access to venture capitalists who help you sharpen your strategy, refine your pitch, and prepare for fundraising.</p>                  <div className="flex flex-col gap-5">
                  <Button size="lg" className="w-[175px]">
                      <Link href="/programs/eir">Learn More</Link>
                    </Button>
                    <Button size="lg" className="w-[175px]">Apply</Button>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Bottom border */}
            <StaggerItem>
              <div className="border-t border-black"></div>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* Events Section */}
        <section className="min-h-screen px-[80px] py-16 bg-[#F7F3EE] relative">
          <FadeUp>
            <h2 className="text-[28px] font-bold text-[#041540] tracking-[-0.075em] mb-8">
              /events
            </h2>
          </FadeUp>

          <div className="flex gap-8">
            {/* General Meetings Card */}
            <FadeLeft className="bg-[#d9d9d9] border border-black px-10 py-10 w-[506px] flex flex-col gap-6 shrink-0">
              <h3 className="text-[28px] font-bold text-[#041540] tracking-[-0.075em]">
                General Meetings
              </h3>
              <div className="text-[28px] font-medium text-black tracking-[-0.075em] leading-snug">
                <p className="mb-4">
                  We host our weekly speaker series on Thursdays @ 12:30 pm. All members of the NYU community are welcome to attend!
                </p>
                <p>
                  So far, we&apos;ve hosted over 250 chats with founders, operators and investors - the best in their fields. Subscribe to our newsletter to stay updated!
                </p>
              </div>

              {/* Company Logos - natural aspect ratios with max-width constraint */}
              <div className="grid grid-cols-4 gap-x-12 gap-y-10 mt-6 place-items-center">
                {[
                  { src: "/companies/lux_capital_logo.jpeg", alt: "Lux Capital" },
                  { src: "/companies/a16z.jpg", alt: "A16Z" },
                  { src: "/companies/figma.png", alt: "Figma" },
                  { src: "/companies/venmo.png", alt: "Venmo" },
                  { src: "/companies/anthropic.png", alt: "Anthropic" },
                  { src: "/companies/usv.jpg", alt: "USV" },
                  { src: "/companies/bessemer.png", alt: "Bessemer" },
                  { src: "/companies/meta.png", alt: "Meta" },
                ].map((logo) => (
                  <div
                    key={logo.alt}
                    className="flex items-center justify-center
                              w-[120] h-[75px]
                              rounded-xl
                              bg-white/50
                              backdrop-blur-sm"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="max-h-[52px] max-w-[100px] object-contain
                                opacity-80 transition hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </FadeLeft>

            {/* Polaroid Photos - larger with shadows */}
            <div className="relative flex-1 max-w-[1250px] min-h-[800px]">
              <FadeIn delay={0.2} className="absolute w-[450px] left-[3%] hover:z-50">
                <Polaroid src="/lux.jpeg" alt="Lux Capital" caption="eeg/lux-capital" rotation={-6} />
              </FadeIn>
              <FadeIn delay={0.8} className="absolute w-[450px] top-[0] right-[5%] hover:z-50">
                <Polaroid src="/zfellows.jpeg" alt="Zfellows" caption="eeg/zfellows" rotation={0}/>
              </FadeIn>
              <FadeIn delay={0.4} className="absolute w-[450px] bottom-[20%] left-[35%] hover:z-50">
                <Polaroid src="/beli.png" alt="Beli" caption="eeg/beli" rotation={6} />
              </FadeIn>
              <FadeIn delay={0.6} className="absolute w-[450px] bottom-0 left-[10%] hover:z-50">
                <Polaroid src="/varun-rana.png" alt="Varun Rana" caption="eeg/varun-rana" rotation={0}/>
              </FadeIn>
              <FadeIn delay={0.9} className="absolute w-[450px] bottom-0 right-[0%] hover:z-50">
                <Polaroid src="/EEGBobby.jpeg" alt="Bobby Shmurda" caption="eeg/bobby-shmurda" rotation={0}/>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
