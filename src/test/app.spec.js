import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { i18n } from '@/utils/i18n';

describe('To Do List', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(App, {
			global: {
				plugins: [i18n] // 注入 i18n 实例
			}
		});
	});
	// 添加项目测试
	describe('add item', () => {
		it('should alert when input is empty', async () => {
			const alertSpy = vi.fn();
			window.alert = alertSpy;
			const input = wrapper.find('.ant-input');
			await input.setValue(''); // 设置空值
			await wrapper.find('button').trigger('click'); // 点击提交按钮
			expect(alertSpy).toHaveBeenCalledWith('未輸入訊息');
		});
		it('should add item to list when input is valid', async () => {
			const input = wrapper.find('input');
			await input.setValue('New item');
			await wrapper.find('button').trigger('click'); // 点击提交按钮
			expect(wrapper.vm.toDoList).toHaveLength(1);
			expect(wrapper.vm.toDoList[0]).toEqual({
				name: '',
				edit: false,
				key: -1
			});
		});
	});

	// 编辑项目测试
	describe('edit item', () => {
		it('should not update an item with empty name', async () => {
			const alertSpy = vi.fn();
			window.alert = alertSpy;
			wrapper.vm.toDoList = [{ name: 'Test item', edit: true, key: 0 }];
			wrapper.vm.toDoList[0] = { ...wrapper.vm.toDoList[0], name: '' }; // 更新属性
			await wrapper.vm.edit(wrapper.vm.toDoList[0]); // 调用 edit 方法
			expect(alertSpy).toHaveBeenCalledWith('Failed to modify!! you did not write');
			expect(wrapper.vm.toDoList[0].edit).toBe(false);
		});
		it('should update localStorage when editing is complete', async () => {
			wrapper.vm.toDoList = [{ name: 'Test item', edit: true, key: 0 }];
			await wrapper.vm.edit(wrapper.vm.toDoList[0]);
			expect(localStorage.getItem('toDoList')).not.toBeNull();
		});
	});

	// 删除项目测试
	describe('delete item', () => {
		it('should delete item on click', async () => {
			wrapper.vm.toDoList = [{ name: 'Test item', edit: false, key: 0 }];
			wrapper.vm.deleteItem(wrapper.vm.toDoList[0]);

			expect(wrapper.vm.toDoList).toHaveLength(0);
		});
	});

	// 保存和加载列表测试
	describe('save and load list', () => {
		it('should save list to local storage', async () => {
			wrapper.vm.joinList('New item');
			expect(localStorage.getItem('toDoList')).not.toBeNull();
		});

		it('should load list from local storage', () => {
			localStorage.setItem('toDoList', JSON.stringify([{ name: 'Test item' }]));
			const wrapper = mount(App, {
				global: {
					plugins: [i18n]
				}
			});
			expect(wrapper.vm.toDoList.length).toBe(1);
			expect(wrapper.vm.toDoList[0].name).toBe('Test item');
		});
	});

	// 输入验证测试
	describe('input validation', () => {
		it('should not add empty item', async () => {
			const input = wrapper.find('.ant-input');
			await input.setValue('');
			await wrapper.find('button').trigger('click');
			expect(wrapper.vm.toDoList).toHaveLength(1);
		});
	});

	// handleInput 测试
	describe('handleInput', () => {
		it('should update item name based on input value', async () => {
			wrapper.vm.toDoList = [{ name: 'Old Name', edit: true, key: 0 }];
			const input = wrapper.find('.ant-input');
			await input.setValue('New Name');
			await wrapper.find('button').trigger('click');
			expect(wrapper.vm.toDoList[0].name).toBe('New Name');
		});
	});
});
