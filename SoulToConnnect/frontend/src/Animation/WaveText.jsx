import { motion } from "framer-motion";

const WaveText = ({
  text,
  className = "",
  delay = 0.04,
  once = true,
}) => {
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const child = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: [0, -10, 0],
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once }}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default WaveText;