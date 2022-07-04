import { defineConfig } from 'vite'
// import vitePluginCssModules from 'vite-plugin-css-modules';
// import electron from 'vite-plugin-electron';
// import optimizer from 'vite-plugin-optimizer';
import dynamicImport from 'vite-plugin-dynamic-import'
import mockPlugin from 'vite-plugin-file-mock'
import imagePresets, { widthPreset } from 'vite-plugin-image-presets'
import mkcert from 'vite-plugin-mkcert'
import removeConsole from 'vite-plugin-remove-console'
import svgr from 'vite-plugin-svgr'
import { ViteTips } from 'vite-plugin-tips'
import WindiCSS from 'vite-plugin-windicss'
import react from 'vite-preset-react'
import jsconfigPaths from 'vite-tsconfig-paths'
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label'
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh'
import eslintPlugin from '@nabla/vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
	// prevent vite from obscuring rust errors
	clearScreen: false,
	// Tauri expects a fixed port, fail if that port is not available
	server: {
		port: 3000,
		strictPort: true,
	},
	// to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
	// `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
	// env variables
	envPrefix: ['VITE_', 'TAURI_', 'ENV_'],
	build: {
		// Tauri supports es2021
		target: ['es2021', 'chrome97', 'safari13'],
		// don't minify for debug builds
		minify: !process.env.TAURI_DEBUG && 'esbuild',
		// produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_DEBUG,
	},
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
					prefix: 'wdi',
				},
			},
		}),
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
		mkcert(),
		ViteTips(),
		removeConsole(),
		mockPlugin(),
		svgr(),
		eslintPlugin({
			eslintOptions: {
				fix: true,
				cache: false,
			},
		}),
	],
})
