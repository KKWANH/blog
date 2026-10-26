/** Selected project copy for the homepage. */

export type Project = {
  id: string
  name: string
  description: string
  details: string
  category: 'Personal project' | 'Team project' | 'AI-built experiment'
  year?: string
  status?: string
  href: string
  source?: string
  stack: string[]
  /** Identity visual rendered as the card's hero block. */
  visual: 'earprint' | 'ariadne' | 'color-saves-life'
}

export const projects: Project[] = [
  {
    id: 'ariadne',
    name: 'Ariadne',
    description:
      'An AI-built document workspace I configured. Kept here as an experiment, with development on hold.',
    details:
      'I directed the AI and assembled the configuration. The implementation was generated with AI; this project is not a claim of retrieval-system or RAG expertise.',
    category: 'AI-built experiment',
    year: '2026',
    status: 'On hold',
    href: '/projects/ariadne',
    source: 'https://github.com/KKWANH/ai-assistant',
    stack: ['AI-directed build', 'Configuration'],
    visual: 'ariadne',
  },
  {
    id: 'earprint',
    name: 'Earprint',
    description:
      'Explore a YouTube Music library through artists, listening patterns and recommendations.',
    details:
      'A Chrome extension imports music-library data. The Next.js application combines it with music metadata and recommendations for exploring related artists.',
    category: 'Personal project',
    status: 'On hold',
    href: '/projects/earprint',
    stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Chrome extension'],
    visual: 'earprint',
  },
  {
    id: 'color-saves-life',
    name: 'Color Saves Life',
    description:
      'First place in the digital.auto & mobility challenge at BCX 2024. A team prototype using eye-tracking and simulation.',
    details:
      'The team used ROS 2 and Gazebo as the simulation environment. Separate Python plugins handled image-processing features in the client.',
    category: 'Team project',
    year: 'BCX 2024',
    status: 'Track winner',
    href: '/projects/color-saves-life',
    source: 'https://github.com/KKWANH/ColorSavesLife',
    stack: ['Python', 'ROS 2', 'Gazebo'],
    visual: 'color-saves-life',
  },
]

export const externalLinks = {
  github: 'https://github.com/KKWANH',
  linkedin: 'https://www.linkedin.com/in/kwanhokim',
  instagram: 'https://instagram.com/kwanho._kim',
  email: 'mailto:contact@kwanho.dev',
  cv: '/CV.pdf',
  cvLabel: 'CV (PDF)',
} as const
