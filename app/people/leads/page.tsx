'use client';

import { FadeUp } from '../../components/ScrollAnimations';
import { LeadershipMember } from '../../components/LeadershipMember';
import { TextAnimate } from '@/components/ui/text-animate';
import { JoinUsSection } from '../../components/JoinUsSection';

const placeholderImage = '/pmc-logo.svg';

const programLeads = [
  {
    program: 'Product Team',
    members: [
      {
        id: 1,
        src: placeholderImage,
        name: 'Soumya M.',
        role: 'Senior Product Team Lead',
        description: 'Soumya is a junior studying Business, Technology, and Entrepreneurship with a minor in CS. She enjoys listening to music, cooking, and traveling to new places!',
      },
      {
        id: 2,
        src: placeholderImage,
        name: 'Valerie Zou',
        role: 'Junior Product Team Lead',
      },
      {
        id: 3,
        src: placeholderImage,
        name: 'Prateek Nedungadi',
        role: 'Product Team Coordinator',
      },
    ],
  },
  {
    program: 'Mentorship',
    members: [
      {
        id: 4,
        src: placeholderImage,
        name: 'Jade Leong',
        role: 'Mentorship Lead',
      },
      {
        id: 5,
        src: placeholderImage,
        name: 'Ethan Lu',
        role: 'Mentorship Lead',
      },
    ],
  },
  {
    program: 'Case Competition',
    members: [
      {
        id: 6,
        src: placeholderImage,
        name: 'Tarush Garg',
        role: 'Case Competition Lead',
      },
      {
        id: 7,
        src: placeholderImage,
        name: 'Surya Newa',
        role: 'Case Competition Lead',
      },
    ],
  },
];

export default function LeadsPage() {
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
                Leads
              </TextAnimate>
            </h1>
          </FadeUp>
        </div>
      </section>

      <section id="program-leads" className="relative px-6 md:px-16 lg:px-24 pt-24 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="sub-section-title text-[#DBDBDB] mb-16 text-center">
              <TextAnimate
                as="span"
                animation="slideLeft"
                by="character"
                className="inline"
                startOnView={true}
              >
                Program Leads
              </TextAnimate>
            </h2>
          </FadeUp>

          <div className="flex flex-col gap-20">
            {programLeads.map((program, programIndex) => (
              <div key={program.program}>
                <FadeUp delay={programIndex * 0.1}>
                  <h3 className="text-2xl md:text-3xl font-medium text-[#DBDBDB] mb-8 text-center">
                    {program.program}
                  </h3>
                </FadeUp>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                  {program.members.map((member) => (
                    <LeadershipMember
                      key={member.id}
                      src={member.src}
                      name={member.name}
                      role={member.role}
                      description={member.description}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JoinUsSection newsletterSource="people-leads" />
    </div>
  );
}
