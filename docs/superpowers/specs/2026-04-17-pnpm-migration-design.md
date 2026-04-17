# pnpm 遷移與版本升級設計文件

**日期**：2026-04-17  
**範疇**：Aligno-v1 專案 — 完成從 npm 到 pnpm 的遷移，並修正 devDependencies 版本不一致問題

---

## 背景

專案已部分完成遷移：pnpm 已安裝、`pnpm-lock.yaml` 已生成、主要套件（Next.js 16、React 19）已升級。  
但仍有殘留問題需要清理。

---

## 目標

1. 移除 npm 殘留物（`package-lock.json`）
2. 補齊 `package.json` 的 `packageManager` 欄位
3. 統一 devDependencies 版本與已升級的主套件一致

---

## 修改清單

### 1. 刪除 `package-lock.json`
npm 的 lock 檔已無用，保留會造成混淆。

### 2. 新增 `packageManager` 欄位
```json
"packageManager": "pnpm@10.29.2"
```
讓 Node.js Corepack 知道此專案使用 pnpm，防止誤用 npm/yarn。

### 3. 更新 devDependencies

| 套件 | 舊版本 | 新版本 |
|------|--------|--------|
| `@types/react` | `^18` | `^19` |
| `@types/react-dom` | `^18` | `^19` |
| `@next/bundle-analyzer` | `^15.1.7` | `^16.0.0` |
| `eslint-config-next` | `14.2.5` | 配合 Next.js 16 最新版 |

### 4. 執行 `pnpm install`
重新安裝以更新 `pnpm-lock.yaml`，確保 lock 檔與 `package.json` 同步。

---

## 不在範圍內

- 不升級主版本（Next.js 保持 16.x、React 保持 19.x）
- 不修改 CI/CD（純本地環境）
- 不修改 `pnpm-workspace.yaml` 的安全性 overrides

---

## 成功標準

- 沒有 `package-lock.json`
- `pnpm install` 執行成功
- `pnpm run build` 或 `pnpm run dev` 正常運作
