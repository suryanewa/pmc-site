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
    question: 'Do I need a startup idea to apply?',
    answer:
      'No. Many successful participants start without a specific idea. The program is designed to help you discover problems worth solving through user interviews and validation exercises. If you already have an idea, that works too—we\'ll help you validate and refine it.',
  },
  {
    question: 'What if I have no coding or design experience?',
    answer:
      'That\'s fine. We teach rapid prototyping using modern AI tools and no-code platforms. The focus is on validating problems and shipping quickly, not building perfect products. You\'ll learn the fundamentals as you go.',
  },
  {
    question: 'How much time does the program require?',
    answer:
      'Expect 8–12 hours per week during the 9-week program. This includes weekly sessions, office hours, user interviews, and building. We design it to work alongside a full course load.',
  },
  {
    question: 'What happens after the 9 weeks?',
    answer:
      'You\'ll have a validated product, early users, and potentially revenue. Many teams continue building after the program, and we provide ongoing support, connections, and access to our network of founders and investors.',
  },
  {
    question: 'Can I work with a team?',
    answer:
      'Yes. You can apply as a solo founder or with a team. Many participants find co-founders during the program. We\'ll help facilitate team formation and ensure everyone has a clear role.',
  },
];

const INVESTING_FAQ_ITEMS = [
  {
    question: 'Do I need finance or investing experience?',
    answer:
      'No prior experience required. We teach you how to think like a VC from first principles. The program is designed for students who are curious about how startups are evaluated and want to develop sharp investment judgment.',
  },
  {
    question: 'What will I actually learn?',
    answer:
      'You\'ll learn mental models for evaluating markets and companies, how to break down businesses from first principles, fund math and term sheets, deal sourcing, and how to build conviction and articulate investment theses. By the end, you\'ll analyze real startups like a VC.',
  },
  {
    question: 'How much time does the program require?',
    answer:
      'Expect 6–10 hours per week during the 9-week program. This includes weekly sessions, reading assignments, company deep dives, debates, and optional office hours. We design it to work alongside your coursework.',
  },
  {
    question: 'Will this help me get a job in VC?',
    answer:
      'Many alumni have gone on to work at top VC firms, but the program focuses on teaching you how to think like an investor, not just preparing you for interviews. You\'ll develop skills that are valuable whether you pursue VC, startup roles, or entrepreneurship.',
  },
  {
    question: 'What\'s the format of the sessions?',
    answer:
      'Sessions combine lectures, case studies, debates, and hands-on exercises. You\'ll analyze real companies, practice deal analysis, and engage in structured discussions. The format is interactive and designed to build judgment through practice.',
  },
];

const EIR_FAQ_ITEMS = [
  {
    question: 'How is EIR different from /startup?',
    answer:
      'EIR is tailored for founders who already have a startup or are actively building. Instead of a structured curriculum, you get personalized mentorship, need-based workshops, and direct access to VC partners based on your specific challenges. It\'s more flexible and founder-driven.',
  },
  {
    question: 'What stage should my startup be at?',
    answer:
      'EIR welcomes founders at various stages—from refining an idea to building an MVP to pushing toward revenue. The program adapts to where you are. What matters is that you\'re serious about building and ready to engage with mentorship.',
  },
  {
    question: 'How selective is the program?',
    answer:
      'EIR is highly selective. We look for founders who demonstrate commitment, clarity about what they\'re building, and readiness to make the most of mentorship. The application includes written responses and an interview to ensure fit.',
  },
  {
    question: 'What kind of mentorship do I get?',
    answer:
      'You\'ll have access to VC partners, experienced founders, and industry experts through office hours, founder dinners, and workshops. Mentorship is tailored to your needs—whether that\'s product strategy, fundraising, go-to-market, or technical challenges.',
  },
  {
    question: 'Can I get funding through EIR?',
    answer:
      'While EIR doesn\'t guarantee funding, many founders have raised capital through connections made in the program. You\'ll have opportunities to pitch to investors, and the program culminates in pitch events with VC exposure. The focus is on building a strong company first.',
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
