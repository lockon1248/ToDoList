# ToDoList

使用 Vue 3 + Vite 打造的待辦清單，內建多語系切換與 localStorage 永續化，搭配 Ant Design Vue、Tailwind CSS 及 FontAwesome 呈現輕量介面，並以 Vitest 撰寫單元測試。

## Demo
- https://to-do-list-gules-delta.vercel.app/

## 功能
- 新增 / 編輯 / 刪除待辦：支援行內編輯，防呆空值並以圖示切換編輯/儲存。
- 資料永續化：使用瀏覽器 `localStorage`（key: `toDoList`），重新整理不丟資料，清除該 key 可重置。
- 多語系介面：繁中 / 簡中 / 英文，網址可帶 `?locale=zh_TW|zh_CN|en` 決定預設語系，頁面上可即時切換。
- UI 與動效：使用 Ant Design Vue 控件、Tailwind utility class 與列表進出場動畫，支援最小 300px 寬的響應式版面。

## 技術棧
- Vue 3 (Composition API) + TypeScript
- Vite 7
- Ant Design Vue、Tailwind CSS、FontAwesome
- vue-i18n
- Vitest + @vue/test-utils（含 coverage）
- Docker（Nginx 容器提供靜態檔案）

## 專案結構
```
src/
  App.vue                # 主畫面與待辦邏輯
  main.ts                # App 啟動、i18n 掛載、FontAwesome 註冊
  utils/i18n.ts          # locale 解析與 i18n 初始化
  locales/               # 繁中/簡中/英文詞條
  assets/styles/         # Tailwind base 與全域樣式
  type/                  # 型別定義 (ToDoItem)
  test/                  # Vitest 單元測試
```

## 快速開始
需使用 Node.js 18+ (建議 LTS)，確保相容 Vite 7 與依賴套件。
```bash
npm install
npm run dev    # http://localhost:5174
```

## 常用指令
- 開發伺服器：`npm run dev`
- 生產建置：`npm run build`（輸出至 `dist/`）
- 本地預覽：`npm run preview`
- 單元測試：`npm run test:unit`
- 覆蓋率報告：`npm run coverage`

## Docker 部署
```bash
docker build -t todo-list .
docker run -d -p 8080:80 todo-list
```
