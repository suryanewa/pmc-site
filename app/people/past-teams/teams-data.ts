export type Team =
  | 'startup'
  | 'investing'
  | 'product-team'
  | 'mentorship-intro'
  | 'mentorship-advanced'
  | 'grad-bootcamp'
  | 'case-comp';

/** High-level grouping used by the filter bar. */
export type ProgramFilter =
  | 'all'
  | 'eir'
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
  startup: { label: 'Startup', color: '#5076DD' },
  investing: { label: 'Investing', color: '#6966E3' },
  'product-team': { label: 'Product Team', color: '#41C9C1' },
  'mentorship-advanced': { label: 'Mentorship — Advanced', color: '#5076DD' },
  'mentorship-intro': { label: 'Mentorship — Intro', color: '#6966E3' },
  'grad-bootcamp': { label: 'Grad Bootcamp', color: '#41C9C1' },
  'case-comp': { label: 'Case Comp Winners', color: '#D4A843' },
};

/** Maps a ProgramFilter to the Team values it covers. */
export const programFilterTeams: Record<ProgramFilter, Team[] | 'all'> = {
  all: 'all',
  eir: ['startup', 'investing'],
  'product-team': ['product-team'],
  mentorship: ['mentorship-intro', 'mentorship-advanced'],
  'grad-bootcamp': ['grad-bootcamp'],
  'case-comp': ['case-comp'],
};

export const programFilterLabels: Record<ProgramFilter, string> = {
  all: 'All Programs',
  eir: 'EIR Teams',
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
      // EIR — Startup
      { name: 'Mihir Ganesan', team: 'startup' },
      { name: 'Katherine Graci', team: 'startup' },
      { name: 'Jessie Lee', team: 'startup' },
      { name: 'Maggie Lu', team: 'startup' },
      { name: 'Surya Newa', team: 'startup' },
      { name: 'Pranav Sarma', team: 'startup' },
      { name: 'Xander Wanagel', team: 'startup' },
      // EIR — Investing
      { name: 'Anup Banerjee', team: 'investing' },
      { name: 'Mitch Cahill', team: 'investing' },
      { name: 'Neel Khurana', team: 'investing' },
      { name: 'Shray Patel', team: 'investing' },
      { name: 'Eric Tao', team: 'investing' },
      { name: 'Priscilla Tu', team: 'investing' },
      // Product Team — Cohort 3
      { name: 'Emily Silkina', team: 'product-team' },
      { name: 'Prateek Nedungadi', team: 'product-team' },
      { name: 'Valerie Zou', team: 'product-team' },
      { name: 'Daniel Liang', team: 'product-team' },
      { name: 'Tarush Garg', team: 'product-team' },
      { name: 'Gavin Zhou', team: 'product-team' },
      { name: 'Theresa Yung', team: 'product-team' },
      { name: 'Pranava Manthena', team: 'product-team' },
      // Mentorship — Intro
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
      // Mentorship — Advanced
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
      // EIR — Startup
      { name: 'Andi Jegeni', team: 'startup' },
      { name: 'Danny Konovalov', team: 'startup' },
      { name: 'Nihar Bagkar', team: 'startup' },
      { name: 'Zaara Israni', team: 'startup' },
      { name: 'Abhiviraj Goel', team: 'startup' },
      { name: 'Yvette Bu', team: 'startup' },
      { name: 'Suriya Gnanasundar', team: 'startup' },
      { name: 'Brian Dai', team: 'startup' },
      // EIR — Investing
      { name: 'Zachary Semple', team: 'investing' },
      { name: 'Yash Pandya', team: 'investing' },
      { name: 'Michael Que', team: 'investing' },
      { name: 'Ein Sel', team: 'investing' },
      // Product Team — Cohort 2
      { name: 'Sean Hu', team: 'product-team' },
      { name: 'Eason Wang', team: 'product-team' },
      { name: 'Danny Konovalov', team: 'product-team' },
      { name: 'Aashin Singhal', team: 'product-team' },
      { name: 'Serena Hu', team: 'product-team' },
      { name: 'Nitya Garg', team: 'product-team' },
      { name: 'Vivien Wang', team: 'product-team' },
      { name: 'Arehant Arun', team: 'product-team' },
      // Mentorship — Advanced
      { name: 'Kevin Huang', team: 'mentorship-advanced' },
      { name: 'Nevan Samaraweera', team: 'mentorship-advanced' },
      { name: 'Nicole Wu', team: 'mentorship-advanced' },
      { name: 'Alessandro Monke', team: 'mentorship-advanced' },
      { name: 'Nicholai Kudriashov', team: 'mentorship-advanced' },
      { name: 'Katie Tso', team: 'mentorship-advanced' },
      { name: 'Namratha Shivani Nuthi', team: 'mentorship-advanced' },
      { name: 'Ananya Thota', team: 'mentorship-advanced' },
      { name: 'Niranjana Rau', team: 'mentorship-advanced' },
      // Mentorship — Intro
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
      // EIR — Startup
      { name: 'Benedict Marco Kosasih', team: 'startup' },
      { name: 'Bhoomika Navandar', team: 'startup' },
      { name: 'Lia Kostas', team: 'startup' },
      { name: 'Rifa Gowani', team: 'startup' },
      { name: 'Ronak Vusirikala', team: 'startup' },
      { name: 'Soumya Medapati', team: 'startup' },
      // EIR — Investing
      { name: 'Ivan Silkin', team: 'investing' },
      { name: 'Jai Tamboli', team: 'investing' },
      { name: 'Nicole Hwang', team: 'investing' },
      { name: 'Sophia Chen', team: 'investing' },
      // Product Team — Cohort 1
      { name: 'Soumya', team: 'product-team' },
      { name: 'Iris', team: 'product-team' },
      { name: 'Nihar', team: 'product-team' },
      { name: 'Siya', team: 'product-team' },
      { name: 'Joshua', team: 'product-team' },
      { name: 'Hendrix', team: 'product-team' },
      { name: 'Nicole', team: 'product-team' },
      { name: 'Evan', team: 'product-team' },
      { name: 'Usman', team: 'product-team' },
      { name: 'Maggie', team: 'product-team' },
      { name: 'Arnav', team: 'product-team' },
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
    members: [
      { name: 'Brian Zhou', team: 'startup' },
      { name: 'Evan Hitchcock', team: 'startup' },
      { name: 'Evan Liu', team: 'startup' },
      { name: 'Andrew Dinasan', team: 'investing' },
      { name: 'Evan Tian', team: 'investing' },
      { name: 'Mikhail Bond', team: 'investing' },
    ],
  },

  // ── Fall 2023 ──────────────────────────────────────────────────
  {
    semester: 'fall',
    year: 2023,
    members: [
      { name: 'Dustin He', team: 'startup' },
      { name: 'Marianna Hincapie', team: 'startup' },
      { name: 'Paul Chan', team: 'startup' },
      { name: 'Zoë Applebaum', team: 'startup' },
      { name: 'Brielee Lu', team: 'investing' },
      { name: 'Fred Rohn', team: 'investing' },
      { name: 'Kailani Liu', team: 'investing' },
      { name: 'Sebastian Strässer', team: 'investing' },
    ],
  },

  // ── Spring 2023 ────────────────────────────────────────────────
  {
    semester: 'spring',
    year: 2023,
    members: [
      { name: 'Ignacio Beangii', team: 'startup' },
      { name: 'Marcelo Barrera', team: 'startup' },
      { name: 'Sriya Chekuri', team: 'startup' },
      { name: 'Yangyang Lai', team: 'investing' },
      { name: 'Advait Abrol', team: 'investing' },
      { name: 'Augustine Breeze', team: 'investing' },
      { name: 'Jessica Yu', team: 'investing' },
      { name: 'Nathan Lee', team: 'investing' },
    ],
  },

  // ── Fall 2022 ──────────────────────────────────────────────────
  {
    semester: 'fall',
    year: 2022,
    members: [
      { name: 'Aditi Baghel', team: 'startup' },
      { name: 'Akshat Chavan Patil', team: 'startup' },
      { name: 'Bianca Ashar', team: 'startup' },
      { name: 'Kiran Kashyap', team: 'startup' },
      { name: 'Ishaan Poojari', team: 'startup' },
      { name: 'Tao Xie', team: 'startup' },
      { name: 'Sofia Ortiz', team: 'startup' },
      { name: 'Andrew Berube', team: 'startup' },
      { name: 'Deyan Kassev', team: 'investing' },
      { name: 'Duncan Scott', team: 'investing' },
      { name: 'Jess Wang', team: 'investing' },
      { name: 'Kathy Cao', team: 'investing' },
    ],
  },

  // ── Spring 2022 ────────────────────────────────────────────────
  {
    semester: 'spring',
    year: 2022,
    members: [
      { name: 'Aditi Kanaujia', team: 'startup' },
      { name: 'Akshat Jain', team: 'startup' },
      { name: 'Amber Liang', team: 'startup' },
      { name: 'Amolak Kumar', team: 'startup' },
      { name: 'Ava Keresztes', team: 'startup' },
      { name: 'Justin Tong', team: 'startup' },
      { name: 'Kevin Pichardo-Cedillo', team: 'startup' },
      { name: 'Krish Bajaj', team: 'startup' },
      { name: 'Preetham Prince', team: 'startup' },
      { name: 'Rayna Shah', team: 'startup' },
      { name: 'Renee Wu', team: 'startup' },
      { name: 'Ayeeshi Champaneria', team: 'investing' },
      { name: 'Megan Li', team: 'investing' },
      { name: 'Michelle Ankunda', team: 'investing' },
      { name: 'Nathan Ju', team: 'investing' },
      { name: 'Niklas Ng', team: 'investing' },
      { name: 'Niyanth Thatta', team: 'investing' },
      { name: 'Orisa Thanajaro', team: 'investing' },
    ],
  },

  // ── Fall 2021 ──────────────────────────────────────────────────
  {
    semester: 'fall',
    year: 2021,
    members: [
      { name: 'Alex Talamonti', team: 'startup' },
      { name: 'Aneesh Kethini', team: 'startup' },
      { name: 'Kayln Kwan', team: 'startup' },
      { name: 'Koko Xu', team: 'startup' },
      { name: 'Michael Shen', team: 'startup' },
      { name: 'Rafed Abbassi', team: 'startup' },
      { name: 'Rishi Gowda', team: 'startup' },
      { name: 'Sparsh Kabra', team: 'startup' },
      { name: 'Alan Chen', team: 'investing' },
      { name: 'Brian Xiao', team: 'investing' },
      { name: 'David Towers', team: 'investing' },
      { name: 'Emily Wang', team: 'investing' },
      { name: 'James Austin', team: 'investing' },
      { name: 'Joseph Wang', team: 'investing' },
      { name: 'Justin Chen', team: 'investing' },
      { name: 'Nathan Chong', team: 'investing' },
      { name: 'Proby Shandilya', team: 'investing' },
      { name: 'Rachel Cheng', team: 'investing' },
      { name: 'Ronak Shah', team: 'investing' },
    ],
  },
];
