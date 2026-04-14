import { useEffect, useRef, useState } from "react";

const Counter = ({ to, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const [startAnim, setStartAnim] = useState(false);
  const ref = useRef();

  // 👇 Detect when element is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartAnim(true);
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.5 } // 50% visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // 👇 Start counting only when visible
  useEffect(() => {
    if (!startAnim) return;

    let start = 0;
    const increment = to / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [startAnim, to, duration]);

  return <span ref={ref}>{count}</span>;
};

export default Counter;