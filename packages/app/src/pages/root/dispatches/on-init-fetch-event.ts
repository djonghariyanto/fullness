import { of } from 'rxjs';
import { fetchEvent } from '@/store/action';

const onInitFetchEvent = () => () => of(fetchEvent());

export default onInitFetchEvent;
