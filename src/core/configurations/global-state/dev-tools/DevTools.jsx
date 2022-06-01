import { useAtomsDebugValue } from 'jotai/devtools'

export function GlobalStateDevTools() {
	useAtomsDebugValue()
	return null
}

export default GlobalStateDevTools
