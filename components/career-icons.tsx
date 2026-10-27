import { Network, RotateCcw, Cable, Globe } from 'lucide-react'
import type { CareerSkill } from '@/lib/profile'

const marks: Partial<Record<CareerSkill, string>> = {
  cpp: '/brands/cplusplus.svg',
  c: '/brands/c.svg',
  python: '/brands/python.svg',
  javascript: '/brands/javascript.svg',
  typescript: '/brands/typescript.svg',
  react: '/brands/react.svg',
  ros: '/brands/ros.svg',
  git: '/brands/git.svg',
  docker: '/brands/docker.svg',
  linux: '/brands/linux.svg',
}

export function CareerIcon({ skill, className }: { skill: CareerSkill; className?: string }) {
  const source = marks[skill]
  const Icon = skill === 'interfaces' ? Network : skill === 'websocket' ? Cable : skill === 'rest' ? Globe : RotateCcw
  return <span className={`career-icon ${source ? 'career-brand-icon' : 'career-concept-icon'} ${className ?? ''}`} data-skill={skill} aria-hidden="true">
    {source ? <img src={source} width="24" height="24" alt="" /> : <Icon />}
  </span>
}
