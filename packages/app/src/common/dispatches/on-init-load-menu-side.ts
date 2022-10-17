import { of } from 'rxjs';
import { map } from'rxjs/operators';

import { setMenuSideComponent } from '@/store/action';

const onInitLoadMenuSide = (Component: React.ReactElement) => 
  () => {
    return of({ Component })
      .pipe(
        map(setMenuSideComponent)
      );
  }

export default onInitLoadMenuSide;
