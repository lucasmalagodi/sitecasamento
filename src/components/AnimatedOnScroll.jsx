import { useEffect, useRef, useState } from 'react';

const AnimatedOnScroll = ({ 
  children, 
  animation = 'fade-in', 
  threshold = 0.1,
  delay = 0,
  triggerOnce = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
          
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: threshold
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce, delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${isVisible ? animation : 'opacity-0'}`}
    >
      {children}
    </div>
  );
};

export default AnimatedOnScroll; 