import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import ts from 'typescript'

export function createSourceLoader(root, overrides = {}) {
  const require = createRequire(path.join(root, 'package.json')), modules = new Map()
  function loadSource(file) {
    if (modules.has(file)) return modules.get(file).exports
    const module = { exports: {} }
    modules.set(file, module)
    const { outputText } = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true }, fileName: file })
    function resolve(name) {
      if (Object.hasOwn(overrides, name)) return overrides[name]
      if (!name.startsWith('@/')) return require(name)
      const base = path.join(root, name.slice(2))
      if (base.endsWith('.json')) return JSON.parse(fs.readFileSync(base, 'utf8'))
      const target = ['.ts', '.tsx'].map((extension) => base + extension).find(fs.existsSync)
      if (!target) throw new Error(`Source module not found: ${name}`)
      return loadSource(target)
    }
    new Function('require', 'module', 'exports', '__filename', '__dirname', outputText)(resolve, module, module.exports, file, path.dirname(file))
    return module.exports
  }
  return loadSource
}
