import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { compression } from 'vite-plugin-compression2';
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [
		vue(),
		vueJsx(),
		compression(), // vite 的 build 包體積壓縮工具
		Components({
			resolvers: [
				AntDesignVueResolver({
					importStyle: false // css in js
				})
			]
		})
	],
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer]
		}
	},
	resolve: {
		alias: {
			'@': '/src' // 设置 @ 符号的别名为项目的 src 目录
		}
	}
	// test: {
	// 	environment: 'jsdom' // 或其他支持 DOM 模拟的环境,
	// }
	// coveragePathIgnorePatterns: ['/node_modules/', 'postcss.config.js', 'tailwind.config.js', '**/main.js'],
});
