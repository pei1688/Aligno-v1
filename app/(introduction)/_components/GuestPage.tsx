"use client";
import { Button } from "@/components/ui/button";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

const GuestPage = () => {
  return (
    <div className="text-aligno-200">
      <header className="py-20 text-center">
        <h2 className="text-4xl font-extrabold">
          簡單、靈活、高效的專案管理工具
        </h2>
        <p className="mt-4 text-lg text-gray-200">
          讓你的團隊協作更加順暢，專案管理更加輕鬆
        </p>
        <Button
          variant="transparent"
          className="mt-6 rounded-full bg-aligno-200 px-6 py-3 font-bold text-aligno-600 shadow-lg hover:bg-aligno-200/80"
        >
          <LoginLink>開始免費試用</LoginLink>
        </Button>
      </header>

      {/* 介紹文 */}
      <section className="grid grid-cols-1 gap-6 px-8 pb-20 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-lg bg-aligno-200 p-6 text-aligno-800 shadow-lg"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-aligno-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-aligno-300">
        &copy; {new Date().getFullYear()} Aligno. All rights reserved.
      </footer>
    </div>
  );
};

export default GuestPage;

const features = [
  { title: "視覺化管理", description: "直觀的看板模式，輕鬆掌握專案進度" },
  { title: "團隊協作", description: "指派任務、留言討論，提高工作效率" },
  { title: "靈活自定義", description: "自訂工作流程，符合你的團隊需求" },
];
