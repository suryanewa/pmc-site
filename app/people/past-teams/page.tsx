'use client';

import { useState, useMemo, useCallback } from 'react';
import { FadeUp } from '../../components/ScrollAnimations';
import {
  teamsData,
  teamConfig,
  programFilterTeams,
  programFilterLabels,
  type Team,
  type ProgramFilter,
} from './teams-data';
import { TeamMemberCard } from '../../components/TeamMemberCard';
import { FilterChip } from '../../components/FilterChip';
import { AnimatePresence, motion } from 'motion/react';
import { TextAnimate } from '@/components/ui/text-animate';
import { JoinUsSection } from '../../components/JoinUsSection';

const TEAM_DISPLAY_ORDER: Team[] = [
  'product-team',
  'mentorship-advanced',
  'mentorship-intro',
  'grad-bootcamp',
  'case-comp',
];

const PROGRAM_FILTER_ORDER: ProgramFilter[] = [
  'all',
  'product-team',
  'mentorship',
  'grad-bootcamp',
  'case-comp',
];

type GroupedMember = {
  key: string;
  name: string;
};

type TeamGroup = {
  team: Team;
  members: GroupedMember[];
};

type FilteredSemester = {
  semester: 'spring' | 'fall';
  year: number;
  teamGroups: TeamGroup[];
};

const CHEVRON_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12" fill="none">
    <path d="M6 9L1 4h10L6 9Z" fill="#DBDBDB" />
  </svg>
);

export default function PastTeamsPage() {
  const [selectedYears, setSelectedYears] = useState<Set<number> | 'all'>('all');
  const [selectedSemester, setSelectedSemester] = useState<'spring' | 'fall' | 'all'>('all');
  const [selectedProgram, setSelectedProgram] = useState<ProgramFilter>('all');

  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(teamsData.map((d) => d.year)));
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  const toggleYear = useCallback((year: number) => {
    setSelectedYears((prev) => {
      if (prev === 'all') {
        return new Set([year]);
      }
      const next = new Set(prev);
      if (next.has(year)) {
        next.delete(year);
        return next.size === 0 ? 'all' : new Set(next);
      }
      next.add(year);
      return new Set(next);
    });
  }, []);

  const allowedTeams = programFilterTeams[selectedProgram];

  const allowedTeamsSet = useMemo(() => {
    if (allowedTeams === 'all') {
      return null;
    }
    return new Set(allowedTeams);
  }, [allowedTeams]);

  const filteredData = useMemo<FilteredSemester[]>(() => {
    const output: FilteredSemester[] = [];

    for (const data of teamsData) {
      const yearMatch = selectedYears === 'all' || selectedYears.has(data.year);
      const semesterMatch = selectedSemester === 'all' || data.semester === selectedSemester;

      if (!yearMatch || !semesterMatch) {
        continue;
      }

      const grouped = new Map<Team, GroupedMember[]>();
      for (const team of TEAM_DISPLAY_ORDER) {
        grouped.set(team, []);
      }

      data.members.forEach((member, memberIndex) => {
        if (allowedTeamsSet && !allowedTeamsSet.has(member.team)) {
          return;
        }

        grouped.get(member.team)?.push({
          key: `${data.semester}-${data.year}-${member.team}-${member.name}-${memberIndex}`,
          name: member.name,
        });
      });

      const teamGroups = TEAM_DISPLAY_ORDER
        .map((team) => ({
          team,
          members: grouped.get(team) ?? [],
        }))
        .filter((group) => group.members.length > 0);

      if (teamGroups.length > 0) {
        output.push({
          semester: data.semester,
          year: data.year,
          teamGroups,
        });
      }
    }

    return output;
  }, [selectedYears, selectedSemester, allowedTeamsSet]);

  const clearFilters = useCallback(() => {
    setSelectedYears('all');
    setSelectedSemester('all');
    setSelectedProgram('all');
  }, []);

  const hasActiveFilters =
    selectedYears !== 'all' || selectedSemester !== 'all' || selectedProgram !== 'all';

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
                once={true}
              >
                Past Teams
              </TextAnimate>
            </h1>
          </FadeUp>
        </div>
      </section>

      <div className="z-40 bg-black/95 backdrop-blur-sm border-b border-[#3F3F3F]/60 py-4 px-6 md:px-16 lg:px-24 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:hidden">
            <div className="flex flex-col gap-1">
              <label htmlFor="year-select" className="text-xs font-medium text-[#DBDBDB]/60">Year</label>
              <div className="relative">
                <select
                  id="year-select"
                  value={selectedYears === 'all' ? 'all' : Array.from(selectedYears)[0] || 'all'}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === 'all') {
                      setSelectedYears('all');
                    } else {
                      setSelectedYears(new Set([parseInt(value, 10)]));
                    }
                  }}
                  className="w-full px-4 py-2 pr-8 text-sm border border-[#3F3F3F]/60 bg-black text-[#DBDBDB] rounded-none focus:outline-none focus:border-[#41C9C1] appearance-none"
                >
                  <option value="all">All Years</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#DBDBDB]">
                  {CHEVRON_SVG}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="semester-select" className="text-xs font-medium text-[#DBDBDB]/60">Semester</label>
              <div className="relative">
                <select
                  id="semester-select"
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value as 'spring' | 'fall' | 'all')}
                  className="w-full px-4 py-2 pr-8 text-sm border border-[#3F3F3F]/60 bg-black text-[#DBDBDB] rounded-none focus:outline-none focus:border-[#41C9C1] appearance-none"
                >
                  <option value="all">All Semesters</option>
                  <option value="spring">Spring</option>
                  <option value="fall">Fall</option>
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#DBDBDB]">
                  {CHEVRON_SVG}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="program-select" className="text-xs font-medium text-[#DBDBDB]/60">Program</label>
              <div className="relative">
                <select
                  id="program-select"
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value as ProgramFilter)}
                  className="w-full px-4 py-2 pr-8 text-sm border border-[#3F3F3F]/60 bg-black text-[#DBDBDB] rounded-none focus:outline-none focus:border-[#41C9C1] appearance-none"
                >
                  {PROGRAM_FILTER_ORDER.map((key) => (
                    <option key={key} value={key}>{programFilterLabels[key]}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#DBDBDB]">
                  {CHEVRON_SVG}
                </span>
              </div>
            </div>

            {hasActiveFilters && (
              <button onClick={clearFilters} className="mt-2 text-sm text-[#41C9C1] hover:underline font-medium text-left cursor-pointer">
                Clear all
              </button>
            )}
          </div>

          <div className="hidden md:flex flex-wrap items-center gap-2 md:gap-4">
            <div className="flex flex-wrap gap-2">
              <FilterChip label="All Years" isActive={selectedYears === 'all'} onClick={() => setSelectedYears('all')} className="rounded-full" />
              {years.map((year) => (
                <FilterChip key={year} label={year.toString()} isActive={selectedYears !== 'all' && selectedYears.has(year)} onClick={() => toggleYear(year)} className="rounded-full" />
              ))}
            </div>

            <div className="w-[1px] h-6 bg-[#3F3F3F]/60 hidden md:block mx-2" />

            <div className="flex gap-2">
              <FilterChip label="All Semesters" isActive={selectedSemester === 'all'} onClick={() => setSelectedSemester('all')} className="rounded-full" />
              <FilterChip label="Spring" isActive={selectedSemester === 'spring'} onClick={() => setSelectedSemester(selectedSemester === 'spring' ? 'all' : 'spring')} className="rounded-full" />
              <FilterChip label="Fall" isActive={selectedSemester === 'fall'} onClick={() => setSelectedSemester(selectedSemester === 'fall' ? 'all' : 'fall')} className="rounded-full" />
            </div>

            <div className="w-[1px] h-6 bg-[#3F3F3F]/60 hidden md:block mx-2" />

            <div className="flex flex-wrap gap-2">
              {PROGRAM_FILTER_ORDER.map((key) => (
                <FilterChip
                  key={key}
                  label={programFilterLabels[key]}
                  isActive={selectedProgram === key}
                  onClick={() => setSelectedProgram(selectedProgram === key && key !== 'all' ? 'all' : key)}
                  className="rounded-full"
                />
              ))}
            </div>

            {hasActiveFilters && (
              <button onClick={clearFilters} className="ml-auto text-sm text-[#41C9C1] hover:underline font-medium cursor-pointer">
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative px-6 md:px-16 lg:px-24 py-16 md:py-24 min-h-[50vh]">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-24">
          <AnimatePresence>
            {filteredData.length > 0 ? (
              filteredData.map((data) => {
                const semesterLabel = data.semester === 'spring' ? 'Spring' : 'Fall';
                const yearLabel = data.year.toString().slice(-2);

                return (
                  <motion.div
                    key={`${data.semester}-${data.year}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 850px' }}
                  >
                    <FadeUp>
                      <h2 className="sub-section-title text-[#DBDBDB] mb-8 md:mb-12 text-center">
                        <TextAnimate as="span" animation="slideLeft" by="character" className="inline" startOnView={true} once={true}>
                          {`${semesterLabel} '${yearLabel}`}
                        </TextAnimate>
                      </h2>
                    </FadeUp>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                      {data.teamGroups.map((group, gi) => {
                        const cfg = teamConfig[group.team];
                        return (
                          <div key={group.team} className="flex flex-col gap-6">
                            <FadeUp delay={gi * 0.08}>
                              <h3
                                className="text-xl font-medium tracking-widest mb-4"
                                style={{ color: cfg.color }}
                              >
                                {cfg.label}
                              </h3>
                            </FadeUp>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {group.members.map((member) => (
                                <TeamMemberCard
                                  key={member.key}
                                  name={member.name}
                                  className="rounded-2xl"
                                />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-[#DBDBDB]/70">No teams found for the selected filters.</p>
                <button onClick={clearFilters} className="mt-4 text-[#41C9C1] hover:underline font-medium cursor-pointer">
                  Clear filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <JoinUsSection newsletterSource="people-past-teams" />
    </div>
  );
}
