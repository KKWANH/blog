// Prints the local submission CV (with grades) to a PDF outside the repository.
// Needs the dev server on :3100 (`npm run dev:edit`) and .private/cv-submission.json.
import { execFileSync } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'

const chrome = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const output = path.resolve(process.argv[2] ?? path.join(os.homedir(), 'Documents/cv/Kwanho_Kim_CV_submission.pdf'))
execFileSync(chrome, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=8000', `--print-to-pdf=${output}`, 'http://localhost:3100/cv/submission'], { stdio: 'inherit' })
console.log(`Submission CV written to ${output}`)
