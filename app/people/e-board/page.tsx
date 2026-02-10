'use client';

import { FadeUp } from '../../components/ScrollAnimations';
import { LeadershipMember } from '../../components/LeadershipMember';
import { TextAnimate } from '@/components/ui/text-animate';
import { JoinUsSection } from '../../components/JoinUsSection';

const leadershipMembers = [
  {
    id: 1,
    src: '/portraits/nihar-bagkar.jpeg',
    name: 'Nihar Bagkar',
    role: 'President',
    description: 'Nihar is a sophomore studying Business, Technology, and Entrepreneurship with a minor in Math/CS and Psychology. He enjoys a variety of sports like football and soccer, traveling, and comedy shows!',
  },
  {
    id: 2,
    src: '/portraits/mykayla-liu.webp',
    name: 'Mykayla Liu',
    role: 'Vice President',
    description: 'Mykayla is a sophomore studying Economics with a minor in Business Studies. She enjoys traveling, cafe hopping and crossword puzzles!',
  },
  {
    id: 3,
    src: '/portraits/sohan-joshi.avif',
    name: 'Sohan Joshi',
    role: 'Vice President',
    description: 'Sohan is a graduate student pursuing Management of Technology. He\'s passionate about startups and venture capital, and spends his downtime creating podcasts, writing, and making videos.',
  },
  {
    id: 4,
    src: '/portraits/nitya-garg.jpeg',
    name: 'Nitya Garg',
    role: 'Treasurer',
    description: 'Nitya is a junior studying Sustainable Fashion, Finance & Technology with a Social Entrepreneurship minor. She loves dancing, traveling, her two dogs, and creating content.',
  },
  {
    id: 5,
    src: '/portraits/maggie-lu.jpeg',
    name: 'Maggie Lu',
    role: 'Director of Growth',
    description: 'Maggie is a sophomore studying Interactive Media Arts. She\'s passionate about PM/Startups and loves trying the newest Trader Joe\'s snacks on the side.',
  },
  {
    id: 6,
    src: '/portraits/katie-tso.avif',
    name: 'Katie Tso',
    role: 'Director of Marketing',
    description: 'Katie is a sophomore studying Business with concentrations in Marketing and Finance. She enjoys exploring photography, fashion, and true crime podcasts.',
  },
  {
    id: 7,
    src: '/portraits/sean-hu.jpeg',
    name: 'Sean Hu',
    role: 'Director of Outreach',
    description: 'Sean is a sophomore majoring in Data Science with a minor in fixing his sleep schedule. He enjoys exploring the city, hooping with friends, and over-refining his Beli list.',
  },
  {
    id: 8,
    src: '/portraits/eason-wang.avif',
    name: 'Eason Wang',
    role: 'Director of Outreach',
    description: 'Eason is a sophomore studying Finance and Data Science with a CS minor. He loves tech and spicy food. Outside class, he\'s spiking volleyballs, exploring restaurants, or making noise on his sax.',
  },
  {
    id: 9,
    src: '/portraits/theresa-yung.png',
    name: 'Theresa Yung',
    role: 'Marketing Lead',
  },
  {
    id: 10,
    src: '/portraits/sophia-xu.jpeg',
    name: 'Sophia Xu',
    role: 'Event Coordinator',
  },
  {
    id: 11,
    src: '/portraits/pranava-manthena.jpg',
    name: 'Pranava Manthena',
    role: 'Event Coordinator',
  },
  {
    id: 12,
    src: '/portraits/matthew-singh.avif',
    name: 'Matthew Singh',
    role: 'PR & Communications Lead',
    description: 'Matthew is a junior studying English Literature and Journalism. He enjoys reading novels, visiting national parks, and watching sports.',
  },
  {
    id: 13,
    src: '/portraits/shreyam-borah.avif',
    name: 'Shreyam Borah',
    role: 'Director of Graduate Engagement',
    description: 'Shreyam is a graduate student and the Grad Events Coordinator at PMC.',
  },
  {
    id: 14,
    src: '/portraits/chirag-dhiwar.png',
    name: 'Chirag Dhiwar',
    role: 'Graduate Engagement Lead',
  },
  {
    id: 15,
    src: '/portraits/tansin-taj.jpeg',
    name: 'Tansin Taj',
    role: 'Graduate Engagement Lead',
  },
];

const president = leadershipMembers.find(m => m.id === 1)!;
const vpsAndTreasurer = leadershipMembers.filter(m => [2, 3, 4].includes(m.id));
const directors = leadershipMembers.filter(m => [5, 6, 7, 8, 13].includes(m.id));
const leads = leadershipMembers.filter(m => [9, 10, 11, 12, 14, 15].includes(m.id));

function TierDivider({ label, color }: { label: string; color: string }) {
  return (
    <FadeUp>
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-[#3F3F3F]" />
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em] whitespace-nowrap"
          style={{ color }}
        >
          {label}
        </span>
        <div className="h-px flex-1 bg-[#3F3F3F]" />
      </div>
    </FadeUp>
  );
}

export default function LeadershipPage() {
  return (
    <div className="bg-black min-h-screen">
      <section className="pt-36 pb-8 px-6 md:px-16 lg:px-24 bg-black">
        <div className="w-full max-w-[1400px] mx-auto text-center">
          <FadeUp>
            <h1 className="section-title text-[#DBDBDB]">
              <TextAnimate
                as="span"
                animation="slideLeft"
                by="character"
                className="inline"
              >
                E-Board
              </TextAnimate>
            </h1>
          </FadeUp>
        </div>
      </section>

      <div className="px-6 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <section className="pt-12 pb-20">
            <TierDivider label="Executive Board" color="#41C9C1" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
              <div className="md:col-start-2">
                <FadeUp>
                  <LeadershipMember
                    src={president.src}
                    name={president.name}
                    role={president.role}
                    description={president.description}
                  />
                </FadeUp>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {vpsAndTreasurer.map((member, i) => (
                <FadeUp key={member.id} delay={i * 0.1}>
                  <LeadershipMember
                    src={member.src}
                    name={member.name}
                    role={member.role}
                    description={member.description}
                  />
                </FadeUp>
              ))}
            </div>
          </section>

          <section className="pb-20">
            <TierDivider label="Directors" color="#5076DD" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {directors.map((member, i) => (
                <FadeUp key={member.id} delay={i * 0.08}>
                  <LeadershipMember
                    src={member.src}
                    name={member.name}
                    role={member.role}
                    description={member.description}
                  />
                </FadeUp>
              ))}
            </div>
          </section>

          <section className="pb-20">
            <TierDivider label="Leads & Coordinators" color="#6966E3" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {leads.map((member, i) => (
                <FadeUp key={member.id} delay={i * 0.08}>
                  <LeadershipMember
                    src={member.src}
                    name={member.name}
                    role={member.role}
                    description={member.description}
                  />
                </FadeUp>
              ))}
            </div>
          </section>
        </div>
      </div>

      <JoinUsSection newsletterSource="people-e-board" />
    </div>
  );
}
