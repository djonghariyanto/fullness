import { closeDialog } from '@/store/action';

export const defaultedKeys = ['Escape'];

const keyHandler = (key: string) => {
  switch(key) {
    case 'Escape':
      return closeDialog({ withConfirmation: false });
  }
}

export default keyHandler;
