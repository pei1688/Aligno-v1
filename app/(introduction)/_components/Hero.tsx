"use client";
import Image from "next/image";
import { motion } from "motion/react";
const Hero = () => {
  return (
    <div className="relative flex w-full justify-center bg-neutral-300">
      <div className="relative w-full max-w-[700px]">
        <Image
          src="/img/work-home.png"
          alt="img"
          className="rounded-md object-cover"
          width={700}
          height={150}
        />
        <svg
          // width="251"
          height="127"
          viewBox="0 0 271 127"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-[21%] top-[30%] md:left-[25%] md:top-[30%] w-full max-w-[150px] sm:max-w-[200px] md:max-w-[300px]"
        >
          <g filter="url(#filter0_d_10_2)">
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 5,
              }}
              d="M121 78L122.42 78.4834L121 78ZM71 16L72.4838 16.2198L72.4838 16.2198L71 16ZM167 78L167.173 79.4899L167 78ZM266.486 35.2068C266.6 34.3863 266.027 33.6286 265.207 33.5143L251.836 31.6525C251.015 31.5383 250.258 32.1108 250.143 32.9313C250.029 33.7518 250.602 34.5096 251.422 34.6239L263.307 36.2788L261.653 48.1641C261.538 48.9846 262.111 49.7424 262.931 49.8566C263.752 49.9709 264.51 49.3984 264.624 48.5778L266.486 35.2068ZM4.59435 112.444C19.5813 116.654 44.7976 120.188 68.3427 116.734C91.8709 113.283 114.154 102.765 122.42 78.4834L119.58 77.5166C111.846 100.235 90.9624 110.384 67.9073 113.766C44.8691 117.145 20.0854 113.679 5.40565 109.556L4.59435 112.444ZM122.42 78.4834C132.937 47.5884 121.557 22.4559 106.712 9.65006C99.329 3.28166 90.923 -0.171451 83.8239 0.48647C80.2405 0.818563 76.9875 2.2043 74.4537 4.79259C71.9283 7.3724 70.218 11.043 69.5162 15.7802L72.4838 16.2198C73.1156 11.9551 74.6123 8.91915 76.5975 6.8912C78.5745 4.87172 81.1358 3.74845 84.1007 3.47367C90.0981 2.91785 97.7245 5.85957 104.752 11.9217C118.727 23.9769 129.68 47.8481 119.58 77.5166L122.42 78.4834ZM69.5162 15.7802C67.4805 29.5209 69.1665 40.8581 73.7994 50.0164C78.4327 59.1755 85.9474 66.0249 95.3432 70.9029C114.075 80.6277 140.428 82.5998 167.173 79.4899L166.827 76.51C140.33 79.591 114.683 77.5632 96.7255 68.2403C87.7766 63.5944 80.7741 57.158 76.4764 48.6622C72.1783 40.1657 70.5195 29.479 72.4838 16.2198L69.5162 15.7802ZM167.173 79.4899C188.684 76.9887 202.128 74.7213 215.849 68.7504C229.534 62.7945 243.417 53.1873 265.904 36.1968L264.096 33.8032C241.583 50.8126 227.966 60.2055 214.651 65.9996C201.372 71.7787 188.316 74.0113 166.827 76.51L167.173 79.4899Z"
              stroke="#2e2e2e"
              strokeWidth="2"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_10_2"
              x="0.594353"
              y="0.406876"
              width="269.906"
              height="125.724"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.666667 0 0 0 0 0.652778 0 0 0 0 0.652778 0 0 0 0.58 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_10_2"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_10_2"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
