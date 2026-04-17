"use client";

import IntroCard from "./intro-card";

const features = [
  {
    title: "視覺化管理",
    description: "直觀的看板模式，輕鬆掌握專案進度",
    color: "#A3ACA9",
  },
  {
    title: "團隊協作",
    description: "指派任務、留言討論，提高工作效率",
    color: "#E2DCD0",
  },
  {
    title: "靈活自定義",
    description: "自訂工作流程，符合你的團隊需求",
    color: "#DCDDD8",
  },
];
const Introduction = () => {
  return (
    <div className="my-12 flex h-full w-full items-start justify-center">
      <div className="flex w-full max-w-[1280px] flex-col gap-6 px-16">
        <div className="flex w-full flex-col items-start gap-4 text-aligno-800">
          <h2 className="text-3xl font-semibold">您的提升效率工具</h2>
          <p className="text-lg">
            Aligno 讓你的團隊協作更加順暢，專案管理更加輕鬆
          </p>
        </div>
        <section className="mt-8 flex flex-col space-y-4">
          <div className="grid grid-cols-1 gap-6 pb-20 md:grid-cols-3">
            {features.map((feature, index) => (
              <IntroCard key={index} feature={feature} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Introduction;
