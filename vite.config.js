import { defineConfig } from 'vite'
// import vitePluginCssModules from 'vite-plugin-css-modules';
// import electron from 'vite-plugin-electron';
// import optimizer from 'vite-plugin-optimizer';
import dynamicImport from 'vite-plugin-dynamic-import'
import mockPlugin from 'vite-plugin-file-mock'
import imagePresets, { widthPreset } from 'vite-plugin-image-presets'
import mkcert from 'vite-plugin-mkcert'
import mockServer from 'vite-plugin-mock-server'
import removeConsole from 'vite-plugin-remove-console'
import svgr from 'vite-plugin-svgr'
import { ViteTips } from 'vite-plugin-tips'
import WindiCSS from 'vite-plugin-windicss'
import react from 'vite-preset-react'
import jsconfigPaths from 'vite-tsconfig-paths'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			injectReact: true,
			removeDevtoolsInProd: true,
			reactPluginOptions: {
				babel: {
					plugins: [jotaiDebugLabel, jotaiReactRefresh],
				},
			},
		}),
		jsconfigPaths(),
		WindiCSS({
			config: {
				attributify: {
					prefix: 'wd',
				},
			},
		}),
		// electron({
		//     main: {
		//         entry: 'electron/index.js',
		//     }
		// })
		// optimizer(),
		dynamicImport(),
		imagePresets({
			thumbnail: widthPreset({
				class: 'img thumb',
				loading: 'lazy',
				widths: [48, 96],
				formats: {
					webp: { quality: 50 },
					jpg: { quality: 70 },
				},
			}),
		}),
		// vitePluginCssModules(),
		mkcert(),
		mockServer({
			logLevel: 'error',
		}),
		ViteTips(),
		removeConsole(),
		mockPlugin(),
		svgr(),
	],
})
