# pnpm 遷移清理 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成從 npm 到 pnpm 的遷移，移除殘留物並統一 devDependencies 版本。

**Architecture:** 直接修改 `package.json`，刪除 `package-lock.json`，重新執行 `pnpm install` 讓 lock 檔同步。無需修改應用程式邏輯或建立新檔案。

**Tech Stack:** pnpm 10.29.2、Next.js 16.2.4、React 19.2.5

---

### Task 1: 刪除 package-lock.json

**Files:**
- Delete: `package-lock.json`

- [ ] **Step 1: 刪除 npm lock 檔**

```bash
rm package-lock.json
```

- [ ] **Step 2: 確認已刪除**

```bash
ls package-lock.json 2>/dev/null || echo "已刪除"
```

Expected: `已刪除`

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove npm package-lock.json"
```

---

### Task 2: 更新 package.json

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 新增 packageManager 欄位，更新 devDependencies**

將 `package.json` 修改為以下內容（僅列出需要變更的部分）：

在 `"private": true` 下方新增：
```json
"packageManager": "pnpm@10.29.2",
```

將 devDependencies 中的以下欄位更新：
```json
"@next/bundle-analyzer": "^16.2.4",
"@types/react": "^19",
"@types/react-dom": "^19",
"eslint-config-next": "^16.2.4",
```

最終 `package.json` 結果：
```json
{
  "name": "aligno-v1",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@10.29.2",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "@hello-pangea/dnd": "^17.0.0",
    "@hookform/resolvers": "^3.10.0",
    "@kinde-oss/kinde-auth-nextjs": "^2.4.6",
    "@prisma/client": "^6.2.1",
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-avatar": "^1.1.2",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.5",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-popover": "^1.1.5",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.1",
    "@tanstack/react-query": "^5.66.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.5.0",
    "lodash": "^4.17.21",
    "lucide-react": "^0.474.0",
    "motion": "^12.5.0",
    "neon": "^2.0.0",
    "next": "^16.2.4",
    "react": "^19.2.5",
    "react-dom": "^19.2.5",
    "sonner": "^1.7.2",
    "stripe": "^17.6.0",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "unsplash-js": "^7.0.19",
    "usehooks-ts": "^3.1.0",
    "zod": "^3.24.1",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^16.2.4",
    "@types/lodash": "^4.17.15",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^8",
    "eslint-config-next": "^16.2.4",
    "postcss": "^8",
    "prettier": "^3.5.3",
    "prettier-plugin-tailwindcss": "^0.6.11",
    "prisma": "^6.2.1",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "chore: add packageManager field and align devDependencies versions"
```

---

### Task 3: 重新安裝套件並驗證

**Files:**
- Modify: `pnpm-lock.yaml`（自動更新）

- [ ] **Step 1: 安裝更新的套件**

```bash
pnpm install
```

Expected: 輸出包含 `Done in ...` 或 `Packages: +N`，無 error

- [ ] **Step 2: 確認 pnpm-lock.yaml 已更新**

```bash
git diff --stat pnpm-lock.yaml
```

Expected: 顯示 pnpm-lock.yaml 有變更（若有版本更動）

- [ ] **Step 3: 驗證 dev server 可啟動（選做）**

```bash
pnpm dev
```

Expected: 看到 `▲ Next.js 16.x.x` 並且 `Local: http://localhost:3000`

按 `Ctrl+C` 停止。

- [ ] **Step 4: Commit lock 檔變更**

```bash
git add pnpm-lock.yaml
git commit -m "chore: update pnpm-lock.yaml after devDependencies upgrade"
```
