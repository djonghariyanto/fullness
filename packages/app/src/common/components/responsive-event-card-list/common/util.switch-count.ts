import { default as _ } from '../main.css';

const base = _["responsive-event-card-list"];
const one = [base, _["responsive-event-card-list--one"]].join(' ');
const two = [base, _["responsive-event-card-list--two"]].join(' ');
const three = [base, _["responsive-event-card-list--three"]].join(' ');
const four = [base, _["responsive-event-card-list--four"]].join(' ');
const five = [base, _["responsive-event-card-list--five"]].join(' ');

const switchCount = (count: number) => {
  switch (count) {
    case 1: return one;
    case 2: return two;
    case 3: return three;
    case 4: return four;
    case 5: return five;
  }
}

export default switchCount;
