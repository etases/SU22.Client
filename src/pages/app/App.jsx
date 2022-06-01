import { useState } from 'react'

import { QueryProvider } from '~/core/configurations'

import { useTranslation } from '~/hooks'

import logo from '~/assets/logo.svg'
import './App.scss'

export function App() {
	const [count, setCount] = useState(0)
	const translated = useTranslation({
		defaultValue: 'World',
		translationKey: 'hello',
		keyParams: {
			name: 'John',
		},
	})

	return (
		<QueryProvider>
			<div className="App">
				<header className="App-header">
					<img
						src={logo}
						className="App-logo"
						alt="logo"
					/>
					<p>Hello Vite + React!</p>
					<p>{translated.error || translated.value}</p>
					<p>
						<button
							wdbg="blue-300"
							wdrounded="default"
							wdp="1"
							type="button"
							onClick={() => {
								setCount((count) => count + 1)
							}}>
							count is: {count}
						</button>
					</p>
					<p>
						Edit <code>App.jsx</code> and save to test HMR updates.
					</p>
					<p>
						<a
							className="App-link"
							href="https://reactjs.org"
							target="_blank"
							rel="noopener noreferrer">
							Learn React
						</a>
						{' | '}
						<a
							className="App-link"
							href="https://vitejs.dev/guide/features.html"
							target="_blank"
							rel="noopener noreferrer">
							Vite Docs
						</a>
					</p>
				</header>
			</div>
		</QueryProvider>
	)
}

export default App
