'use client';

import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { FadeUp, FadeIn } from '../components/ScrollAnimations';
import { Polaroid } from '../components/Polaroid';
import { LeadershipMember } from '../components/LeadershipMember';

// Placeholder polaroid data - images and captions to be added later
const communityPolaroids = [
  { id: 1, src: '/community/social.png', alt: 'Community photo 1', caption: "Social @ Andrew's roof", rotation: -14 },
  { id: 2, src: '/community/figmanerds.png', alt: 'Community photo 2', caption: 'Figma Workshop!!!', rotation: 3 },
  { id: 3, src: '/community/pie-a-prez.png', alt: 'Community photo 3', caption: 'Pie a Prez', rotation: 7 },
  { id: 4, src: '/community/retreat-f2025.png', alt: 'Community photo 4', caption: 'Retreat Fall 2025', rotation: -5 },
  { id: 5, src: '/community/retreat-s2025.png', alt: 'Community photo 5', caption: 'Retreat Spring 2025', rotation: 0 },
  { id: 6, src: '/community/cooking.png', alt: 'Community photo 6', caption: 'Semesterly Cooking Challenge', rotation: -3 },
  { id: 7, src: '/community/fun.png', alt: 'Community photo 7', caption: 'muscles', rotation: 5 },
];

// Placeholder leadership data - images to be added later
const leadershipMembers = [
  { id: 1, src: '/profiles/seb.png', name: 'sebastian-strasser', role: 'president' },
  { id: 2, src: '/profiles/mikhail.png', name: 'mikhail-bond', role: 'vice-president' },
  { id: 3, src: '/profiles/jai.jpg', name: 'jai-tamboli', role: 'vice-president' },
  { id: 4, src: '/profiles/rifa.jpg', name: 'rifa-gowani', role: 'growth-lead' },
  { id: 5, src: '/profiles/brian.jpg', name: 'brian-dai', role: 'startup-lead' },
  { id: 6, src: '/profiles/yash.jpg', name: 'yash-pandya', role: 'investing-lead' },
  { id: 7, src: '/profiles/vihaan.jpg', name: 'vihaan-agarwal', role: 'eir-lead' },
  { id: 8, src: '/profiles/zaara.jpg', name: 'zaara-israni', role: 'marketing-lead' },
  { id: 9, src: '/profiles/nicole.jpg', name: 'nicole-hwang', role: 'community-lead' },
  { id: 10, src: '/profiles/sophia.jpg', name: 'sophia-chen', role: 'community-lead' },
  { id: 11, src: '/profiles/pranav.jpg', name: 'pranav-sarma', role: 'treasurer' },
  { id: 12, src: '', name: 'lia-kostas', role: 'growth' },
  { id: 13, src: '', name: 'xander-wanagel', role: 'growth' },
  { id: 14, src: '', name: 'surya-newa', role: 'startup' },
  { id: 15, src: '/profiles/neel.jpg', name: 'neel-khurana', role: 'investing' },
  { id: 16, src: '/profiles/shray.jpg', name: 'shray-patel', role: 'investing' },
  { id: 17, src: '', name: 'jessie-lee', role: 'marketing' },
  { id: 18, src: '', name: 'priscilla-tu', role: 'marketing' },
  { id: 19, src: '', name: 'marco-kosasih', role: 'marketing' },
  { id: 20, src: '', name: 'katherine-graci', role: 'community' },
  { id: 21, src: '/profiles/dustin.jpg', name: 'dustin-he', role: 'community' },

];

const programsDropdownItems = [
  { label: '/startup', href: '/programs/startup' },
  { label: '/investing', href: '/programs/investing' },
  { label: '/eir', href: '/programs/eir' },
];

export default function PeoplePage() {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.8;
      setIsPastHero(window.scrollY > heroThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#F7F3EE] min-h-screen">
      {/* Navbar - transparent in hero, solid + compact when scrolled */}
      <nav className={`flex items-center justify-between w-full px-[80px] fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isPastHero ? 'py-4 shadow-sm bg-[#F7F3EE]' : 'py-[43px] bg-transparent'}`}>
        <a href="/" className="flex items-center gap-[2px]">
          <img src="/eeg-logo.svg" alt="EEG" className="h-[44px]" />
        </a>

        <div className="flex items-center gap-[60px]">
          {/* Programs dropdown */}
          <div className="relative group">
            <span className="text-[#041540] text-lg font-medium hover:opacity-70 transition-opacity cursor-default">
              EEG/programs
            </span>
            {/* Dropdown menu */}
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-[#F7F3EE] border border-[#041540]/10 rounded-lg shadow-lg py-2 min-w-[160px]">
                {programsDropdownItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2 text-[#041540] text-base font-medium hover:bg-[#041540]/5 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a
            href="/people"
            className="text-[#041540] text-lg font-medium hover:opacity-70 transition-opacity"
          >
            EEG/people
          </a>
          <Button size="lg" className="w-[175px]">
            EEG/coffee
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        {/* Background with overlay */}
        <img
          src="/background-with-overlay.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <FadeUp>
            <h1 className="text-[92px] font-medium leading-none tracking-[-0.075em] text-black text-center">
              We Are Our People
            </h1>
          </FadeUp>

          <FadeIn delay={0.3}>
            <img
              src="/heart.png"
              alt="Heart"
              className="w-[195px] h-[171px] object-contain"
            />
          </FadeIn>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative px-[80px] pt-8 pb-32">
        {/* Section Header */}
        <FadeUp>
          <h2 className="text-[28px] font-medium text-[#041540] tracking-[-0.075em] mb-4">
            /community
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="text-[28px] font-medium text-black tracking-[-0.075em] max-w-[1140px] mb-16">
            We are most proud of our community; a group of students with deep and diverse interests and pursuits, brought together by a common love for the startup space.
          </p>
        </FadeUp>

        {/* Scattered Polaroids Container */}
        <div className="relative h-[1000px] w-full">
          {/* Row 1 - Top polaroids */}
          <FadeIn delay={0.2}>
            <Polaroid
              src={communityPolaroids[0].src || '/placeholder.jpg'}
              alt={communityPolaroids[0].alt}
              caption={communityPolaroids[0].caption}
              rotation={communityPolaroids[0].rotation}
              className="absolute w-[400px] left-[2%] top-[5%] z-10"
            />
          </FadeIn>

          <FadeIn delay={0.3}>
            <Polaroid
              src={communityPolaroids[1].src || '/placeholder.jpg'}
              alt={communityPolaroids[1].alt}
              caption={communityPolaroids[1].caption}
              rotation={communityPolaroids[1].rotation}
              className="absolute w-[400px] left-[30%] top-[0%] z-20"
            />
          </FadeIn>

          <FadeIn delay={0.25}>
            <Polaroid
              src={communityPolaroids[2].src || '/placeholder.jpg'}
              alt={communityPolaroids[2].alt}
              caption={communityPolaroids[2].caption}
              rotation={communityPolaroids[2].rotation}
              className="absolute w-[400px] right-[15%] top-[2%] z-10"
            />
          </FadeIn>

          {/* Row 2 - Middle/Bottom polaroids */}
          <FadeIn delay={0.35}>
            <Polaroid
              src={communityPolaroids[3].src || '/placeholder.jpg'}
              alt={communityPolaroids[3].alt}
              caption={communityPolaroids[3].caption}
              rotation={communityPolaroids[3].rotation}
              className="absolute w-[400px] left-[0%] top-[45%] z-30"
            />
          </FadeIn>

          <FadeIn delay={0.4}>
            <Polaroid
              src={communityPolaroids[4].src || '/placeholder.jpg'}
              alt={communityPolaroids[4].alt}
              caption={communityPolaroids[4].caption}
              rotation={communityPolaroids[4].rotation}
              className="absolute w-[400px] left-[28%] top-[50%] z-20"
            />
          </FadeIn>

          <FadeIn delay={0.45}>
            <Polaroid
              src={communityPolaroids[5].src || '/placeholder.jpg'}
              alt={communityPolaroids[5].alt}
              caption={communityPolaroids[5].caption}
              rotation={communityPolaroids[5].rotation}
              className="absolute w-[400px] right-[25%] top-[48%] z-30"
            />
          </FadeIn>

          <FadeIn delay={0.5}>
            <Polaroid
              src={communityPolaroids[6].src || '/placeholder.jpg'}
              alt={communityPolaroids[6].alt}
              caption={communityPolaroids[6].caption}
              rotation={communityPolaroids[6].rotation}
              className="absolute w-[400px] right-[2%] top-[52%] z-10"
            />
          </FadeIn>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership-spring-26" className="relative px-[80px] pb-32">
        {/* Section Header */}
        <FadeUp>
          <h2 className="text-[28px] font-medium text-[#041540] tracking-[-0.075em] mb-4">
            /leadership-spring-26
          </h2>
        </FadeUp>

        {/* Horizontal Line - aligned with title and grid edges */}
        <FadeIn delay={0.1}>
          <div className="w-full h-[2px] bg-[#041540] mb-12" />
        </FadeIn>

        {/* Leadership Grid - 4 columns */}
        <div className="grid grid-cols-5 gap-x-6 gap-y-12">
          {leadershipMembers.map((member) => (
            <LeadershipMember
              key={member.id}
              src={member.src}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
