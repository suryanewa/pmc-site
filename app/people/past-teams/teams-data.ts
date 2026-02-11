export type Team =
  | 'product-team'
  | 'mentorship-intro'
  | 'mentorship-advanced'
  | 'grad-bootcamp'
  | 'case-comp';

/** High-level grouping used by the filter bar. */
export type ProgramFilter =
  | 'all'
  | 'product-team'
  | 'mentorship'
  | 'grad-bootcamp'
  | 'case-comp';

export interface TeamMember {
  name: string;
  team: Team;
}

export interface SemesterData {
  semester: 'spring' | 'fall';
  year: number;
  members: TeamMember[];
}

/** Visual config per team value. */
export const teamConfig: Record<Team, { label: string; color: string }> = {
  'product-team': { label: 'Product Team', color: '#41C9C1' },
  'mentorship-advanced': { label: 'Advanced Mentorship', color: '#5076DD' },
  'mentorship-intro': { label: 'Intro Mentorship', color: '#6966E3' },
  'grad-bootcamp': { label: 'Grad Bootcamp', color: '#41C9C1' },
  'case-comp': { label: 'Case Comp Winners', color: '#D4A843' },
};

/** Maps a ProgramFilter to the Team values it covers. */
export const programFilterTeams: Record<ProgramFilter, Team[] | 'all'> = {
  all: 'all',
  'product-team': ['product-team'],
  mentorship: ['mentorship-intro', 'mentorship-advanced'],
  'grad-bootcamp': ['grad-bootcamp'],
  'case-comp': ['case-comp'],
};

export const programFilterLabels: Record<ProgramFilter, string> = {
  all: 'All Programs',
  'product-team': 'Product Team',
  mentorship: 'Mentorship',
  'grad-bootcamp': 'Grad Bootcamp',
  'case-comp': 'Case Comp',
};

export const teamsData: SemesterData[] = [
  // ── Fall 2025 ──────────────────────────────────────────────────
  {
    semester: 'fall',
    year: 2025,
    members: [
      // Product Team — Cohort 3
      { name: 'Emily Silkina', team: 'product-team' },
      { name: 'Prateek Nedungadi', team: 'product-team' },
      { name: 'Valerie Zou', team: 'product-team' },
      { name: 'Daniel Liang', team: 'product-team' },
      { name: 'Tarush Garg', team: 'product-team' },
      { name: 'Gavin Zhou', team: 'product-team' },
      { name: 'Theresa Yung', team: 'product-team' },
      { name: 'Pranava Manthena', team: 'product-team' },
      // Intro Mentorship
      { name: 'Minsung Kim', team: 'mentorship-intro' },
      { name: 'Jack Knudsen', team: 'mentorship-intro' },
      { name: 'Ella Zhao', team: 'mentorship-intro' },
      { name: 'Anya Bose', team: 'mentorship-intro' },
      { name: 'Shivam Saxena', team: 'mentorship-intro' },
      { name: 'Sophia Xu', team: 'mentorship-intro' },
      { name: 'Peter Ma', team: 'mentorship-intro' },
      { name: 'Noa Yaron', team: 'mentorship-intro' },
      { name: 'Eric Li', team: 'mentorship-intro' },
      { name: "Cailin O'Connell", team: 'mentorship-intro' },
      // Advanced Mentorship
      { name: 'Jaik Tom', team: 'mentorship-advanced' },
      { name: 'Arnava Dekhne', team: 'mentorship-advanced' },
      { name: 'Harrison Wong', team: 'mentorship-advanced' },
      { name: 'Hemaang Patkar', team: 'mentorship-advanced' },
      { name: 'Praagna Prasad Mokshagundam', team: 'mentorship-advanced' },
      { name: 'Ada Cai', team: 'mentorship-advanced' },
      { name: 'Jade Leong', team: 'mentorship-advanced' },
      { name: 'Ian Davoren', team: 'mentorship-advanced' },
      { name: 'Mohiuddin Syed', team: 'mentorship-advanced' },
      { name: 'Ethan Lu', team: 'mentorship-advanced' },
      { name: 'Phoebe Kim', team: 'mentorship-advanced' },
      // Grad Bootcamp — Cohort 1
      { name: 'Chloe Kim', team: 'grad-bootcamp' },
      { name: 'Dheeraj Maske', team: 'grad-bootcamp' },
      { name: 'Nawal Mahmood', team: 'grad-bootcamp' },
      { name: 'Chirag Dhiwar', team: 'grad-bootcamp' },
      { name: 'Tansin Taj', team: 'grad-bootcamp' },
      { name: 'Justin Seymour-Welch', team: 'grad-bootcamp' },
      { name: 'Michael Tirone', team: 'grad-bootcamp' },
      { name: 'Shravani Dorlikar', team: 'grad-bootcamp' },
      { name: 'Tanvish Tuplondhe', team: 'grad-bootcamp' },
      // Case Comp Winners
      { name: 'Ryan Mehta', team: 'case-comp' },
      { name: 'Surya Newa', team: 'case-comp' },
      { name: 'Sean Park', team: 'case-comp' },
      { name: 'Xander Wanagel', team: 'case-comp' },
    ],
  },

  // ── Spring 2025 ────────────────────────────────────────────────
  {
    semester: 'spring',
    year: 2025,
    members: [
      // Product Team — Cohort 2
      { name: 'Sean Hu', team: 'product-team' },
      { name: 'Eason Wang', team: 'product-team' },
      { name: 'Danny Konovalov', team: 'product-team' },
      { name: 'Aashin Singhal', team: 'product-team' },
      { name: 'Serena Hu', team: 'product-team' },
      { name: 'Nitya Garg', team: 'product-team' },
      { name: 'Vivien Wang', team: 'product-team' },
      { name: 'Arehant Arun', team: 'product-team' },
      // Advanced Mentorship
      { name: 'Kevin Huang', team: 'mentorship-advanced' },
      { name: 'Nevan Samaraweera', team: 'mentorship-advanced' },
      { name: 'Nicole Wu', team: 'mentorship-advanced' },
      { name: 'Alessandro Monke', team: 'mentorship-advanced' },
      { name: 'Nicholai Kudriashov', team: 'mentorship-advanced' },
      { name: 'Katie Tso', team: 'mentorship-advanced' },
      { name: 'Namratha Shivani Nuthi', team: 'mentorship-advanced' },
      { name: 'Ananya Thota', team: 'mentorship-advanced' },
      { name: 'Niranjana Rau', team: 'mentorship-advanced' },
      // Intro Mentorship
      { name: 'Tanvi Bethi', team: 'mentorship-intro' },
      { name: 'Athul Radhakrishnan', team: 'mentorship-intro' },
      { name: 'Suhawni Narang', team: 'mentorship-intro' },
      { name: 'Eva Ma', team: 'mentorship-intro' },
      { name: 'Janhavi Tambe', team: 'mentorship-intro' },
      { name: 'Hien Nguyen', team: 'mentorship-intro' },
      { name: 'Adam Chang', team: 'mentorship-intro' },
      { name: 'Diya Hegde', team: 'mentorship-intro' },
      // Case Comp Winners
      { name: 'Justin He', team: 'case-comp' },
      { name: 'Satvik Shrivastava', team: 'case-comp' },
      { name: 'Aashin Singhal', team: 'case-comp' },
      { name: 'Brian Zhou', team: 'case-comp' },
    ],
  },

  // ── Fall 2024 ──────────────────────────────────────────────────
  {
    semester: 'fall',
    year: 2024,
    members: [
      // Product Team — Cohort 1
      { name: 'Soumya Medapati', team: 'product-team' },
      { name: 'Nihar Bagkar', team: 'product-team' },
      { name: 'Joshua Lee', team: 'product-team' },
      { name: 'Nicole Wu', team: 'product-team' },
      { name: 'Usman Abdullah', team: 'product-team' },
      { name: 'Arnav Sastry', team: 'product-team' },
      { name: 'Iris Zhuang', team: 'product-team' },
      { name: 'Siya Jain', team: 'product-team' },
      { name: 'Hendrix Farrell', team: 'product-team' },
      { name: 'Maggie Lu', team: 'product-team' },
      // Case Comp Winners
      { name: 'AnMei Deck', team: 'case-comp' },
      { name: 'Anita Gao', team: 'case-comp' },
      { name: 'Maggie Lu', team: 'case-comp' },
      { name: 'Arnav Sastry', team: 'case-comp' },
    ],
  },

  // ── Spring 2024 ────────────────────────────────────────────────
  {
    semester: 'spring',
    year: 2024,
    members: [],
  },

  // ── Fall 2023 ──────────────────────────────────────────────────
  {
    semester: 'fall',
    year: 2023,
    members: [],
  },

  // ── Spring 2023 ────────────────────────────────────────────────
  {
    semester: 'spring',
    year: 2023,
    members: [],
  },

  // ── Fall 2022 ──────────────────────────────────────────────────
  {
    semester: 'fall',
    year: 2022,
    members: [],
  },

  // ── Spring 2022 ────────────────────────────────────────────────
  {
    semester: 'spring',
    year: 2022,
    members: [],
  },

  // ── Fall 2021 ──────────────────────────────────────────────────
  {
    semester: 'fall',
    year: 2021,
    members: [],
  },
];
