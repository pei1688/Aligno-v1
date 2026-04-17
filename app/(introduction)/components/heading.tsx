import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AuthButton from "./auth-button";

const Heading = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  return (
    <header className="py-10 text-left text-aligno-700 lg:py-20">
      <div className="relative mb-6 inline-block">
        <h1 className="relative text-5xl font-medium leading-[1.4]">
          隨時隨地管理、整理並完成
          <span className="relative inline-block">
            您的任務
            <svg
              width="200"
              height="12"
              viewBox="0 0 263 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 sm:left-[55%] lg:left-[60%]"
            >
              <path
                d="M1 8.99999C62 4.33332 199.6 -2.20001 262 8.99999"
                stroke="#e47f45"
                strokeWidth="5"
              />
            </svg>
          </span>
        </h1>
      </div>
      <h2 className="mb-6 text-lg sm:text-xl">
        讓工作井然有序，透過 Aligno 提升效率，告別混亂！
      </h2>
      <AuthButton isLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Heading;
