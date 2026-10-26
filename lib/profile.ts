export const profile = {
  name: 'Kwanho Kim',
  role: 'C++ Software Engineer',
  location: 'Leuven, Belgium',
  introduction:
    'C++ engineer at KLA, working on device software and lifter error recovery.',
  contact: 'contact@kwanho.dev',
  linkedin: 'https://www.linkedin.com/in/kwanhokim',
  github: 'https://github.com/KKWANH',
} as const

export const experience = [
  {
    company: 'KLA',
    period: 'Aug 2026–Present',
    role: 'C++ Engineer',
    location: 'Leuven, Belgium',
    field: 'ICOS Division · Zeta team',
    description:
      'Lifter error recovery, camera settings and device-control software. Current lifter work is in analysis, design and early implementation with team review.',
    details: [
      'Analyse lifter fault recovery and design changes across application and controller software; early implementation is in progress with team review.',
      'Work on camera white-balance settings and device readback.',
      'Refactor serial device-control integration and logging in a shared equipment layer.',
    ],
  },
  {
    company: 'Pickit 3D',
    period: 'Aug 2025–Mar 2026',
    role: 'Research & Software Engineer',
    location: 'Leuven, Belgium',
    field: 'System design & integration',
    description:
      'System design and integration for robotic-vision software, focused on communication interfaces and failure handling.',
    details: [
      'Worked on system design and integration around communication interfaces, reconnect behaviour and message validation.',
      'Traced a field connection failure to a port conflict and implemented the fix.',
      'Designed a Python WebSocket client with reconnect, backoff and message validation for internal integrations.',
    ],
  },
  {
    company: 'Bosch',
    period: 'Jun–Nov 2024',
    role: 'V2X Communication Intern',
    location: 'Hildesheim, Germany',
    field: 'Vehicle communication',
    description:
      'A V2X communication demonstrator and an operator interface for an eBike safety prototype.',
    details: [
      'Built a vehicle-to-everything demonstrator, defined message interfaces and checked end-to-end behaviour in test runs.',
      'Integrated communication modules and developed a React interface for an eBike safety prototype.',
    ],
  },
] as const

export const education = [
  { subject: 'Mechatronics', institution: 'Korea National Open University, Prime College', period: '2026–Present', status: "Bachelor's degree in progress" },
  { subject: 'Artificial Intelligence', institution: 'Korea National Open University', period: '2023–2025', status: "Bachelor's degree awarded" },
  { subject: 'Computer Engineering', institution: 'Academic Credit Bank System', period: '2019–2020', status: "Bachelor's degree awarded" },
  { subject: 'Business Administration', institution: 'Academic Credit Bank System', period: '2019–2022', status: "Bachelor's degree awarded" },
] as const

export const recruiterBrief = [
  'Kwanho Kim — C++ Software Engineer',
  'Leuven, Belgium | contact@kwanho.dev | https://kwanho.dev',
  '',
  'Focus: C++ systems development, error recovery and software integration.',
  'KLA, ICOS Division / Zeta team — C++ Engineer, Aug 2026–Present.',
  'Current lifter work: problem analysis, design and early implementation with team review.',
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
