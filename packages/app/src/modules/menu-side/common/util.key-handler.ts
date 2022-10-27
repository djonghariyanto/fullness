import { toggleMenuSide } from '@/store/action';

const keyHandler = (key: string) => {
  switch(key) {
    case 'Escape':
      return toggleMenuSide();
  }
}

export default keyHandler;
