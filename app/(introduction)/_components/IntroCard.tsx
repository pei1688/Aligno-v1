import { motion } from "motion/react";

type featureProps = {
  title: string;
  description: string;
  color: string;
};

const IntroCard = ({ feature }: { feature: featureProps }) => {
  return (
    <motion.div
      whileHover="hover"
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      className="relative z-50 cursor-pointer overflow-hidden rounded-lg border-l-4 border-l-neutral-800 bg-aligno-200/50 p-6 text-aligno-800 transition-all hover:shadow-lg"
    >
      <div className="relative z-10">
        <motion.h3
          initial={{ scale: 0.85 }}
          variants={{
            hover: {
              scale: 1,
            },
          }}
          transition={{
            duration: 1,
            ease: "backInOut",
          }}
          className="text-xl font-semibold"
        >
          {feature.title}
        </motion.h3>
        <p className="mt-2 text-aligno-600">{feature.description}</p>
      </div>
      <Background color={feature.color} />
    </motion.div>
  );
};

const Background = ({ color }: { color: string }) => {
  return (
    <motion.svg
      width="143"
      height="143"
      viewBox="0 0 143 143"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 -left-8 -top-5 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle cx="71.5" cy="71.5" r="71.5" fill={`${color}`} />
    </motion.svg>
  );
};

export default IntroCard;
