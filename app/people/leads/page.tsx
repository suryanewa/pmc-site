import { FadeUp } from '../../components/ScrollAnimations';
import { LeadershipMember } from '../../components/LeadershipMember';
import { TextAnimate } from '@/components/ui/text-animate';
import { JoinUsSection } from '../../components/JoinUsSection';

export const dynamic = 'force-static';

interface ProgramMember {
  id: number;
  src: string;
  name: string;
  role: string;
  coffeeChatUrl: string;
  description?: string;
  imageClassName?: string;
}

interface ProgramGroup {
  program: string;
  color: string;
  members: ProgramMember[];
}

const programLeads: ProgramGroup[] = [
  {
    program: 'Product Team',
    color: '#41C9C1',
    members: [
      {
        id: 1,
        src: '/portraits/soumya-m.webp',
        name: 'Soumya M.',
        role: 'Senior Product Team Lead',
        coffeeChatUrl: 'https://calendly.com/srm9678-stern/pmc-coffee-chats',
        description: 'Soumya is a junior studying Business, Technology, and Entrepreneurship with a minor in CS. She enjoys listening to music, cooking, and traveling to new places!',
      },
      {
        id: 2,
        src: '/portraits/valerie-zou.webp',
        name: 'Valerie Zou',
        role: 'Junior Product Team Lead',
        coffeeChatUrl: 'https://calendly.com/vz2160-nyu/valerie-s-calendly',
      },
      {
        id: 3,
        src: '/portraits/prateek-nedungadi.webp',
        name: 'Prateek Nedungadi',
        role: 'Product Team Coordinator',
        coffeeChatUrl: 'https://calendly.com/prateek-nedungadi-stern/30min',
      },
    ],
  },
  {
    program: 'Mentorship',
    color: '#5076DD',
    members: [
      {
        id: 4,
        src: '/portraits/jade-leong.webp',
        name: 'Jade Leong',
        role: 'Mentorship Lead',
        coffeeChatUrl: 'https://calendly.com/jyl9618-nyu/30min',
      },
      {
        id: 5,
        src: '/portraits/ethan-lu.webp',
        name: 'Ethan Lu',
        role: 'Mentorship Lead',
        coffeeChatUrl: 'https://calendly.com/rkl6999-nyu/30min',
      },
    ],
  },
  {
    program: 'Case Competition',
    color: '#6966E3',
    members: [
      {
        id: 6,
        src: '/portraits/tarush-garg.webp',
        name: 'Tarush Garg',
        role: 'Case Competition Lead',
        coffeeChatUrl: 'https://calendly.com/tg2903-nyu/30min',
        imageClassName: '-scale-x-100',
      },
      {
        id: 7,
        src: '/portraits/surya-newa.webp',
        name: 'Surya Newa',
        role: 'Case Competition Lead',
        coffeeChatUrl: 'https://cal.com/suryanewa/quick-chat',
        imageClassName: '-scale-x-100',
      },
    ],
  },
];

export default function LeadsPage() {
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
                Program Leads
              </TextAnimate>
            </h1>
          </FadeUp>
        </div>
      </section>

      <div className="px-6 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          {programLeads.map((program, programIndex) => (
            <section key={program.program} className="pt-12 pb-20">
              <FadeUp>
                <div className="flex items-center gap-6 mb-12">
                  <div className="h-px flex-1 bg-[#3F3F3F]" />
                  <span
                    className="text-sm md:text-base font-bold uppercase tracking-[0.25em] whitespace-nowrap"
                    style={{ color: program.color }}
                  >
                    {program.program}
                  </span>
                  <div className="h-px flex-1 bg-[#3F3F3F]" />
                </div>
              </FadeUp>

              {program.members.length <= 2 ? (
                <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-12">
                  {program.members.map((member, i) => (
                    <div key={member.id} className="w-full max-w-sm">
                      <FadeUp delay={(programIndex * 0.1) + (i * 0.08)}>
                        <LeadershipMember
                          src={member.src}
                          name={member.name}
                          role={member.role}
                          coffeeChatUrl={member.coffeeChatUrl}
                          description={member.description}
                          imageClassName={member.imageClassName}
                        />
                      </FadeUp>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  {program.members.map((member, i) => (
                    <FadeUp key={member.id} delay={(programIndex * 0.1) + (i * 0.08)}>
                      <LeadershipMember
                        src={member.src}
                        name={member.name}
                        role={member.role}
                        coffeeChatUrl={member.coffeeChatUrl}
                        description={member.description}
                        imageClassName={member.imageClassName}
                      />
                    </FadeUp>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      <JoinUsSection newsletterSource="people-leads" />
    </div>
  );
}
