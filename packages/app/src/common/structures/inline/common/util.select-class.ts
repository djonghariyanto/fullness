import { default as _ } from '../main.css';

const selectClass = (selector: "apart") => {
  switch(selector) {
    case 'apart': return _["inline--apart"];
    default: return "";
  }
}

export default selectClass;
