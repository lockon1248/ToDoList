import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { mount } from '@vue/test-utils';
import { createApp } from 'vue';
import App from '@/App.vue';

const mockI18n = {
	global: {
		t: (key) => key // 简单的 mock，直接返回 key
	}
};
// 添加 FontAwesome 图标
library.add(faTrash, faPenToSquare, faFloppyDisk);

describe('main.js', () => {
	let appElement;
	beforeEach(() => {
		// 在每个测试开始之前，创建并插入具有 #app ID 的 DOM 元素
		appElement = document.createElement('div');
		appElement.id = 'app';
		document.body.appendChild(appElement);
	});
	afterEach(() => {
		// 测试结束后清理 DOM
		document.body.removeChild(appElement);
	});
	describe('App Component', () => {

		it('creates an app instance', () => {
			const app = createApp(App);
			expect(app).toBeDefined(); // 验证 app 不是 undefined
			expect(app._component).toStrictEqual(App); // 验证 app 的根组件是 App
		});

		it('adds expected icons to FontAwesome library', () => {
			const definedIcons = Object.keys(library.definitions.fas);
			expect(definedIcons).toContain('trash');
			expect(definedIcons).toContain('pen-to-square');
			expect(definedIcons).toContain('floppy-disk');
		});

		it('mounts the App component to #app', async () => {
			const wrapper = mount(App, {
				global: {
					config: {
						globalProperties: {
							$t: mockI18n.global.t
						}
					}
				}
			});
			expect(wrapper.exists()).toBe(true); // 验证组件已挂载
		});
	});
});
