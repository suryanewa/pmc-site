'use client';

import { FadeUp } from '../../components/ScrollAnimations';
import { LeadershipMember } from '../../components/LeadershipMember';
import { TextAnimate } from '@/components/ui/text-animate';
import { JoinUsSection } from '../../components/JoinUsSection';

const placeholderImage = '/pmc-logo.svg';

const leadershipMembers = [
  {
    id: 1,
    src: placeholderImage,
    name: 'Nihar Bagkar',
    role: 'President',
    description: 'Nihar is a sophomore studying Business, Technology, and Entrepreneurship with a minor in Math/CS and Psychology. He enjoys a variety of sports like football and soccer, traveling, and comedy shows!',
  },
  {
    id: 2,
    src: placeholderImage,
    name: 'Mykayla Liu',
    role: 'Vice President',
    description: 'Mykayla is a sophomore studying Economics with a minor in Business Studies. She enjoys traveling, cafe hopping and crossword puzzles!',
  },
  {
    id: 3,
    src: placeholderImage,
    name: 'Sohan Joshi',
    role: 'Vice President',
    description: 'Sohan is a graduate student pursuing Management of Technology. He\'s passionate about startups and venture capital, and spends his downtime creating podcasts, writing, and making videos.',
  },
  {
    id: 4,
    src: placeholderImage,
    name: 'Nitya Garg',
    role: 'Treasurer',
    description: 'Nitya is a junior studying Sustainable Fashion, Finance & Technology with a Social Entrepreneurship minor. She loves dancing, traveling, her two dogs, and creating content.',
  },
  {
    id: 5,
    src: placeholderImage,
    name: 'Maggie Lu',
    role: 'Director of Growth',
    description: 'Maggie is a sophomore studying Interactive Media Arts. She\'s passionate about PM/Startups and loves trying the newest Trader Joe\'s snacks on the side.',
  },
  {
    id: 6,
    src: placeholderImage,
    name: 'Katie Tso',
    role: 'Director of Marketing',
    description: 'Katie is a sophomore studying Business with concentrations in Marketing and Finance. She enjoys exploring photography, fashion, and true crime podcasts.',
  },
  {
    id: 7,
    src: placeholderImage,
    name: 'Sean Hu',
    role: 'Director of Outreach',
    description: 'Sean is a sophomore majoring in Data Science with a minor in fixing his sleep schedule. He enjoys exploring the city, hooping with friends, and over-refining his Beli list.',
  },
  {
    id: 8,
    src: placeholderImage,
    name: 'Eason Wang',
    role: 'Director of Outreach',
    description: 'Eason is a sophomore studying Finance and Data Science with a CS minor. He loves tech and spicy food. Outside class, he\'s spiking volleyballs, exploring restaurants, or making noise on his sax.',
  },
  {
    id: 9,
    src: placeholderImage,
    name: 'Theresa Yung',
    role: 'Marketing Lead',
  },
  {
    id: 10,
    src: placeholderImage,
    name: 'Sophia Xu',
    role: 'Event Coordinator',
  },
  {
    id: 11,
    src: placeholderImage,
    name: 'Pranava Manthena',
    role: 'Event Coordinator',
  },
  {
    id: 12,
    src: placeholderImage,
    name: 'Matthew Singh',
    role: 'PR & Communications Lead',
    description: 'Matthew is a junior studying English Literature and Journalism. He enjoys reading novels, visiting national parks, and watching sports.',
  },
  {
    id: 13,
    src: placeholderImage,
    name: 'Shreyam Borah',
    role: 'Director of Graduate Engagement',
    description: 'Shreyam is a graduate student and the Grad Events Coordinator at PMC.',
  },
  {
    id: 14,
    src: placeholderImage,
    name: 'Chirag Dhiwar',
    role: 'Graduate Engagement Lead',
  },
  {
    id: 15,
    src: placeholderImage,
    name: 'Tansin Taj',
    role: 'Graduate Engagement Lead',
  },
];

export default function LeadershipPage() {
  return (
    <div className="bg-black min-h-screen">
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 pt-24 pb-16 bg-black">
        <div className="relative z-10 w-full max-w-[1400px] mx-auto text-center">
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

      <section id="e-board" className="relative px-6 md:px-16 lg:px-24 pt-24 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="sub-section-title text-[#DBDBDB] mb-4 text-center">
              <TextAnimate
                as="span"
                animation="slideLeft"
                by="character"
                className="inline"
                startOnView={true}
              >
                Meet the Team
              </TextAnimate>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {leadershipMembers.map((member) => (
              <LeadershipMember
                key={member.id}
                src={member.src}
                name={member.name}
                role={member.role}
                description={member.description}
                linkedinUrl={member.linkedinUrl}
              />
            ))}
          </div>
        </div>
      </section>

      <JoinUsSection newsletterSource="people-e-board" />
    </div>
  );
}
