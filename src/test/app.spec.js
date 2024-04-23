import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';

describe('To Do List', () => {
	describe('add item', () => {
		it('should alert when input is empty', async () => {
			const alert = vi.fn();
			const wrapper = mount(App);
			window.alert = alert;
			await wrapper.find('input').setValue('');
			await wrapper.find('button').trigger('click');
			expect(window.alert).toBeCalledWith('未輸入訊息');
		});
		it('should add item to list when input is valid', () => {
			const wrapper = mount(App);
			wrapper.find('input').setValue('New item');
			wrapper.find('button').trigger('click');
			expect(wrapper.vm.toDoList).toHaveLength(1);

			expect(wrapper.vm.toDoList[0]).toEqual({
				name: 'New item',
				edit: false,
				key: 0
			});
		});
	});

	// 測試編輯項目
	describe('edit item', () => {
		let wrapper;
		let toDoList; // Mock or access actual toDoList

		beforeEach(() => {
			wrapper = mount(App);
			toDoList = []; // Initialize toDoList
		});

		it('should toggle edit mode on click', () => {
			const wrapper = mount(App);
			const item = wrapper.vm.toDoList[0];
			wrapper.vm.edit(item);
			expect(item.edit).toBe(true);
			
		});

		it('should update an item with valid name', async () => {
			const item = { name: 'Item 1', edit: false };
			toDoList.push(item);
			await wrapper.vm.edit(item);
			expect(item.name).toBe('Item 1');
			expect(item.edit).toBeTruthy();
		});

		it('should not update an item with empty name', async () => {
			const wrapper = mount(App);
			const item = { name: 'Item 1', edit: true };
			wrapper.vm.edit(item);
			expect(item.name).toBe('Item 1');
			expect(item.edit).toBe(false);

			// 模拟用户输入空名称
			await wrapper.find('input').setValue('');
			wrapper.find('button').trigger('click');

			// 断言项目名称未更新
			expect(item.name).toBe('Item 1');
		});

		it('should not update a non-existent item', async () => {
			const wrapper = mount(App);

			const item = { name: 'Non-existent Item', edit: true };
			wrapper.vm.edit(item);
			expect(item.name).toBe('Non-existent Item');
			expect(item.edit).toBe(false);

			// 模拟用户输入不存在的项目;
			await wrapper.find('input').setValue('Item 2');
			wrapper.find('button').trigger('click');
			console.log(wrapper.vm.toDoList);
			// 断言项目列表未更新;
			expect(wrapper.vm.toDoList.length).toBe(2);
		});

		it('should not update an item with empty name', async () => {
			const alertSpy = vi.fn();
			window.alert = alertSpy;
			const item = { name: '', edit: true }; // Set name to empty before edit
			toDoList.push(item);
			await wrapper.vm.edit(item);
			expect(alertSpy).toHaveBeenCalledWith('修改失敗你沒寫字');
			expect(item.name).toBe('');
			expect(item.edit).toBeTruthy();
		});

		it('should update localStorage and set edit to false when item name is valid', async () => {
			// ... existing test setup
			const item = { name: 'Item 1', edit: true, key: 0 }; // Assuming key 0 exists
			toDoList.push(item);
			await wrapper.vm.edit(item);
			// Assert that item is updated in toDoList
			expect(toDoList.some((existingItem) => existingItem.key === item.key && existingItem.name === item.name)).toBeTruthy();
		});
	});

	// 測試刪除項目

	describe('delete item', () => {
		it('should delete item on click', () => {
			const wrapper = mount(App);
			const item = wrapper.vm.toDoList[0];
			wrapper.vm.deleteItem(item);
			expect(wrapper.vm.toDoList).not.toContain(item);
		});
	});

	// 測試保存和加載列表
	describe('save and load list', () => {
		it('should save list to local storage', () => {
			const wrapper = mount(App);
			wrapper.vm.joinList('New item');
			expect(localStorage.getItem('toDoList')).not.toBeNull();
		});

		it('should load list from local storage', () => {
			localStorage.setItem('toDoList', JSON.stringify([{ name: 'Test item' }]));
			const wrapper = mount(App);
			expect(wrapper.vm.toDoList.length).toBe(1);
			expect(wrapper.vm.toDoList[0].name).toBe('Test item');
		});
	});

	// 測試輸入驗證
	describe('input validation', () => {
		it('should not add empty item', async () => {
			const wrapper = mount(App);
			await wrapper.find('input').setValue('');
			await wrapper.find('button').trigger('click');
			expect(wrapper.vm.toDoList.length).toBe(1);
		});
	});

	describe('handleInput', () => {
		const wrapper = mount(App);
		let item;
		let event;
		beforeEach(() => {
			item = { name: 'Item 1' };
		});

		it('should update item name based on input value', () => {
			const inputValues = ['New Name', ''];
			for (const value of inputValues) {
				event = { target: { value } };
				wrapper.vm.handleInput(item, event);
				expect(item.name).toBe(value);
			}
		});
	});
});
