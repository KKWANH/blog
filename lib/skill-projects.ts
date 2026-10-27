import type { CareerSkill } from '@/lib/profile'

export type SkillProject = {
  id: string
  title: string
  category: string
  year: string
  description: string
  skills: readonly CareerSkill[]
  href: string
  details: Array<{ label: string; href: string }>
}

export const skillProjects: SkillProject[] = [
  {
    id: 'containers', title: 'ft_containers', category: '42 C++ project', year: '2022',
    description: 'Vector, stack and an AVL-tree-backed map, with custom iterators. The repository includes comparisons against standard containers.',
    skills: ['cpp', 'containers'],
    href: 'https://github.com/KKWANH/ft_containers',
    details: [
      { label: 'Vector implementation', href: 'https://github.com/KKWANH/ft_containers/blob/40d52a84fcbdb5b3d02adbe2d8c3a10ad6e7bde6/includes/vector.hpp' },
      { label: 'AVL tree and rotations', href: 'https://github.com/KKWANH/ft_containers/blob/40d52a84fcbdb5b3d02adbe2d8c3a10ad6e7bde6/includes/Tree.hpp' },
      { label: 'Iterator types', href: 'https://github.com/KKWANH/ft_containers/blob/40d52a84fcbdb5b3d02adbe2d8c3a10ad6e7bde6/includes/iterators.hpp' },
    ],
  },
  {
    id: 'webserv', title: 'webserv', category: '42 team project', year: '2022',
    description: 'A C++ HTTP-server team repository. Public source shows socket handling, HTTP messages and kqueue-driven event processing.',
    skills: ['cpp', 'http', 'interfaces'],
    href: 'https://github.com/KKWANH/webserv',
    details: [
      { label: 'Socket handling', href: 'https://github.com/KKWANH/webserv/blob/fbceda5266b69a9eca37504fc7850e33b2fef90f/SocketController/SocketController.cpp' },
      { label: 'Kernel event queue', href: 'https://github.com/KKWANH/webserv/blob/fbceda5266b69a9eca37504fc7850e33b2fef90f/KernelQueueController/KernelQueueController.cpp' },
      { label: 'Team and project notes', href: 'https://github.com/KKWANH/webserv/tree/fbceda5266b69a9eca37504fc7850e33b2fef90f' },
    ],
  },
  {
    id: 'minishell', title: 'Minishell', category: '42 C project', year: '2021',
    description: 'Shell implementation practice covering process execution, pipes, redirection and signal handling.',
    skills: ['c', 'processes'],
    href: 'https://github.com/KKWANH/42_minishell',
    details: [
      { label: 'Process execution and pipes', href: 'https://github.com/KKWANH/42_minishell/blob/988e62ffd4fac60a7c993beae4bf089f31209bcf/srcs/exe.c' },
      { label: 'Redirection', href: 'https://github.com/KKWANH/42_minishell/blob/988e62ffd4fac60a7c993beae4bf089f31209bcf/srcs/redir.c' },
      { label: 'Signals', href: 'https://github.com/KKWANH/42_minishell/blob/988e62ffd4fac60a7c993beae4bf089f31209bcf/srcs/signal.c' },
    ],
  },
  {
    id: 'philosophers', title: 'Philosophers', category: '42 C/pthreads project', year: '2021',
    description: 'Thread coordination and shared-state practice using pthread mutexes and monitoring.',
    skills: ['c', 'threads'],
    href: 'https://github.com/KKWANH/42Philosopher',
    details: [
      { label: 'Mutex locking and coordination', href: 'https://github.com/KKWANH/42Philosopher/blob/4b44ab65bb5eb96bad96d8ca8b0f8ce494a50504/srcs/start.c' },
      { label: 'Initialization', href: 'https://github.com/KKWANH/42Philosopher/blob/4b44ab65bb5eb96bad96d8ca8b0f8ce494a50504/srcs/init.c' },
    ],
  },
  {
    id: 'cluster', title: 'PiRacer instrument cluster', category: 'SEA:ME team prototype', year: '2023',
    description: 'Qt/QML interface and D-Bus signal-receiver work. The team project describes speed data arriving over CAN.',
    skills: ['qt', 'dbus', 'can'],
    href: 'https://github.com/KKWANH/DES_Instrument-Cluster',
    details: [
      { label: 'Qt application and D-Bus receiver', href: 'https://github.com/KKWANH/DES_Instrument-Cluster/blob/b3556e7d5ad7f8525b4090832dd4f94150760be3/dashboard/main.cpp' },
      { label: 'QML dashboard', href: 'https://github.com/KKWANH/DES_Instrument-Cluster/blob/b3556e7d5ad7f8525b4090832dd4f94150760be3/dashboard/asset/qml/dashboard.qml' },
      { label: 'Project context', href: 'https://github.com/KKWANH/DES_Instrument-Cluster/tree/b3556e7d5ad7f8525b4090832dd4f94150760be3' },
    ],
  },
  {
    id: 'inception', title: 'Inception', category: '42 container project', year: '2021',
    description: 'Docker Compose configuration for NGINX, MariaDB and WordPress services, with Linux setup material.',
    skills: ['docker', 'compose', 'nginx', 'linux'],
    href: 'https://github.com/KKWANH/42inception',
    details: [
      { label: 'Service composition', href: 'https://github.com/KKWANH/42inception/blob/eb3f2e6bc9c0ac74d4323a42775db1b2a72c5c3b/srcs/docker-compose.yml' },
      { label: 'NGINX image configuration', href: 'https://github.com/KKWANH/42inception/blob/eb3f2e6bc9c0ac74d4323a42775db1b2a72c5c3b/srcs/requirements/nginx/Dockerfile' },
    ],
  },
  {
    id: 'libasm', title: 'libasm', category: '42 assembly exercises', year: '2021',
    description: 'Small x86-64 string and I/O routines, including Darwin read/write syscall handling.',
    skills: ['asm'],
    href: 'https://github.com/KKWANH/libasm',
    details: [
      { label: 'String-length routine', href: 'https://github.com/KKWANH/libasm/blob/0ab36cc0aa72e71ea807110f61e47e6796e21f5e/ft_strlen.s' },
      { label: 'Read syscall and error handling', href: 'https://github.com/KKWANH/libasm/blob/0ab36cc0aa72e71ea807110f61e47e6796e21f5e/ft_read.s' },
    ],
  },
]
