const checkEqual: (x: string | string[], y: string) => boolean = (x, y) =>
  Array.isArray(x) ? x.includes(y) : x === y;

export default checkEqual;

