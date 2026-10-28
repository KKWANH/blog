import { Network, RotateCcw, Cable, Globe, Binary, Boxes, Terminal, GitBranch, PenTool, CodeXml, Coffee, ChartNoAxesCombined, BrainCircuit, Wrench, Car, Gamepad2 } from 'lucide-react'

const marks: Record<string, string> = {
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
  figma: '/brands/figma.svg',
  qt: '/brands/qt.svg',
  nginx: '/brands/nginx.svg',
  compose: '/brands/docker.svg',
  django: '/brands/django.svg',
  numpy: '/brands/numpy.svg',
  pandas: '/brands/pandas.svg',
  sklearn: '/brands/scikitlearn.svg',
  unity: '/brands/unity.svg',
  html: '/brands/html5.svg',
  css: '/brands/css.svg',
  raspberrypi: '/brands/raspberrypi.svg',
  shell: '/brands/gnubash.svg',
}

export function CareerIcon({ skill, className, size }: { skill: string; className?: string; size?: number }) {
  const source = marks[skill]
  const concepts = {
    interfaces: Network,
    recovery: RotateCcw,
    websocket: Cable,
    rest: Globe,
    asm: Binary,
    can: Cable,
    dbus: GitBranch,
    containers: Boxes,
    processes: Terminal,
    threads: Network,
    http: Globe,
    'ui-design': PenTool,
    csharp: CodeXml,
    java: Coffee,
    matplotlib: ChartNoAxesCombined,
    mne: BrainCircuit,
    make: Wrench,
    qmake: Wrench,
    carla: Car,
    minilibx: Gamepad2,
    raycasting: Boxes,
  }
  const Icon = concepts[skill as keyof typeof concepts] ?? Network
  const style = size ? { width: `${size}px`, height: `${size}px`, flex: `0 0 ${size}px` } : undefined
  const iconPixel = size ? Math.round(size * 0.72) : 16
  return (
    <span
      className={`career-icon ${source ? 'career-brand-icon' : 'career-concept-icon'} ${className ?? ''}`}
      data-skill={skill}
      style={style}
      aria-hidden="true"
    >
      {source ? (
        <img src={source} width={iconPixel} height={iconPixel} alt="" />
      ) : (
        <Icon style={{ width: `${iconPixel}px`, height: `${iconPixel}px` }} />
      )}
    </span>
  )
}
