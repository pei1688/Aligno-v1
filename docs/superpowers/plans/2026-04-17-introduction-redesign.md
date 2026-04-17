# Introduction Page 極簡 SaaS 重設計 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 Introduction 頁面重設計為極簡淺色系 SaaS 風格（白底深字，Notion/Stripe 風格），並完全移除所有 motion/framer-motion 依賴。

**Architecture:** 純 UI 重設計，不涉及資料邏輯。Hero 從左文右圖雙欄改為置中單欄。IntroCard 和 Hero 移除所有 motion 依賴，改為純 CSS Tailwind hover。

**Tech Stack:** Next.js 16、Tailwind CSS、aligno 自訂色票（`tailwind.config.ts` 已定義）

---

## 檔案清單

| 檔案 | 動作 |
|------|------|
| `app/(introduction)/page.tsx` | Modify — 背景色、移除雙欄佈局 |
| `app/(introduction)/_components/Navbar.tsx` | Modify — 白底、按鈕樣式 |
| `app/(introduction)/_components/Heading.tsx` | Modify — 置中、badge、新 CTA 樣式 |
| `app/(introduction)/_components/Hero.tsx` | Modify — 移除 motion 和 "use client"，加陰影邊框 |
| `app/(introduction)/_components/IntroCard.tsx` | Modify — 完全移除 motion，改為純 div |
| `app/(introduction)/_components/Introduction.tsx` | Modify — 移除 "use client"，灰底、置中標題 |

---

### Task 1: 更新 page.tsx 整體佈局

**Files:**
- Modify: `app/(introduction)/page.tsx`

- [ ] **Step 1: 替換 page.tsx 內容**

```tsx
import Footer from "./_components/Footer";
import Heading from "./_components/Heading";
import Hero from "./_components/Hero";
import Introduction from "./_components/Introduction";

export const metadata = {
  title: "Welcome to Aligno",
};

export default async function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3rem)] w-full flex-col bg-white">
      <div className="flex w-full flex-col items-center">
        <Heading />
        <Hero />
      </div>
      <Introduction />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: 確認 dev server 無編譯錯誤**

```bash
pnpm dev
```

Expected: 終端機無紅字錯誤，瀏覽器可開啟 `http://localhost:3000`

- [ ] **Step 3: Commit**

```bash
git add app/\(introduction\)/page.tsx
git commit -m "feat: introduction page - white bg, single column layout"
```

---

### Task 2: 更新 Navbar

**Files:**
- Modify: `app/(introduction)/_components/Navbar.tsx`

- [ ] **Step 1: 替換 Navbar.tsx 內容**

```tsx
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  const { user } = useKindeBrowserClient();

  return (
    <nav className="flex h-[3rem] w-full items-center justify-between border-b border-gray-100 bg-white px-8 md:px-16">
      <Link href="/" className="flex items-center gap-3 text-xl">
        <Image src={"/logo.svg"} alt="logo" width={28} height={28} />
        <span className="font-semibold text-aligno-800">ALIGNO</span>
      </Link>
      {user ? (
        <Link href={"/workspace"}>
          <Button className="bg-aligno-800 text-white hover:bg-aligno-600 transition-colors">
            前往您的工作區
          </Button>
        </Link>
      ) : (
        <Button
          asChild
          variant="outline"
          className="border-aligno-600 text-aligno-700 hover:bg-gray-50 transition-colors"
        >
          <LoginLink>登入</LoginLink>
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
```

- [ ] **Step 2: 確認 Navbar 外觀**

瀏覽器開啟 `http://localhost:3000`，確認：
- Navbar 背景為白色，底部有細線
- Logo 文字為深灰色
- 登入按鈕為外框樣式

- [ ] **Step 3: Commit**

```bash
git add app/\(introduction\)/_components/Navbar.tsx
git commit -m "feat: introduction navbar - white bg, outline login button"
```

---

### Task 3: 更新 Heading（Hero 文字置中）

**Files:**
- Modify: `app/(introduction)/_components/Heading.tsx`

- [ ] **Step 1: 替換 Heading.tsx 內容**

```tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AuthButton from "./auth-button";

const Heading = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  return (
    <header className="w-full max-w-3xl px-4 pt-20 pb-10 text-center">
      <div className="mb-6 inline-block rounded-full bg-gray-100 px-4 py-1 text-sm text-aligno-500">
        專案管理 · 團隊協作
      </div>
      <h1 className="text-5xl font-semibold leading-tight text-aligno-800 lg:text-6xl">
        隨時隨地管理、整理並完成
        <span className="block">您的任務</span>
      </h1>
      <h2 className="mt-5 text-lg text-aligno-500">
        讓工作井然有序，透過 Aligno 提升效率，告別混亂！
      </h2>
      <AuthButton isLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Heading;
```

- [ ] **Step 2: 確認 Heading 外觀**

瀏覽器開啟 `http://localhost:3000`，確認：
- 標題置中、灰色 badge 在標題上方
- H1 文字大、深色
- 副標文字為中灰色

- [ ] **Step 3: Commit**

```bash
git add app/\(introduction\)/_components/Heading.tsx
git commit -m "feat: introduction heading - centered, badge, new typography"
```

---

### Task 4: 更新 AuthButton CTA 樣式

**Files:**
- Modify: `app/(introduction)/_components/auth-button.tsx`

- [ ] **Step 1: 替換 auth-button.tsx 內容**

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

interface AuthButtonProps {
  isLoggedIn: boolean;
}

export const AuthButton = ({ isLoggedIn }: AuthButtonProps) => {
  return (
    <Button className="mt-8 bg-aligno-800 px-8 py-3 text-base text-white transition-colors hover:bg-aligno-600 rounded-lg">
      {isLoggedIn ? (
        <Link href="/workspace">前往您的看板</Link>
      ) : (
        <LoginLink authUrlParams={{ post_login_redirect_url: "/workspace" }}>
          開始免費試用
        </LoginLink>
      )}
    </Button>
  );
};

export default AuthButton;
```

- [ ] **Step 2: 確認 CTA 按鈕外觀**

瀏覽器確認：
- 按鈕為深色填充（`aligno-800`）
- hover 變為稍淺深色（`aligno-600`）

- [ ] **Step 3: Commit**

```bash
git add app/\(introduction\)/_components/auth-button.tsx
git commit -m "feat: introduction CTA - dark filled button style"
```

---

### Task 5: 更新 Hero（移除 motion，加陰影邊框）

**Files:**
- Modify: `app/(introduction)/_components/Hero.tsx`

- [ ] **Step 1: 替換 Hero.tsx 內容**

```tsx
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full max-w-5xl px-4 pb-20">
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-xl">
        <Image
          src="/img/work-home.png"
          alt="Aligno 產品截圖"
          className="w-full object-cover"
          width={1200}
          height={675}
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
```

- [ ] **Step 2: 確認 Hero 外觀**

瀏覽器確認：
- 圖片全寬顯示，有圓角和陰影
- 無動畫 SVG 覆蓋其上
- `"use client"` 已移除（Server Component）

- [ ] **Step 3: Commit**

```bash
git add app/\(introduction\)/_components/Hero.tsx
git commit -m "feat: introduction hero - remove motion, add shadow border frame"
```

---

### Task 6: 更新 IntroCard（移除 motion，純 CSS hover）

**Files:**
- Modify: `app/(introduction)/_components/IntroCard.tsx`

- [ ] **Step 1: 替換 IntroCard.tsx 內容**

```tsx
type FeatureProps = {
  title: string;
  description: string;
};

const IntroCard = ({ feature }: { feature: FeatureProps }) => {
  return (
    <div className="cursor-pointer rounded-xl border border-gray-100 border-l-4 border-l-aligno-600 bg-white p-6 transition-shadow duration-200 hover:shadow-md">
      <h3 className="text-xl font-semibold text-aligno-800">{feature.title}</h3>
      <p className="mt-2 text-aligno-500">{feature.description}</p>
    </div>
  );
};

export default IntroCard;
```

- [ ] **Step 2: 確認 IntroCard 外觀**

瀏覽器滾動至特色區，確認：
- 卡片白底、左側深色線
- hover 時出現陰影，無任何 scale 動畫
- 無背景圓形 SVG

- [ ] **Step 3: Commit**

```bash
git add app/\(introduction\)/_components/IntroCard.tsx
git commit -m "feat: introduction card - remove motion, pure CSS hover shadow"
```

---

### Task 7: 更新 Introduction（移除 "use client"，灰底置中標題）

**Files:**
- Modify: `app/(introduction)/_components/Introduction.tsx`

- [ ] **Step 1: 替換 Introduction.tsx 內容**

```tsx
import IntroCard from "./IntroCard";

const features = [
  {
    title: "視覺化管理",
    description: "直觀的看板模式，輕鬆掌握專案進度",
  },
  {
    title: "團隊協作",
    description: "指派任務、留言討論，提高工作效率",
  },
  {
    title: "靈活自定義",
    description: "自訂工作流程，符合你的團隊需求",
  },
];

const Introduction = () => {
  return (
    <div className="w-full bg-gray-50 py-20">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-aligno-800">
            您的提升效率工具
          </h2>
          <p className="mt-3 text-lg text-aligno-500">
            Aligno 讓你的團隊協作更加順暢，專案管理更加輕鬆
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <IntroCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Introduction;
```

- [ ] **Step 2: 確認 Introduction 區塊外觀**

瀏覽器確認：
- 特色區背景為淡灰色（`bg-gray-50`）
- 標題與副標置中
- 3 欄卡片正常顯示

- [ ] **Step 3: Commit**

```bash
git add app/\(introduction\)/_components/Introduction.tsx
git commit -m "feat: introduction section - gray bg, centered heading, remove use client"
```

---

### Task 8: 更新 Footer

**Files:**
- Modify: `app/(introduction)/_components/Footer.tsx`

- [ ] **Step 1: 替換 Footer.tsx 內容**

```tsx
const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-100 bg-gray-50 py-6">
      <p className="text-center text-sm text-aligno-400">
        &copy; {new Date().getFullYear()} Aligno. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: 確認 Footer 外觀**

瀏覽器滾動至底部，確認：
- Footer 背景淡灰，有頂部細線
- 版權文字小、置中、中灰色

- [ ] **Step 3: 最終整頁視覺確認**

瀏覽器開啟 `http://localhost:3000`，完整瀏覽整頁，確認：
- 整頁白底無灰色背景殘留
- Navbar → Hero badge → H1 → CTA → 圖片 → 特色區 → Footer 視覺層次清晰
- 無任何 motion 動畫殘留
- 終端機無 TypeScript 或編譯錯誤

- [ ] **Step 4: Commit**

```bash
git add app/\(introduction\)/_components/Footer.tsx
git commit -m "feat: introduction footer - gray bg, top border, small text"
```
