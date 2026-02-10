'use client';

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@/components/animate-ui/components/headless/accordion';
import { FadeUp } from './ScrollAnimations';
import { TextAnimate } from '@/components/ui/text-animate';

type FAQVariant = 'default' | 'startup' | 'investing' | 'eir';

const theme = {
  default: {
    bg: 'bg-black',
    accent: '#41C9C1',
    slashClass: 'text-[#41C9C1]',
    focusRing: '#41C9C1',
    focusRingOffset: '#000000',
  },
  startup: {
    bg: 'bg-black',
    accent: '#5076DD',
    slashClass: 'text-[#5076DD]',
    focusRing: '#5076DD',
    focusRingOffset: '#000000',
  },
  investing: {
    bg: 'bg-black',
    accent: '#6966E3',
    slashClass: 'text-[#6966E3]',
    focusRing: '#6966E3',
    focusRingOffset: '#000000',
  },
  eir: {
    bg: 'bg-black',
    accent: '#5076DD',
    slashClass: 'text-[#5076DD]',
    focusRing: '#5076DD',
    focusRingOffset: '#000000',
  },
};

const DEFAULT_FAQ_ITEMS = [
  {
    question: 'Who can join PMC?',
    answer:
      'PMC welcomes NYU students from all schools and majors who are curious about entrepreneurship, investing, or building. Prior experience is not required—we look for motivation, curiosity, and a willingness to learn.',
  },
  {
    question: 'How do I apply?',
    answer:
      'Applications open at the start of each semester. Submit through our website and expect to hear back within a few weeks. Some programs involve written applications; others may include brief interviews.',
  },
  {
    question: 'What programs does PMC offer?',
    answer:
      'We run /startup (a 9-week accelerator), /investing (deal analysis and thesis-building), and /eir (Entrepreneurs-in-Residence). Each has its own timeline and format—explore our Programs section for details.',
  },
  {
    question: 'What\'s the time commitment?',
    answer:
      'It varies by program. Most involve weekly sessions, office hours, and optional events. We design programs to work alongside a full course load, but we recommend budgeting 5–10 hours per week during active cohorts.',
  },
  {
    question: 'How can I stay updated?',
    answer:
      'Subscribe to our newsletter above and follow us on LinkedIn, X, and Instagram. We announce applications, events, and community updates there.',
  },
];

const STARTUP_FAQ_ITEMS = [
  {
    question: 'Do I need prior PM experience to apply?',
    answer:
      'Not at all! Product Team is designed for students who are new to product management. We\'re here to help you do real PM work from day one. All you need is curiosity about technology and a passion for solving user problems.',
  },
  {
    question: 'What will I have at the end of the program?',
    answer:
      'You\'ll have a complete product case study, high-fidelity prototypes, product roadmaps and launch strategies, and a solid portfolio piece for PM interviews. You\'ll also have experience presenting to industry PMs and receiving professional feedback.',
  },
  {
    question: 'How much time does the program require?',
    answer:
      'Plan for about 6–7 hours per week during the 10-week program. This includes weekly sessions, user research activities, prototyping work, and presentations. It\'s designed to work alongside a full course load.',
  },
  {
    question: 'What does the application process look like?',
    answer:
      'Our application has 2 rounds: a written application with questions about your PM interests and how you think about products, followed by an interview to get to know you and understand your problem-solving approach.',
  },
  {
    question: 'Who can apply?',
    answer:
      'Product Team is open to first and second year undergraduate students. No prior PM experience is required—just bring your curiosity about technology and passion for creating impact.',
  },
];

const INVESTING_FAQ_ITEMS = [
  {
    question: 'What\'s the difference between Intro and Advanced tracks?',
    answer:
      'Intro is for students early in their PM journey—you\'ll be paired with a PMC E-Board member to learn PM fundamentals. Advanced is for students actively recruiting—you\'ll be paired with a full-time Product Manager from industry for guidance on recruiting, interviewing, and career progression.',
  },
  {
    question: 'How often do I meet with my mentor?',
    answer:
      'You\'ll meet your assigned mentor at least once every two weeks at your own discretion, with at least one meeting in person. A guided syllabus tailored to your track helps you structure and maximize your meetings.',
  },
  {
    question: 'What events are included?',
    answer:
      'Mentees get exclusive access to mentorship-only events, including workshops, professional Q&A sessions, interview prep, office tours (like our Mastercard NYC visit), kickoff events, and a farewell celebration.',
  },
  {
    question: 'What companies do Advanced mentors come from?',
    answer:
      'Advanced track mentors are full-time Product Managers from companies like Google, JPMC, Mastercard, PwC, NYU Langone, and more. They bring real industry experience across a range of sectors.',
  },
  {
    question: 'Is attendance at events required?',
    answer:
      'Yes. Mentees are required to attend mentorship-exclusive events, including networking sessions and professional workshops across the semester. This is how you get the most value from the program.',
  },
];

const EIR_FAQ_ITEMS = [
  {
    question: 'Do I need prior PM experience to apply?',
    answer:
      'No! The Graduate PM Bootcamp is designed for students with 0–1 years of experience who are new to product management. We teach you real PM frameworks from the ground up—Design Thinking, Lean Startup, Agile, and more.',
  },
  {
    question: 'How intensive is the program?',
    answer:
      'The bootcamp runs 10 sessions between February 23 and March 27. Each session is 2.5 hours (6:00–8:30 PM), plus independent work on deliverables between sessions. It\'s intensive but designed to be manageable alongside your coursework.',
  },
  {
    question: 'What will I have when it\'s over?',
    answer:
      'You\'ll walk away with a portfolio-ready PRD, user research summaries with journey maps, prioritized feature sets with OKRs, a working prototype or vibe-coded MVP, a complete presentation deck, and a resume-ready project for PM interviews.',
  },
  {
    question: 'Who is this program for?',
    answer:
      'The Graduate PM Bootcamp is for NYU graduate students with 0–1 years of experience in software engineering, marketing, or design who are curious about how products are built and passionate about solving user problems.',
  },
  {
    question: 'How do I apply?',
    answer:
      'Applications open at the beginning of each semester. The process has 2 rounds: a written application about your PM interests and experience, followed by an interview. Subscribe to our newsletter or follow NYUPMC to know when applications go live.',
  },
];

interface FAQSectionProps {
  variant?: FAQVariant;
  items?: Array<{ question: string; answer: string }>;
}

export function FAQSection({ variant = 'default', items }: FAQSectionProps) {
  const t = theme[variant];
  const faqItems = items || 
    (variant === 'startup' ? STARTUP_FAQ_ITEMS :
     variant === 'investing' ? INVESTING_FAQ_ITEMS :
     variant === 'eir' ? EIR_FAQ_ITEMS :
     DEFAULT_FAQ_ITEMS);

  return (
    <section className={`relative z-10 overflow-hidden ${t.bg} pt-16 pb-24 px-6 md:px-16 lg:px-24`}>
      <style dangerouslySetInnerHTML={{
        __html: `
          [data-faq-variant="${variant}"] button:focus-visible {
            outline: 2px solid ${t.focusRing};
            outline-offset: 2px;
          }
        `
      }} />
      <div className="max-w-3xl mx-auto relative z-10" data-faq-variant={variant}>
        <FadeUp>
            <TextAnimate as="h2" animation="slideLeft" by="character" className="section-title text-[#DBDBDB] mb-12 text-center">
            FAQs
          </TextAnimate>
        </FadeUp>

        <FadeUp delay={0.1}>
          <Accordion className="flex flex-col">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                className="border-b border-[#3F3F3F]/60 last:border-b-0 first:pt-0"
              >
                <AccordionButton
                  className="text-base md:text-lg font-medium text-[#DBDBDB] py-5 pr-2 hover:text-[#DBDBDB]/90 hover:no-underline [&>svg]:text-[#DBDBDB]/60"
                >
                  {item.question}
                </AccordionButton>
                <AccordionPanel className="text-[#DBDBDB]/70 text-[15px] md:text-base leading-relaxed pb-5 pl-0">
                  <div>{item.answer}</div>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeUp>
      </div>
    </section>
  );
}
