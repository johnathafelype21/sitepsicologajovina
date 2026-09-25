import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const selector = '.motion-left, .motion-right, .motion-rise, .motion-scale, .motion-fade';

export default function MotionObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

    if (reduced) {
      elements.forEach((el) => el.classList.add('motion-visible'));
      return;
    }

    elements.forEach((el) => el.classList.remove('motion-visible'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('motion-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
