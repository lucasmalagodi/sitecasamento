import { useEffect, useRef, useState } from 'react';

const AnimatedOnScroll = ({ 
  children, 
  animation = 'fade-in', 
  threshold = 0.1,
  delay = 0,
  triggerOnce = true
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsVisible(false);
    }, 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
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
      clearTimeout(initialTimer);
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, triggerOnce, delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${isVisible ? animation : 'opacity-0'}`}
      style={{ 
        willChange: 'opacity, transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedOnScroll; 