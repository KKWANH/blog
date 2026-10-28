'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type KeyboardEvent } from 'react'
import { ArrowUpRight, ChevronDown, ChevronRight, Expand, FolderGit2, LocateFixed, Minus, Plus, RotateCcw, Search, UserRound, X } from 'lucide-react'
import { CareerIcon } from '@/components/career-icons'
import { RepositoryInspector } from '@/components/repository-inspector'
import { SkillLevelBadge } from '@/components/skill-level-badge'
import { useSkillPreferences } from '@/components/skill-profile-provider'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { useMotion } from '@/components/motion-provider'
import type { CareerSkill } from '@/lib/profile'
import { mapGroups, resolveMapTechnologies, repositoriesForTechnology, reviewedRepositories, repositoryCatalogue, repositoryTechnologyCount } from '@/lib/repository-catalogue'
import { boundsOf, createMindMap, edgePath, type MapPoint, type MindMapNode, type MapBounds } from '@/lib/mind-map-layout'

type Camera = { x: number; y: number; zoom: number }
type Gesture = {
  kind: 'pan' | 'node' | 'pinch'
  start: MapPoint
  camera: Camera
  node?: MindMapNode
  members?: MindMapNode[]
  distance?: number
  moved: boolean
}
type SearchResult = { id: string; label: string; kind: 'skill' | 'repo'; detail: string }
const clampZoom = (value: number) => Math.max(.2, Math.min(2.4, value))

export default function SkillMindMap({ selectedSkill, onSelectSkill, onViewEvidence, focusRequest }: {
  selectedSkill: CareerSkill | null
  onSelectSkill: (skill: CareerSkill | null) => void
  onViewEvidence: () => void
  focusRequest?: { id: string; serial: number }
}) {
  const { enabled } = useMotion()
  const { profile: skillProfile } = useSkillPreferences()
  const mapTechnologies = useMemo(() => resolveMapTechnologies(skillProfile).filter((tech) => tech.visibility !== 'hidden'), [skillProfile])
  const [expanded, setExpanded] = useState(() => new Set(selectedSkill ? [mapTechnologies.find((tech) => tech.id === selectedSkill)?.group ?? 'languages'] : []))
  const [activeTech, setActiveTech] = useState<string | null>(selectedSkill)
  const [pinnedRepository, setPinnedRepository] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState(selectedSkill ? `skill:${selectedSkill}` : 'root')
  const [positions, setPositions] = useState<Record<string, MapPoint>>({})
  const [allRepositories, setAllRepositories] = useState(false)
  const [allTechnologies, setAllTechnologies] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchIndex, setSearchIndex] = useState(0)
  const [camera, setCameraState] = useState<Camera>({ x: 0, y: 0, zoom: 1 })
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [fitRequest, setFitRequest] = useState({ id: selectedSkill ? `skill:${selectedSkill}` : 'all', serial: 0 })
  const [dragging, setDragging] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const viewport = useRef<HTMLDivElement>(null)
  const overview = useRef<SVGSVGElement>(null)
  const expandButton = useRef<HTMLButtonElement>(null)
  const cameraRef = useRef(camera)
  const animation = useRef(0)
  const pointers = useRef(new Map<number, MapPoint>())
  const gesture = useRef<Gesture | null>(null)
  const initialized = useRef(false)
  const jumpAfterClose = useRef(false)
  const backgroundTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastBackgroundTap = useRef<{ point: MapPoint; time: number } | null>(null)

  const structure = useMemo(() => createMindMap({ expanded, activeTech, pinnedRepository, allRepositories, allTechnologies, positions: {}, profile: skillProfile }), [expanded, activeTech, pinnedRepository, allRepositories, allTechnologies, skillProfile])
  const nodes = useMemo(() => structure.nodes.map((node) => positions[node.id] ? { ...node, ...positions[node.id] } : node), [structure, positions])
  const nodeMap = useMemo(() => new Map(nodes.map((node) => [node.id, node])), [nodes])
  const bounds = useMemo(() => boundsOf(nodes), [nodes])
  const selectedNode = nodeMap.get(selectedId)
  const selectedTechnology = mapTechnologies.find((tech) => selectedId === `skill:${tech.id}`)
  const selectedRepository = reviewedRepositories.find((repo) => selectedId === `repo:${repo.name}`)
  const related = selectedTechnology ? repositoriesForTechnology(selectedTechnology.id, true) : []
  const connected = useMemo(() => new Set([selectedId, ...structure.edges.filter((edge) => edge.from === selectedId || edge.to === selectedId).flatMap((edge) => [edge.from, edge.to])]), [structure.edges, selectedId])
  const matches = useMemo<SearchResult[]>(() => {
    const needle = query.toLowerCase().replace(/[\s_-]+/g, '')
    if (!needle) return []
    const techs: SearchResult[] = mapTechnologies.filter((tech) => `${tech.label}${tech.id}`.toLowerCase().replace(/[\s_-]+/g, '').includes(needle)).map((tech) => ({ id: tech.id, label: tech.label, kind: 'skill', detail: tech.personal ? 'Experience / practice' : 'Repository technology' }))
    const repos: SearchResult[] = reviewedRepositories.filter((repo) => repo.name.toLowerCase().replace(/[\s_-]+/g, '').includes(needle)).map((repo) => ({ id: repo.name, label: repo.name, kind: 'repo', detail: repo.scope === 'reference' ? 'Fork / reference' : 'Reviewed repository' }))
    return [...techs, ...repos].slice(0, 9)
  }, [query, mapTechnologies])

  const applyCamera = useCallback((next: Camera) => {
    cameraRef.current = next
    setCameraState(next)
  }, [])

  const moveCamera = useCallback((target: Camera, animate = false) => {
    cancelAnimationFrame(animation.current)
    if (!animate || !enabled) { applyCamera(target); return }
    const start = { ...cameraRef.current }, started = performance.now()
    const frame = (now: number) => {
      const progress = Math.min(1, (now - started) / 320), eased = 1 - (1 - progress) ** 3
      applyCamera({ x: start.x + (target.x - start.x) * eased, y: start.y + (target.y - start.y) * eased, zoom: start.zoom + (target.zoom - start.zoom) * eased })
      if (progress < 1) animation.current = requestAnimationFrame(frame)
    }
    animation.current = requestAnimationFrame(frame)
  }, [applyCamera, enabled])

  const fitBounds = useCallback((box: MapBounds, animate = true) => {
    if (!size.width || !size.height) return
    const zoom = clampZoom(Math.min((size.width - 100) / Math.max(box.width, 100), (size.height - 100) / Math.max(box.height, 100), 1.1))
    moveCamera({ x: size.width / 2 - (box.x + box.width / 2) * zoom, y: size.height / 2 - (box.y + box.height / 2) * zoom, zoom }, animate)
  }, [moveCamera, size])

  const requestFit = useCallback((id: string) => setFitRequest((current) => ({ id, serial: current.serial + 1 })), [])

  useEffect(() => {
    const element = viewport.current
    if (!element) return
    const observer = new ResizeObserver(() => {
      const rect = element.getBoundingClientRect()
      if (rect.width && rect.height) setSize({ width: rect.width, height: rect.height })
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [fullscreen])

  useEffect(() => {
    if (!size.width || !size.height) return
    const initial = !initialized.current
    initialized.current = true
    let targets = nodes
    if (fitRequest.id === 'initial') targets = nodes.filter((node) => node.id === 'root' || node.group === 'languages')
    else if (fitRequest.id.startsWith('branch:')) {
      const group = fitRequest.id.slice(7)
      targets = nodes.filter((node) => node.id === 'root' || node.group === group)
    } else if (fitRequest.id !== 'all') {
      const node = nodeMap.get(fitRequest.id)
      if (node) {
        const neighbours = structure.edges.filter((edge) => edge.from === node.id || edge.to === node.id).flatMap((edge) => [edge.from, edge.to]).filter((id) => id !== node.id)
        targets = [node, ...neighbours.slice(0, 4).map((id) => nodeMap.get(id)).filter((value): value is MindMapNode => Boolean(value))]
      }
    }
    fitBounds(boundsOf(targets), !initial)
    // Camera changes are explicit requests or a viewport resize, not drag updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitRequest.serial, size.width, size.height])

  useEffect(() => () => {
    cancelAnimationFrame(animation.current)
    if (backgroundTimer.current) clearTimeout(backgroundTimer.current)
  }, [])
  useEffect(() => { if (!enabled) cancelAnimationFrame(animation.current) }, [enabled])
  useEffect(() => {
    if (!selectedSkill || activeTech === selectedSkill) return
    const tech = mapTechnologies.find((item) => item.id === selectedSkill)
    if (!tech) return
    setExpanded((current) => new Set([...current, tech.group]))
    setActiveTech(tech.id)
    setSelectedId(`skill:${tech.id}`)
    requestFit(`skill:${tech.id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSkill])
  useEffect(() => {
    if (focusRequest) selectTechnology(focusRequest.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRequest?.serial])
  useEffect(() => {
    if (activeTech && !mapTechnologies.some((tech) => tech.id === activeTech)) {
      setActiveTech(null); setPinnedRepository(null); setSelectedId('root'); onSelectSkill(null); requestFit('all')
    }
    // A hidden preference must remove the active skill from every map state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapTechnologies])

  function zoomAt(factor: number, point = { x: size.width / 2, y: size.height / 2 }) {
    cancelAnimationFrame(animation.current)
    const current = cameraRef.current, zoom = clampZoom(current.zoom * factor)
    const world = { x: (point.x - current.x) / current.zoom, y: (point.y - current.y) / current.zoom }
    applyCamera({ x: point.x - world.x * zoom, y: point.y - world.y * zoom, zoom })
  }

  useEffect(() => {
    const element = viewport.current
    if (!element) return
    const wheel = (event: WheelEvent) => {
      if (!fullscreen && !event.ctrlKey && !event.metaKey) return
      event.preventDefault()
      if (gesture.current) return
      const rect = element.getBoundingClientRect()
      zoomAt(Math.exp(-event.deltaY * .0016), { x: event.clientX - rect.left, y: event.clientY - rect.top })
    }
    element.addEventListener('wheel', wheel, { passive: false })
    return () => element.removeEventListener('wheel', wheel)
    // zoomAt reads the current camera ref, so this listener does not follow every frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullscreen, size.width, size.height])

  function toggleGroup(id: string) {
    const closing = expanded.has(id)
    setExpanded((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
    if (closing && mapTechnologies.find((tech) => tech.id === activeTech)?.group === id) {
      setActiveTech(null)
      setPinnedRepository(null)
      onSelectSkill(null)
    }
    setSelectedId(`group:${id}`)
    requestFit(`branch:${id}`)
  }

  function selectTechnology(id: string, focus = true) {
    const tech = mapTechnologies.find((entry) => entry.id === id)
    if (!tech) return
    if (!tech.personal) setAllTechnologies(true)
    setExpanded((current) => new Set([...current, tech.group]))
    setActiveTech(id)
    setPinnedRepository(null)
    setSelectedId(`skill:${id}`)
    onSelectSkill(tech.personal ? tech.id : null)
    setAnnouncement(`${tech.label} selected. ${repositoriesForTechnology(id, true).length} linked repositories.`)
    if (focus) requestFit(`skill:${id}`)
  }

  function selectRepository(name: string, focus = true) {
    const repo = reviewedRepositories.find((entry) => entry.name === name)
    if (!repo) return
    const first = repo.technologies.map((entry) => mapTechnologies.find((tech) => tech.id === entry.id)).find((tech) => tech?.personal) ?? mapTechnologies.find((tech) => tech.id === repo.technologies[0]?.id)
    if (first) {
      setExpanded((current) => new Set([...current, first.group]))
      setActiveTech(first.id)
      if (!first.personal) setAllTechnologies(true)
    }
    setPinnedRepository(name)
    setSelectedId(`repo:${name}`)
    onSelectSkill(null)
    setAnnouncement(`${name} selected. ${repo.sourceCount} source files.`)
    if (focus) requestFit(`repo:${name}`)
  }

  function selectNode(node: MindMapNode) {
    if (node.kind === 'group') toggleGroup(node.group!)
    else if (node.kind === 'skill') selectTechnology(node.techId!)
    else if (node.kind === 'repo') selectRepository(node.repoName!, false)
    else { setSelectedId('root'); requestFit('all') }
  }

  function chooseSearch(result: SearchResult) {
    setQuery('')
    setSearchIndex(0)
    if (result.kind === 'skill') selectTechnology(result.id)
    else selectRepository(result.id)
    requestAnimationFrame(() => viewport.current?.focus({ preventScroll: true }))
  }

  function pointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || (event.target as HTMLElement).closest('[data-map-control]')) return
    cancelAnimationFrame(animation.current)
    if (backgroundTimer.current) { clearTimeout(backgroundTimer.current); backgroundTimer.current = null }
    const rect = event.currentTarget.getBoundingClientRect()
    const point = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    pointers.current.set(event.pointerId, point)
    event.currentTarget.setPointerCapture(event.pointerId)
    const points = [...pointers.current.values()]
    if (points.length === 2) {
      lastBackgroundTap.current = null
      const center = { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 }
      gesture.current = { kind: 'pinch', start: center, camera: { ...cameraRef.current }, distance: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y), moved: true }
    } else {
      const id = (event.target as HTMLElement).closest<HTMLElement>('[data-node-id]')?.dataset.nodeId
      const node = id ? nodeMap.get(id) : undefined
      if (node) lastBackgroundTap.current = null
      const members = node?.kind === 'root' ? nodes : node?.kind === 'group' ? nodes.filter((item) => item.id === node.id || (item.kind === 'skill' && item.group === node.group)) : node ? [node] : []
      gesture.current = { kind: node ? 'node' : 'pan', start: point, camera: { ...cameraRef.current }, node, members, moved: false }
      if (node) event.currentTarget.querySelector<HTMLButtonElement>(`[data-node-button="${CSS.escape(node.id)}"]`)?.focus({ preventScroll: true })
      else event.currentTarget.focus({ preventScroll: true })
    }
    event.preventDefault()
  }

  function pointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId) || !gesture.current) return
    const rect = event.currentTarget.getBoundingClientRect(), point = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    pointers.current.set(event.pointerId, point)
    const active = gesture.current, points = [...pointers.current.values()]
    if (active.kind === 'pinch' && points.length >= 2) {
      const center = { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 }
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
      const zoom = clampZoom(active.camera.zoom * distance / Math.max(active.distance ?? 1, 1))
      const world = { x: (active.start.x - active.camera.x) / active.camera.zoom, y: (active.start.y - active.camera.y) / active.camera.zoom }
      applyCamera({ x: center.x - world.x * zoom, y: center.y - world.y * zoom, zoom })
      return
    }
    const dx = point.x - active.start.x, dy = point.y - active.start.y
    if (Math.hypot(dx, dy) > 4) active.moved = true
    if (!active.moved) return
    lastBackgroundTap.current = null
    if (active.kind === 'node' && active.node) {
      const node = active.node
      setDragging(node.id)
      setPositions((current) => ({ ...current, ...Object.fromEntries((active.members ?? [node]).map((member) => [member.id, { x: member.x + dx / active.camera.zoom, y: member.y + dy / active.camera.zoom }])) }))
    } else if (active.kind === 'pan') {
      setDragging('canvas')
      applyCamera({ ...active.camera, x: active.camera.x + dx, y: active.camera.y + dy })
    }
  }

  function pointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    const active = gesture.current
    if (!active) return
    pointers.current.delete(event.pointerId)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    if (event.type !== 'pointercancel' && active.kind === 'node' && !active.moved && active.node) selectNode(active.node)
    if (event.type !== 'pointercancel' && active.kind === 'pan' && !active.moved && !pointers.current.size) {
      const rect = event.currentTarget.getBoundingClientRect(), point = { x: event.clientX - rect.left, y: event.clientY - rect.top }, now = performance.now()
      const previous = lastBackgroundTap.current
      if (previous && now - previous.time < 320 && Math.hypot(point.x - previous.point.x, point.y - previous.point.y) < 25) {
        lastBackgroundTap.current = null
        zoomAt(event.shiftKey ? 1 / 1.5 : 1.5, point)
        setAnnouncement(event.shiftKey ? 'Zoomed out at the pointer.' : 'Zoomed in at the pointer.')
      } else {
        lastBackgroundTap.current = { point, time: now }
        backgroundTimer.current = setTimeout(() => {
          lastBackgroundTap.current = null; backgroundTimer.current = null
          requestFit('all'); setAnnouncement('Overview of the current connections.')
        }, 320)
      }
    }
    if (active.moved) event.currentTarget.focus({ preventScroll: true })
    const remaining = [...pointers.current.values()]
    gesture.current = remaining.length ? { kind: 'pan', start: remaining[0], camera: { ...cameraRef.current }, moved: true } : null
    setDragging(null)
  }

  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement
    if (target.closest('[data-map-control],input,select,textarea')) return
    const id = target.closest<HTMLElement>('[data-node-id]')?.dataset.nodeId
    if (event.shiftKey && id && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      const node = nodeMap.get(id)
      if (!node) return
      event.preventDefault()
      const members = node.kind === 'root' ? nodes : node.kind === 'group' ? nodes.filter((item) => item.id === node.id || (item.kind === 'skill' && item.group === node.group)) : [node]
      const dx = event.key === 'ArrowRight' ? 24 : event.key === 'ArrowLeft' ? -24 : 0, dy = event.key === 'ArrowDown' ? 24 : event.key === 'ArrowUp' ? -24 : 0
      setPositions((current) => ({ ...current, ...Object.fromEntries(members.map((member) => [member.id, { x: member.x + dx, y: member.y + dy }])) }))
      setAnnouncement(`${node.label} moved.`)
      return
    }
    const steps: Record<string, MapPoint> = { ArrowLeft: { x: 55, y: 0 }, ArrowRight: { x: -55, y: 0 }, ArrowUp: { x: 0, y: 55 }, ArrowDown: { x: 0, y: -55 } }
    if (steps[event.key]) { event.preventDefault(); viewport.current?.focus({ preventScroll: true }); const step = steps[event.key]; applyCamera({ ...cameraRef.current, x: cameraRef.current.x + step.x, y: cameraRef.current.y + step.y }) }
    else if (event.key === '+' || event.key === '=') { event.preventDefault(); zoomAt(1.2) }
    else if (event.key === '-') { event.preventDefault(); zoomAt(1 / 1.2) }
    else if (event.key === 'Home') { event.preventDefault(); requestFit('all') }
    else if (event.key === 'Enter' && target === viewport.current) { event.preventDefault(); requestFit('all') }
  }

  function openEvidence() {
    if (fullscreen) { jumpAfterClose.current = true; setFullscreen(false) }
    else onViewEvidence()
  }

  const scene = <div className="mind-map-scene">
    <div className="mind-map-toolbar">
      <div className="map-search"><Search aria-hidden="true" /><input type="search" value={query} placeholder="Find any skill or repository" aria-label="Search skill map" aria-controls={query ? 'map-search-results' : undefined} onChange={(event) => { setQuery(event.target.value); setSearchIndex(0) }} onKeyDown={(event) => {
        if (event.key === 'ArrowDown') { event.preventDefault(); setSearchIndex((index) => Math.min(index + 1, matches.length - 1)) }
        if (event.key === 'ArrowUp') { event.preventDefault(); setSearchIndex((index) => Math.max(index - 1, 0)) }
        if (event.key === 'Enter' && matches[searchIndex]) { event.preventDefault(); chooseSearch(matches[searchIndex]) }
        if (event.key === 'Escape' && query) { event.stopPropagation(); setQuery('') }
      }} />
      {query ? <div id="map-search-results" className="map-search-results">{matches.map((result, index) => <button type="button" key={`${result.kind}:${result.id}`} data-highlighted={index === searchIndex} onClick={() => chooseSearch(result)}><span>{result.label}<small>{result.detail}</small></span><ArrowUpRight aria-hidden="true" /></button>)}{!matches.length ? <p>No matching skill or repository.</p> : null}</div> : null}</div>
      <div className="map-toolbar-actions">
        <button type="button" aria-pressed={allRepositories} onClick={() => { setAllRepositories((value) => !value); requestFit('all') }}>{allRepositories ? 'Linked repos' : `All ${repositoryCatalogue.count} repos`}</button>
        <button type="button" aria-pressed={allTechnologies} onClick={() => setAllTechnologies((value) => !value)}>{allTechnologies ? 'Experience & practice' : 'Include repository stacks'}</button>
        {!fullscreen ? <button type="button" ref={expandButton} onClick={() => { setFullscreen(true); requestFit(selectedId) }}><Expand aria-hidden="true" />Expand map</button> : <button type="button" onClick={() => setFullscreen(false)}><X aria-hidden="true" />Close map</button>}
      </div>
    </div>
    <div className="mind-map-layout">
      <div className="mind-map-viewport" ref={viewport} tabIndex={0} role="group" aria-label="Interactive skill map. Drag to pan, pinch or Control plus wheel to zoom. Arrow keys pan; plus and minus zoom; Home fits the map. Shift and arrow keys move a focused node." data-dragging={Boolean(dragging)} data-zoom={camera.zoom.toFixed(3)} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onKeyDown={keyboard}>
        <div className="mind-map-world" style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})` }}>
          <svg className="mind-map-edges" aria-hidden="true" style={{ left: bounds.x - 100, top: bounds.y - 100, width: bounds.width + 200, height: bounds.height + 200 }} viewBox={`${bounds.x - 100} ${bounds.y - 100} ${bounds.width + 200} ${bounds.height + 200}`}>
            {structure.edges.map((edge) => {
              const from = nodeMap.get(edge.from), to = nodeMap.get(edge.to)
              if (!from || !to) return null
              return <path key={edge.id} d={edgePath(from, to)} data-active={edge.from === selectedId || edge.to === selectedId} />
            })}
          </svg>
          {nodes.map((node) => {
            const x = camera.x + node.x * camera.zoom, y = camera.y + node.y * camera.zoom
            const width = node.width * camera.zoom, height = node.height * camera.zoom
            const visibleWidth = Math.min(x + width, size.width) - Math.max(x, 0)
            const visibleHeight = Math.min(y + height, size.height - 64) - Math.max(y, 0)
            const visible = dragging === node.id || (visibleWidth >= Math.min(24, width) && visibleHeight >= Math.min(24, height))
            return <div key={node.id} className="mind-map-node" data-node-id={node.id} data-kind={node.kind} data-selected={selectedId === node.id} data-connected={connected.has(node.id)} data-dragging={dragging === node.id} aria-hidden={!visible} style={{ left: node.x, top: node.y, width: node.width, minHeight: node.height, visibility: visible ? 'visible' : 'hidden' }}>
            <button className="map-node-face" type="button" tabIndex={visible ? 0 : -1} data-node-button={node.id} aria-pressed={selectedId === node.id} aria-expanded={node.kind === 'group' ? node.expanded : undefined} aria-label={node.kind === 'group' ? `${node.expanded ? 'Collapse' : 'Expand'} ${node.label}` : `${node.label}. ${node.detail}. Drag to move; Shift and arrow keys also move this node.`} onFocus={(event) => {
              if (gesture.current || !viewport.current) return
              const area = viewport.current.getBoundingClientRect(), item = event.currentTarget.getBoundingClientRect()
              if (item.left < area.left + 12 || item.right > area.right - 12 || item.top < area.top + 42 || item.bottom > area.bottom - 64) {
                moveCamera({ ...cameraRef.current, x: size.width / 2 - (node.x + node.width / 2) * cameraRef.current.zoom, y: size.height / 2 - (node.y + node.height / 2) * cameraRef.current.zoom })
              }
            }} onClick={(event) => { if (event.detail === 0) selectNode(node) }}>
              {node.kind === 'skill' ? <CareerIcon skill={node.techId!} /> : node.kind === 'repo' ? <FolderGit2 aria-hidden="true" /> : node.kind === 'root' ? <UserRound aria-hidden="true" /> : null}
              <span><strong>{node.label}</strong>{node.kind === 'skill' && node.personal && node.level ? <SkillLevelBadge level={node.level} compact /> : node.kind !== 'skill' || !node.personal ? <small>{node.detail}</small> : null}</span>
            </button>
            {node.kind === 'group' ? <span className="map-branch-toggle" aria-hidden="true">{node.expanded ? <Minus /> : <Plus />}</span> : null}
          </div>})}
        </div>
        <div className="map-camera-controls" data-map-control>
          <button type="button" aria-label="Zoom in" onClick={() => zoomAt(1.25)}><Plus aria-hidden="true" /></button>
          <output aria-label="Map zoom">{Math.round(camera.zoom * 100)}%</output>
          <button type="button" aria-label="Zoom out" onClick={() => zoomAt(.8)}><Minus aria-hidden="true" /></button>
          <button type="button" aria-label="Fit visible map" onClick={() => requestFit('all')}><Expand aria-hidden="true" /></button>
          <button type="button" aria-label="Center selected node" onClick={() => requestFit(selectedId)}><LocateFixed aria-hidden="true" /></button>
          <button type="button" aria-label="Reset node arrangement" onClick={() => { setPositions({}); requestFit('all'); setAnnouncement('Node arrangement reset.') }}><RotateCcw aria-hidden="true" /></button>
        </div>
        <p className="map-gesture-hint" data-map-control>Drag to move · Background click: overview · Double-click: zoom · Ctrl/⌘ + wheel or pinch</p>
      </div>
      <aside className="map-inspector" aria-label="Selected map item">
        <button type="button" className="map-overview" data-map-control aria-label="Map overview: click to recenter, Enter to fit all" onClick={(event) => {
          if (event.detail === 0) { requestFit('all'); return }
          const svg = overview.current, matrix = svg?.getScreenCTM()
          if (!svg || !matrix) return
          const point = svg.createSVGPoint(); point.x = event.clientX; point.y = event.clientY
          const world = point.matrixTransform(matrix.inverse())
          moveCamera({ ...cameraRef.current, x: size.width / 2 - world.x * cameraRef.current.zoom, y: size.height / 2 - world.y * cameraRef.current.zoom }, true)
        }}>
          <svg ref={overview} viewBox={`${bounds.x - 60} ${bounds.y - 60} ${bounds.width + 120} ${bounds.height + 120}`} aria-hidden="true">
            {nodes.map((node) => <rect key={node.id} x={node.x} y={node.y} width={node.width} height={node.height} data-kind={node.kind} data-selected={node.id === selectedId} />)}
            <rect className="overview-viewport" x={-camera.x / camera.zoom} y={-camera.y / camera.zoom} width={size.width / camera.zoom} height={size.height / camera.zoom} />
          </svg>
        </button>
        {selectedRepository ? <RepositoryInspector key={selectedRepository.name} repository={selectedRepository} onTechnology={(id) => selectTechnology(id)} /> : selectedTechnology ? <>
          <p className="map-inspector-eyebrow">{selectedTechnology.personal ? 'Experience / project practice' : 'Repository technology'}</p>
          <div className="map-inspector-title"><CareerIcon skill={selectedTechnology.id} /><h3>{selectedTechnology.label}</h3></div>
          {selectedTechnology.personal ? <SkillLevelBadge level={selectedTechnology.level} /> : null}
          {selectedTechnology.kind === 'practice' ? <p className="map-practice-note">Engineering practice · {selectedTechnology.detail}</p> : null}
          {selectedTechnology.related?.length ? <div className="map-family-links" aria-label="Related languages and tools">{selectedTechnology.related.map((id) => mapTechnologies.find((tech) => tech.id === id)).filter((tech) => Boolean(tech)).map((tech) => <button type="button" key={tech!.id} onClick={() => selectTechnology(tech!.id)}><CareerIcon skill={tech!.id} />{tech!.label}</button>)}</div> : null}
          <p>{selectedTechnology.detail}</p>
          {selectedTechnology.personal ? <button type="button" className="map-context-action" onClick={openEvidence}>View experience context <ArrowUpRight aria-hidden="true" /></button> : <p className="repository-review-note">A technology found in repository material. The repository context describes the contribution.</p>}
          <h4>{related.length} linked repositories</h4>
          <div className="map-related-repositories">{related.map((repo) => <button type="button" key={repo.name} onClick={() => selectRepository(repo.name)}><span>{repo.name}<small>{repo.scope === 'reference' ? 'Fork / reference' : repo.scope === 'ai-directed' ? 'AI-directed' : repo.scope === 'learning' ? 'Project practice' : 'Repository'}</small></span><ChevronRight aria-hidden="true" /></button>)}</div>
        </> : selectedNode?.kind === 'group' ? <>
          <p className="map-inspector-eyebrow">Skill family</p><h3>{selectedNode.label}</h3><p>{selectedNode.count} technologies. Select a node to inspect its work and repository connections.</p>
          <button type="button" className="map-context-action" onClick={() => toggleGroup(selectedNode.group!)}>{selectedNode.expanded ? 'Collapse branch' : 'Expand branch'}<ChevronDown aria-hidden="true" /></button>
          <div className="map-family-links">{mapTechnologies.filter((tech) => tech.group === selectedNode.group && (allTechnologies || tech.personal)).map((tech) => <button type="button" key={tech.id} onClick={() => selectTechnology(tech.id)}><CareerIcon skill={tech.id} />{tech.label}</button>)}</div>
        </> : <>
          <p className="map-inspector-eyebrow">Explore the connections</p><h3>Skills &amp; repositories</h3><p>Open a branch, move its nodes, or search for a specific technology or project.</p>
          <dl className="map-summary"><div><dt>Profile skills</dt><dd>{mapTechnologies.filter((tech) => tech.personal).length}</dd></div><div><dt>Repositories</dt><dd>{repositoryCatalogue.count}</dd></div><div><dt>Repository technologies</dt><dd>{repositoryTechnologyCount}</dd></div><div><dt>Source files</dt><dd>{repositoryCatalogue.inspectedFiles}</dd></div></dl>
          <button type="button" className="map-context-action" onClick={() => { setExpanded(new Set(mapGroups.map((group) => group.id))); requestFit('all') }}>Expand every branch <Plus aria-hidden="true" /></button>
        </>}
        <button type="button" className="map-collapse-action" onClick={() => { setExpanded(new Set()); setActiveTech(null); setPinnedRepository(null); setAllRepositories(false); setSelectedId('root'); requestFit('all') }}>Collapse to overview</button>
      </aside>
    </div>
    <p className="sr-only" role="status">{announcement}</p>
  </div>

  return <>
    {!fullscreen ? <section className="interactive-mind-map" aria-label="Interactive skills and repository map">{scene}</section> : <div className="map-expanded-placeholder">Map open in expanded view.</div>}
    <Dialog open={fullscreen} onOpenChange={setFullscreen}>
      {fullscreen ? <DialogContent className="skill-map-dialog translate-x-0 translate-y-0" showCloseButton={false} onCloseAutoFocus={(event) => {
        event.preventDefault()
        if (jumpAfterClose.current) { jumpAfterClose.current = false; onViewEvidence() }
        else expandButton.current?.focus({ preventScroll: true })
      }}>
        <div className="map-dialog-heading"><DialogTitle>Skills &amp; project map</DialogTitle><DialogDescription>Move, zoom and expand the connections. Escape returns to the profile.</DialogDescription></div>
        {scene}
      </DialogContent> : null}
    </Dialog>
  </>
}
