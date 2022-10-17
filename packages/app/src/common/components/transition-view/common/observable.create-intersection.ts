import { Observable, Subscriber } from 'rxjs';

const createIntersection = (element: HTMLElement) =>
  new Observable((subscriber: Subscriber<IntersectionObserverEntry[]>) => {
    const observer = new IntersectionObserver(
      subscriber.next.bind(subscriber),
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      });
    observer.observe(element);
  });

export default createIntersection;
