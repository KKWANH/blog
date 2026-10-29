export const profile = {
  name: 'Kwanho Kim',
  role: 'Software Engineer',
  focus: 'Device software & machine interfaces',
  location: 'Leuven, Belgium',
  introduction:
    'Software engineer at KLA, working on device software, machine interfaces and failure recovery.',
  contact: 'contact@kwanho.dev',
  linkedin: 'https://www.linkedin.com/in/kwanhokim',
  github: 'https://github.com/KKWANH',
} as const

export const experience = [
  {
    id: 'kla',
    start: '2026-08',
    end: null,
    skills: ['cpp', 'interfaces', 'recovery'],
    company: 'KLA',
    period: 'Aug 2026–Present',
    role: 'C++ Engineer',
    location: 'Leuven, Belgium',
    field: 'ICOS Division · Zeta team',
    description:
      'C++ device software for semiconductor inspection equipment: lifter fault recovery, camera settings and serial device control.',
    details: [
      'Designing and implementing fault recovery for the equipment’s lift mechanism in C++, with team review (in progress).',
      'Exposed the camera’s device-reported white-balance settings in the operator UI.',
      'Refactored serial device control and logging into a shared equipment layer.',
    ],
  },
  {
    id: 'pickit',
    start: '2025-08',
    end: '2026-03',
    skills: ['python', 'interfaces', 'recovery', 'websocket', 'react'],
    company: 'Pickit 3D',
    period: 'Aug 2025–Mar 2026',
    role: 'Research & Software Engineer',
    location: 'Leuven, Belgium',
    field: 'System design & integration',
    description:
      'Integration software for an industrial robot-vision system: communication interfaces, failure handling and field diagnosis.',
    details: [
      'Traced a field communication failure to a port conflict, shipped the fix and documented checks against recurrence.',
      'Built a reusable Python WebSocket client with reconnect, backoff and message validation, shared across internal tools.',
      'Built a timezone-aware log download and conversion workflow with a multilingual UI for incident triage.',
      'Developed system and network configuration screens with input validation and safe defaults.',
    ],
  },
  {
    id: 'bosch',
    start: '2024-06',
    end: '2024-11',
    skills: ['interfaces', 'react'],
    company: 'Bosch',
    period: 'Jun–Nov 2024',
    role: 'V2X Communication Intern',
    location: 'Hildesheim, Germany',
    field: 'Vehicle communication',
    description:
      'A V2X communication demonstrator and an operator interface for an eBike safety prototype.',
    details: [
      'Built a V2X demonstrator for safety-critical scenarios; defined message interfaces and validated end-to-end behaviour in test runs.',
      'Integrated communication modules behind explicit data contracts between components.',
      'Built the operator interface for an eBike safety prototype in React.',
    ],
  },
] as const

export const education = [
  { id: 'mechatronics', start: '2026-02', end: null, subject: 'Mechatronics', institution: 'Korea National Open University, Prime College', period: 'Feb 2026–Present', status: "Bachelor's degree in progress" },
  { id: 'ai-degree', start: '2023-03', end: '2025-02', subject: 'Artificial Intelligence', institution: 'Korea National Open University', period: '2023–2025', status: "Bachelor's degree awarded" },
  { id: 'computer-degree', start: '2019-04', end: '2020-08', subject: 'Computer Engineering', institution: 'Academic Credit Bank System', period: '2019–2020', status: "Bachelor's degree awarded" },
  { id: 'business-degree', start: '2019-04', end: '2022-08', subject: 'Business Administration', institution: 'Academic Credit Bank System', period: '2019–2022', status: "Bachelor's degree awarded" },
] as const

export type CareerSkill = string
export type CareerSkillGroup = string

export const projectSkillIds: readonly CareerSkill[] = ['python', 'interfaces', 'ros', 'git', 'docker', 'linux']

export const recruiterBrief = [
  'Kwanho Kim - Software Engineer',
  'Leuven, Belgium | contact@kwanho.dev | https://kwanho.dev',
  '',
  'Focus: C++ systems development, error recovery and software integration.',
  'KLA, ICOS Division / Zeta team — C++ Engineer, Aug 2026–Present.',
  'Current work: designing and implementing lifter fault recovery in C++, with team review.',
  'Pickit 3D — Research & Software Engineer, Aug 2025–Mar 2026.',
  'Bosch — V2X Communication Intern, Jun–Nov 2024.',
  '',
  "Awarded bachelor's degrees in Computer Engineering, AI and Business Administration.",
  "Mechatronics bachelor's in progress at KNOU Prime College. 42 and SEA:ME completed.",
  'BCX 2024: first place in the digital.auto & mobility challenge, with Color Saves Life.',
  '',
  'CV: https://kwanho.dev/CV.pdf',
  'LinkedIn: https://www.linkedin.com/in/kwanhokim',
].join('\n')
