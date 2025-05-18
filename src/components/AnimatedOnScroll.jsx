import { useEffect, useRef, useState } from 'react';

const AnimatedOnScroll = ({ 
  children, 
  animation = 'fade-in', 
  threshold = 0.2,
  delay = 0,
  triggerOnce = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            // Se triggerOnce for verdadeiro, desconecta o observer após detectar
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          // Se não for triggerOnce, resetamos a visibilidade quando sair da tela
          setIsVisible(false);
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: threshold // Porcentagem do elemento que precisa estar visível
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
  }, [threshold, triggerOnce]);

  // Estilo inline para o delay de animação
  const style = delay ? { animationDelay: `${delay}s` } : {};

  return (
    <div
      ref={ref}
      className={isVisible ? animation : 'opacity-0'}
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimatedOnScroll; 