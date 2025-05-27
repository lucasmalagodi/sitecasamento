import { useEffect } from 'react';

const useScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      // Salva a posição atual do scroll
      const scrollY = window.scrollY;
      // Adiciona a classe que trava o scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Recupera a posição do scroll
      const scrollY = document.body.style.top;
      // Remove a classe que trava o scroll
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Restaura a posição do scroll
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    // Cleanup function
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isLocked]);
};

export default useScrollLock; 