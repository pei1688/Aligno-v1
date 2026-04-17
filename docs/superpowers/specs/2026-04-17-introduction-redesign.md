# Introduction Page 極簡 SaaS 重設計文件

**日期**：2026-04-17  
**範疇**：`app/(introduction)` 所有元件的視覺重設計，風格為極簡淺色系 SaaS（Notion/Stripe 風格），移除所有 motion/framer-motion 依賴

---

## 設計原則

- **配色**：白底 (`bg-white`)，深灰文字 (`aligno-800`)，輔助灰 (`aligno-500`)
- **無動畫**：移除所有 `motion/react` 與 `framer-motion`，hover 效果僅用 CSS transition
- **排版**：置中 Hero，內容最大寬度 `max-w-5xl`，充足留白

---

## 元件設計規格

### 1. Navbar（`Navbar.tsx`）

- 背景：`bg-white border-b border-gray-100`
- Logo：`text-aligno-800`，保留現有 SVG
- 未登入按鈕（`登入`）：`border border-aligno-600 text-aligno-700 hover:bg-gray-50`
- 已登入按鈕（`前往您的工作區`）：`bg-aligno-800 text-white hover:bg-aligno-600`

### 2. Hero 區（`Heading.tsx` + `Hero.tsx`）

**佈局變更**：從左文右圖雙欄，改為置中單欄

**`Heading.tsx`**
- 外層：`text-center max-w-3xl mx-auto px-4 pt-16 pb-8`
- 頂部 badge：`inline-block rounded-full bg-gray-100 px-4 py-1 text-sm text-aligno-500 mb-6`，文字「專案管理 · 團隊協作」
- H1：`text-5xl lg:text-6xl font-semibold text-aligno-800 leading-tight`，維持現有文案
- 副標 H2：`mt-4 text-lg text-aligno-500`
- CTA 按鈕：`mt-8 bg-aligno-800 text-white hover:bg-aligno-600 rounded-lg px-6 py-3 transition-colors`

**`Hero.tsx`**
- 移除 `"use client"` 與 `motion` 匯入
- 外層：`max-w-5xl mx-auto px-4 pb-16`
- 圖片容器：`rounded-xl border border-gray-200 shadow-xl overflow-hidden`
- 移除所有 SVG 路徑動畫

**`page.tsx`**
- 整體背景：`bg-white`（從 `bg-neutral-300` 改為 `bg-white`）
- 移除 `lg:flex-row` 雙欄佈局，改為單欄垂直排列

### 3. 特色卡片區（`Introduction.tsx` + `IntroCard.tsx`）

**`Introduction.tsx`**
- 外層背景：`bg-gray-50`，上下 padding `py-20`
- 標題區置中：`text-center mb-12`
- H2：`text-3xl font-semibold text-aligno-800`
- 副標 p：`mt-3 text-lg text-aligno-500`

**`IntroCard.tsx`**
- 完全移除 `motion` 依賴（`motion/react` import 刪除）
- 移除 `Background` SVG 圓形元件
- 改為純 `div`：`rounded-xl border border-gray-100 bg-white p-6 border-l-4 border-l-aligno-600 hover:shadow-md transition-shadow duration-200 cursor-pointer`
- H3：`text-xl font-semibold text-aligno-800`
- p：`mt-2 text-aligno-500`

### 4. Footer（`Footer.tsx`）

- 外層：`bg-gray-50 border-t border-gray-100 py-6`
- 文字：`text-center text-sm text-aligno-400`

---

## 移除項目

| 檔案 | 移除內容 |
|------|---------|
| `Hero.tsx` | `motion` import、`"use client"`、motion SVG 路徑動畫 |
| `IntroCard.tsx` | `motion` import、`"use client"`、`motion.div`、`motion.h3`、`motion.svg`、`Background` 元件 |
| `Introduction.tsx` | `"use client"` |

---

## 不在範圍內

- 不修改文案內容
- 不修改路由或資料邏輯
- 不新增新頁面或元件
- 不處理 RWD 斷點以外的功能
