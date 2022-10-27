import { closeDialog } from '@/store/action';

const keyHandler = (key: string) => {
  switch(key) {
    case 'Escape':
      return closeDialog({ withConfirmation: false });
  }
}

export default keyHandler;