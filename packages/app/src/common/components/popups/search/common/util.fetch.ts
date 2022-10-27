import { pipe, map } from 'rxjs';
import { updateResultTerm } from '@/store/action';

const test = [
  "testing",
  "sadasddasd",
  "asdsad",
  "sadfasdd",
  "tesssdasd",
  "asdsfssd"
];

const fetchSearch = (initialTerm: string) => pipe(
  map(term => new RegExp(`^${term}`)),
  map(term => test.filter(t => t.match(term))),
  map(list => list.length
    ? updateResultTerm([initialTerm, ...list])
    : updateResultTerm(list)
  )
);

export default fetchSearch;
