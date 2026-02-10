'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

import { FadeUp, FadeIn, StaggerContainer, StaggerItem } from '../../components/ScrollAnimations';

const UnicornScene = dynamic(() => import('unicornstudio-react/next'), { ssr: false });
import { JoinUsSection } from '../../components/JoinUsSection';
import { FAQSection } from '../../components/FAQSection';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { TextAnimate } from '@/components/ui/text-animate';
import AsciiHoverEffect from '@/components/AsciiHoverEffect';
import { Timeline } from '@/components/ui/timeline';
import { LogoLoop } from '@/components/LogoLoop';
import type { LogoItem } from '@/components/LogoLoop';

const whatIsFeatures = [
  {
    text: 'Teams of 3\u20135 students from any university',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    text: 'Cash prizes, mentorship, and recruiting pathways',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
  {
    text: '24-hour case sprints followed by live pitch finals',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const participateSteps = [
  { number: '1', title: 'Form a Team (3\u20135 students)', description: 'Build a team from your school. Mix product thinkers, designers, researchers, and strategists \u2014 diverse perspectives win.' },
  { number: '2', title: 'Register Through Your School', description: "If your school has a product or consulting club, they'll typically run a qualifying round. Win that, and your team advances to nationals. No partner school? Email pmc@nyu.edu." },
  { number: '3', title: 'Compete in First Round (April 10th)', description: 'The case prompt drops April 9th. Your 24-hour sprint begins. Research, strategize, build your deck, and present live to our judging panel.' },
  { number: '4', title: 'Compete in Finals (April 12th)', description: 'Winning first-round teams get a new case for the final round. Present to senior PM judges from top tech companies. National winners announced at the end.' },
];

const competitionBenefits = [
  {
    title: 'Portfolio-Ready Work',
    desc: 'Walk away with a real case study showing your ability to solve ambiguous product problems under constraints \u2014 exactly what PM interviewers want to see.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    title: 'PM Feedback',
    desc: 'Get direct, challenging feedback from judges who work as product managers at Meta, Google, Microsoft, and more.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    ),
  },
  {
    title: 'Recruiting Visibility',
    desc: 'Finalists are seen by sponsoring companies actively looking for PM talent. Past participants have received mentorship and interview consideration.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: '500+ Student Network',
    desc: 'Connect with product-focused students from Penn, Columbia, Duke, Georgetown, Michigan, Brown, UCLA, and beyond.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Prizes & Recognition',
    desc: 'Winners take home exciting prizes, sponsor swag, and recognition across the PMC community.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
];

const timelineData = [
  {
    title: 'Mid\u2013Late March',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Registration Opens</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          Form your team, register through your school&apos;s product club, and
          start preparing. We&apos;ll share resources on product thinking, case
          frameworks, and past competition examples.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color="#6966E3">Team Formation</Chip>
          <Chip color="#6966E3">Prep Resources</Chip>
        </div>
      </div>
    ),
  },
  {
    title: 'April 9\u201310',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">First Round</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          The case prompt drops April 9th at 12:00 AM EST. You have 24 hours to
          research, strategize, and build your deck. On April 10th, teams present
          live to our judging panel. Winners advance to finals.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color="#6966E3">24-Hour Sprint</Chip>
          <Chip color="#6966E3">Live Pitch</Chip>
        </div>
      </div>
    ),
  },
  {
    title: 'April 11\u201312',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">Final Round</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          The second case prompt drops April 11th at 12:00 PM EST. Another
          24-hour sprint. On April 12th, top teams present online to our senior
          judging panel. National winners are announced at the end of finals.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color="#6966E3">National Finals</Chip>
          <Chip color="#6966E3">Awards</Chip>
        </div>
      </div>
    ),
  },
  {
    title: 'Post-Competition',
    content: (
      <div>
        <h4 className="sub-section-title text-[#DBDBDB] mb-4 text-center">What Happens Next</h4>
        <p className="text-[#DBDBDB]/70 text-base md:text-lg mb-6">
          Finalist decks are shared with sponsor companies (with permission). We
          facilitate warm intros between top performers, judges, and recruiting
          teams when there&apos;s mutual interest.
        </p>
        <div className="flex flex-wrap gap-3">
          <Chip color="#6966E3">Recruiting</Chip>
          <Chip color="#6966E3">Networking</Chip>
        </div>
      </div>
    ),
  },
];

interface CompanyLogo {
  name: string;
  logo: string | null;
  invert?: boolean;
}

const casePartners: CompanyLogo[] = [
  { name: 'BrainStation', logo: '/companies/brainstation.png', invert: true },
  { name: '28 Ventures', logo: '/companies/28-ventures.avif' },
  { name: 'PitchBook', logo: '/companies/pitchbook.png', invert: true },
  { name: 'Perplexity', logo: 'https://svgl.app/library/perplexity.svg' },
];

const networkJudges: CompanyLogo[] = [
  { name: 'Meta', logo: 'https://svgl.app/library/meta.svg' },
  { name: 'Google', logo: 'https://svgl.app/library/google.svg' },
  { name: 'Microsoft', logo: 'https://svgl.app/library/microsoft.svg' },
  { name: 'IBM', logo: 'https://svgl.app/library/ibm.svg' },
  { name: 'Amazon', logo: '/companies/amazon.png', invert: true },
  { name: 'Capital One', logo: '/companies/capital-one.png', invert: true },
  { name: 'Oracle', logo: '/companies/oracle.svg', invert: true },
  { name: 'GrubHub', logo: '/companies/grubhub.svg', invert: true },
  { name: 'TikTok', logo: 'https://svgl.app/library/tiktok-icon-light.svg' },
  { name: 'JP Morgan', logo: '/companies/chase-logo.svg', invert: true },
];

const partnerSchools: LogoItem[] = [
  { src: '/schools/upenn.png', alt: 'University of Pennsylvania' },
  { src: '/schools/columbia.png', alt: 'Columbia University' },
  { src: '/schools/brown.svg', alt: 'Brown University' },
  { src: '/schools/cornell.svg.png', alt: 'Cornell University' },
  { src: '/schools/duke.png', alt: 'Duke University' },
  { src: '/schools/georgetown.avif', alt: 'Georgetown University' },
  { src: '/schools/umich.png', alt: 'University of Michigan' },
  { src: '/schools/ucla.svg', alt: 'UCLA' },
  { src: '/schools/binghampton.jpg', alt: 'Binghamton University' },
  { src: '/schools/uiuc.png', alt: 'UIUC' },
];

const caseCompFAQs = [
  { question: 'Do I need product management experience to participate?', answer: "No. The competition attracts students from all backgrounds \u2014 business, engineering, design, liberal arts. What matters is your ability to think strategically about products and communicate a compelling solution." },
  { question: "What if my school isn't listed as a partner?", answer: "Reach out to us at pmc@nyu.edu. We can work with you or your school's club to get a team registered for the national round." },
  { question: 'How technical is the competition?', answer: "Not very. The focus is on product strategy \u2014 understanding users, defining solutions, prioritizing features, and making defensible tradeoffs. A polished prototype helps, but what judges really care about is your thinking." },
  { question: 'What makes a winning submission?', answer: 'Strong submissions demonstrate deep user understanding, strategic prioritization under constraints, clear success metrics, and realistic execution thinking. Judges look for teams that can defend their decisions and communicate a compelling product vision.' },
  { question: 'Can I participate remotely?', answer: "NYU students attend the first round in person, but finals are virtual. For non-NYU students, coordinate with your school's product club or reach out to us directly." },
  { question: "What's the time commitment?", answer: 'For each round, you have 24 hours from when the prompt drops to submit. Most teams spend 8\u201312 hours actively working. You can structure your time however works for your team.' },
  { question: 'Is there a participation fee?', answer: 'No. Case Competition is completely free to enter.' },
];

export default function CaseCompPage() {
  const [hoveredBenefit, setHoveredBenefit] = useState<number | string | null>(null);

  return (
    <div className="bg-black relative">
      <div className="absolute top-0 left-0 w-full h-[110vh] pointer-events-none">
        <UnicornScene
          projectId="nfEXG2pQZ01qd0grcKXy"
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js"
          width="100%"
          height="100%"
        />
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-b from-transparent to-black" />
      </div>

      <section className="relative z-10 px-6 md:px-16 lg:px-24 pt-20 pb-16 md:py-24 min-h-[80vh] md:min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center">
          <div className="flex flex-col items-center gap-6 max-w-3xl text-center">
            <FadeUp>
              <h1 className="section-title text-[#DBDBDB] text-center">
                <TextAnimate as="span" animation="slideLeft" by="character" className="inline">
                  Case Competition
                </TextAnimate>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-base md:text-xl text-[#DBDBDB]/70 leading-relaxed max-w-2xl">
                The NYU National Product Case Competition. Over 48 intense hours,
                students from top universities tackle a real product challenge,
                build a strategic solution, and pitch to judges from Meta, Google,
                Amazon, and more.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <Button
                href="https://www.instagram.com/nyupmc/"
                className="px-8 py-4"
              >
                Event Updates
              </Button>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* What Is Case Competition? — Split Section */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <FadeUp>
              <h2 className="section-title text-[#DBDBDB] mb-8 text-balance">
                <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                  What Is Case Competition?
                </TextAnimate>
              </h2>
              <p className="text-base md:text-lg text-[#DBDBDB]/70 leading-relaxed">
                Case Competition is a product strategy challenge structured like
                a sprint. Teams receive a real product problem from our case
                partner companies and have 48 hours to research, strategize, and
                build a pitch deck. Unlike hackathons focused on code, we
                evaluate product thinking: How well do you understand the user?
                Can you prioritize under constraints? Can you defend your
                decisions when challenged by experienced PMs?
              </p>
            </FadeUp>

            <div className="space-y-4 lg:mt-16">
              {whatIsFeatures.map((f, i) => (
                <FadeUp delay={0.1 + i * 0.1} key={i}>
                  <div 
                    className="relative overflow-hidden bg-[#3F3F3F]/20 border border-[#3F3F3F]/40 p-6 flex items-center gap-4 h-full cursor-default"
                    onMouseEnter={() => setHoveredBenefit(i + 10)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                  >
                    <AsciiHoverEffect
                      active={hoveredBenefit === i + 10}
                      colors="#6966E3,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                      fontSize={10}
                      className="opacity-40 mix-blend-screen"
                    />
                    <div className="w-8 h-8 text-[#6966E3] shrink-0 relative z-10">{f.icon}</div>
                    <p className="text-[#DBDBDB]/80 text-base relative z-10">{f.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] text-center mb-16">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                How to Participate
              </TextAnimate>
            </h2>
          </FadeUp>

          <div className="max-w-3xl mx-auto space-y-4">
            {participateSteps.map((step, i) => (
              <FadeUp delay={i * 0.08} key={i}>
                <div 
                  className="relative overflow-hidden flex gap-6 group p-6 cursor-default border border-[#3F3F3F]/40 bg-[#3F3F3F]/20"
                  onMouseEnter={() => setHoveredBenefit(i + 20)}
                  onMouseLeave={() => setHoveredBenefit(null)}
                >
                  <AsciiHoverEffect
                    active={hoveredBenefit === i + 20}
                    colors="#6966E3,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                    fontSize={10}
                    className="opacity-40 mix-blend-screen"
                  />
                  <span className="relative z-10 flex items-center justify-center w-10 h-10 border border-[#3F3F3F]/60 text-[#DBDBDB] text-sm font-medium shrink-0 transition-colors duration-300 group-hover:border-[#6966E3] group-hover:text-[#6966E3]">
                    {step.number}
                  </span>
                  <div className="relative z-10">
                    <h4 className="text-lg text-[#DBDBDB] font-medium mb-1">{step.title}</h4>
                    <p className="text-[#DBDBDB]/60 text-base leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* What You Gain — 3+2 Benefit Cards */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] text-center mb-16">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                What You Gain
              </TextAnimate>
            </h2>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competitionBenefits.slice(0, 3).map((b, i) => (
              <StaggerItem key={b.title}>
                <div
                  className="relative overflow-hidden bg-[#3F3F3F]/20 border border-[#3F3F3F]/40 p-8 md:p-10 cursor-default h-full"
                  onMouseEnter={() => setHoveredBenefit(i)}
                  onMouseLeave={() => setHoveredBenefit(null)}
                >
                  <AsciiHoverEffect
                    active={hoveredBenefit === i}
                    colors="#6966E3,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                    fontSize={10}
                    className="opacity-40 mix-blend-screen"
                  />
                  <div className="relative z-10">
                    <div className="w-10 h-10 mb-6 text-[#6966E3]">{b.icon}</div>
                    <h3 className="sub-section-title text-[#DBDBDB] mb-3">{b.title}</h3>
                    <p className="text-[#DBDBDB]/70 text-base leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-[900px] mx-auto">
            {competitionBenefits.slice(3).map((b, i) => (
              <StaggerItem key={b.title}>
                <div
                  className="relative overflow-hidden bg-[#3F3F3F]/20 border border-[#3F3F3F]/40 p-8 md:p-10 cursor-default h-full"
                  onMouseEnter={() => setHoveredBenefit(i + 3)}
                  onMouseLeave={() => setHoveredBenefit(null)}
                >
                  <AsciiHoverEffect
                    active={hoveredBenefit === i + 3}
                    colors="#6966E3,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                    fontSize={10}
                    className="opacity-40 mix-blend-screen"
                  />
                  <div className="relative z-10">
                    <div className="w-10 h-10 mb-6 text-[#6966E3]">{b.icon}</div>
                    <h3 className="sub-section-title text-[#DBDBDB] mb-3">{b.title}</h3>
                    <p className="text-[#DBDBDB]/70 text-base leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="relative z-10 px-6 md:px-16 lg:px-24 pt-24 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] mb-0 text-center">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                The Timeline
              </TextAnimate>
            </h2>
          </FadeUp>
          <FadeIn delay={0.2}>
            <div className="dark">
              <Timeline data={timelineData} showHeader={false} lineColor="#6966E3" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Past Partners */}
      <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] text-center mb-16">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Past Partners
              </TextAnimate>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h3 className="text-sm font-bold tracking-widest text-[#DBDBDB]/50 uppercase mb-6">
              Case Partners
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {casePartners.map((partner, i) => (
                <div
                  key={partner.name}
                  className="relative overflow-hidden flex items-center justify-center h-24 bg-[#3F3F3F]/20 border border-[#3F3F3F]/40 hover:border-[#6966E3] transition-colors duration-300 p-6 cursor-default"
                  onMouseEnter={() => setHoveredBenefit(`partner-${i}`)}
                  onMouseLeave={() => setHoveredBenefit(null)}
                >
                  <AsciiHoverEffect
                    active={hoveredBenefit === `partner-${i}`}
                    colors="#6966E3,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                    fontSize={10}
                    className="opacity-40 mix-blend-screen"
                  />
                  {partner.logo ? (
                    partner.logo.startsWith('http') ? (
                      <div className={`relative z-10 flex items-center justify-center ${['BrainStation', 'Perplexity', 'PitchBook'].includes(partner.name) ? 'w-36 h-12' : 'w-24 h-8'}`}>
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className={`w-auto h-auto object-contain brightness-0 invert ${['BrainStation', 'Perplexity', 'PitchBook'].includes(partner.name) ? 'max-h-12 max-w-36' : 'max-h-8 max-w-24'}`}
                          style={{ filter: 'brightness(0) invert(1)' }}
                        />
                      </div>
                    ) : (
                      <div className={`relative z-10 flex items-center justify-center ${['BrainStation', 'Perplexity', 'PitchBook'].includes(partner.name) ? 'w-36 h-12' : 'w-24 h-8'}`}>
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={['BrainStation', 'Perplexity', 'PitchBook'].includes(partner.name) ? 180 : 120}
                          height={['BrainStation', 'Perplexity', 'PitchBook'].includes(partner.name) ? 60 : 40}
                          className={`w-auto h-auto object-contain ${['BrainStation', 'Perplexity', 'PitchBook'].includes(partner.name) ? 'max-h-12 max-w-36' : 'max-h-8 max-w-24'}`}
                          style={partner.invert ? { filter: 'brightness(0) invert(1)' } : undefined}
                          unoptimized
                        />
                      </div>
                    )
                  ) : (
                    <span className="text-[#DBDBDB] text-sm font-medium relative z-10">{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h3 className="text-sm font-bold tracking-widest text-[#DBDBDB]/50 uppercase mb-6">
              Network &amp; Judges
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {networkJudges.map((company, i) => (
                <div
                  key={company.name}
                  className="relative overflow-hidden flex items-center justify-center h-20 bg-[#3F3F3F]/20 border border-[#3F3F3F]/40 hover:border-[#6966E3] transition-colors duration-300 p-4 cursor-default"
                  onMouseEnter={() => setHoveredBenefit(`judge-${i}`)}
                  onMouseLeave={() => setHoveredBenefit(null)}
                >
                  <AsciiHoverEffect
                    active={hoveredBenefit === `judge-${i}`}
                    colors="#6966E3,rgba(219,219,219,0.7),rgba(63,63,63,0.8)"
                    fontSize={10}
                    className="opacity-40 mix-blend-screen"
                  />
                  <div className="relative z-10">
                    {company.logo ? (
                      company.logo.startsWith('http') ? (
                        <div className="w-20 h-6 flex items-center justify-center">
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="max-h-6 max-w-20 w-auto h-auto object-contain"
                            style={{ filter: 'brightness(0) invert(1)' }}
                          />
                        </div>
                      ) : (
                        <div className={`flex items-center justify-center ${company.name === 'Amazon' ? 'w-24 h-9' : 'w-20 h-6'}`}>
                          <Image
                            src={company.logo}
                            alt={company.name}
                            width={company.name === 'Amazon' ? 150 : 100}
                            height={company.name === 'Amazon' ? 48 : 32}
                            className={`w-auto h-auto object-contain ${company.name === 'Amazon' ? 'max-h-9 max-w-24' : 'max-h-6 max-w-20'}`}
                            style={company.invert ? { filter: 'brightness(0) invert(1)' } : undefined}
                            unoptimized
                          />
                        </div>
                      )
                    ) : (
                      <span className="text-[#DBDBDB] text-sm font-medium">{company.name}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Partner Schools */}
      <section className="relative z-10 py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <FadeUp>
            <h2 className="section-title text-[#DBDBDB] text-center mb-12">
              <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                Partner Schools
              </TextAnimate>
            </h2>
          </FadeUp>
        </div>
        <FadeIn delay={0.2}>
          <LogoLoop
            logos={partnerSchools}
            speed={80}
            logoHeight={128}
            gap={48}
            pauseOnHover
            fadeOut
            fadeOutColor="#000000"
          />
        </FadeIn>
      </section>

      <JoinUsSection variant="default" newsletterSource="case-comp" />
      <FAQSection variant="default" items={caseCompFAQs} />
    </div>
  );
}
