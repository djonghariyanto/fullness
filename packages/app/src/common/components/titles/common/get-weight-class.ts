import Style from '@/common/css';

export type Weight = 'regular' | 'medium' | 'semi-bold' | 'bold';

const getWeigthClass: (weight: Weight) => string = weight => {
  switch (weight) {
    case 'regular': return Style["--weight-regular"];
    case 'medium': return Style["--weight-medium"];
    case 'semi-bold': return Style["--weight-semi-bold"];
    case 'bold': return Style["--weight-bold"];
  }
}

export default getWeigthClass;
