import { motion } from "framer-motion";

const LetterReveal = ({
  text,
  className = "",
  delay = 0.025,
}) => {
  const letters = text.split("");

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      filter: "blur(6px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      style={{
        display: "inline",
        whiteSpace: "pre-wrap",
      }}
    >
      {letters.map((char, index) => (
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

export default LetterReveal;