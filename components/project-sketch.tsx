type SketchKind = 'ariadne' | 'earprint' | 'color-saves-life'

export function ProjectSketch({ kind }: { kind: SketchKind }) {
  return (
    <svg viewBox="0 0 360 240" fill="none" aria-hidden="true" focusable="false" className="project-sketch">
      {kind === 'ariadne' ? <DocumentSketch /> : kind === 'earprint' ? <MusicSketch /> : <SimulationSketch />}
    </svg>
  )
}

function DocumentSketch() {
  return (
    <>
      <path className="sketch-paper" d="m51 40 118 4-4 154-118-3z" />
      <path d="m69 67 70 2m-71 17 75 2M67 105l57 1m-58 19 79 2m-79 18 49 1" />
      <path className="sketch-highlight" d="m64 101 66 1 1 13-68-1z" />
      <path className="sketch-paper" d="m205 78 109-2 3 107-111 2z" />
      <path d="m224 99 68-1m-58 20 43-1m-54 20 69-1" />
      <path className="sketch-accent" d="M126 108c33-4 40 33 77 21m-9-5 10 5-7 8" />
      <path className="sketch-faint" d="m220 119 7 0" />
      <path className="sketch-accent" d="m220 154 7 0m-3.5-3.5 0 7m10-3.5 54-1" />
      <text x="52" y="222">source</text>
      <text x="204" y="217">review the edit</text>
      <path className="sketch-faint" d="m178 28 7 6m-3-18 2 10m12-7-6 10" />
    </>
  )
}

function MusicSketch() {
  return (
    <>
      <g className="sketch-record">
        <circle className="sketch-paper" cx="139" cy="114" r="71" />
        <circle cx="139" cy="114" r="53" />
        <circle className="sketch-faint" cx="139" cy="114" r="41" />
        <circle className="sketch-accent" cx="139" cy="114" r="22" />
        <circle cx="139" cy="114" r="4" />
        <path className="sketch-faint" d="M104 67a59 59 0 0 1 56-8m-3 111a59 59 0 0 1-44-3" />
      </g>
      <path className="sketch-accent" d="M220 48c22 3 43 12 54 32m-5-1 6 2 1-9" />
      {[25, 44, 65, 40, 19, 48].map((height, index) => (
        <path className="sketch-wave" key={index} style={{ animationDelay: `${index * -120}ms` }} d={`M${225 + index * 12} ${139 - height}v${height}`} />
      ))}
      <path className="sketch-faint" d="m76 186 150-1m-119 10 142-1" />
      <text x="95" y="222">a library, explored</text>
      <path className="sketch-accent" d="M287 45v23m0-20 15-4v20m-15 0c-9-5-14 5-6 6 4 1 6-2 6-6m15-4c-8-4-12 5-5 6 3 0 5-2 5-6" />
    </>
  )
}

function SimulationSketch() {
  return (
    <>
      <path className="sketch-paper" d="m46 38 263 3-3 144-260-2z" />
      <path className="sketch-faint" d="m60 55 233 3M60 166l231 2" />
      <path d="m110 166 49-87m88 88-49-87" />
      <path className="sketch-faint sketch-road" strokeDasharray="6 9" d="m180 87-2 79" />
      <path className="sketch-accent" d="M233 100c-26-30-80-36-110-4 33 29 83 33 110 4Z" />
      <g className="sketch-eye"><circle className="sketch-accent" cx="178" cy="98" r="14" />
        <path className="sketch-accent" d="m178 89 1 18m-10-9 18 1" /></g>
      <path d="m160 184-4 16m40-16 5 16m-66 2 91-1" />
      <text x="98" y="230">try it in simulation</text>
    </>
  )
}
