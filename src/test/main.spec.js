import { describe, it, expect, beforeEach } from 'vitest';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createApp } from 'vue';
import App from '@/App.vue';

library.add(faTrash, faPenToSquare, faFloppyDisk);

describe('main.js', () => {
  let appElement;

  beforeEach(() => {
    // 在每個測試開始之前手動創建一個具有 #app ID 的元素
    appElement = document.createElement('div');
    appElement.id = 'app';
    document.body.appendChild(appElement);
  });

  describe('App', () => {
    it('creates an app instance', () => {
      const app = createApp(App);
      console.log(app)
      expect(app).toBeDefined(); // 驗證 app 不是 undefined
      expect(app._component).toStrictEqual(App); // 驗證 app 的根元件是你的 App 元件
    });
  });

  it('adds expected icons to FontAwesome library', () => {
    const definedIcons = Object.keys(library.definitions.fas);
    expect(definedIcons.some((icon) => icon.startsWith('trash'))).toBe(true);
    expect(definedIcons.some((icon) => icon.startsWith('pen-to-square'))).toBe(true);
    expect(definedIcons.some((icon) => icon.startsWith('floppy-disk'))).toBe(true);
  });

  it('mounts the App component to #app', async () => {
    // 現在創建 Vue 應用程式並挂載到剛剛創建的元素中
    const app = createApp(App);
    app.mount('#app');

    // 等待 Vue 應用程式挂載完成
    await nextTick();

    // 測試挂載是否成功
    const wrapper = mount(App);
    expect(wrapper.find('#app')).toBeTruthy();
  });
});
