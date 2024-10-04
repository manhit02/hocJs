
import { useEffect, useState, useRef } from "react";

const useIntersectionObserver = (
  threshold = 0,
  rootMargin = "",
  heightElement = ""
): [boolean, React.RefObject<HTMLDivElement>] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRendered) {
          if (count === 1) {
            setTimeout(() => {
              const element = entry.target;

              const newaacbas = element.className
                .split(heightElement)
                .join(" ");
              element.className = `${newaacbas} transition-opacity opacity-100 min-h-[auto] `;
            }, 500);
          }
          setIsIntersecting(entry.isIntersecting);
          if (count > 1) setHasRendered(true);
          else setCount((prevCount) => ++prevCount);
        }
      },
      {
        // root: document.body,
        // Margin to when element should take action
        rootMargin: rootMargin,
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, hasRendered, count]);

  return [isIntersecting || hasRendered, ref];
};

export default useIntersectionObserver;
