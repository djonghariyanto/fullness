const SHORTDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SHORTMONTHS = MONTHS.map(m => m.substring(0, 3));

const toDoubleDigits: (num: number) => string = (num) => num < 10?`0${num}`:`${num}`;

export const toDDMMYYYY = (json: string) => {
  const date = new Date(json);

  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export type GenerateDateByMonth = (date: Date, options?: { operand?: number, existingDates?: string[] }) => { dates: DateDetail[], current: Date };

export const getMonthInText: (index: number) => string = (index) => MONTHS[index];

export const getTimeInText: (date: Date) => string = (date) => `${toDoubleDigits(date.getHours())}:${toDoubleDigits(date.getMinutes())}`;
 
const previousMonthId = 'previous-month-id';
const currentMonthId = 'current-month-id';
const nextMonthId = 'next-month-id';

export interface DateDetail {
  id: number,
  alt: string,
  json: string,
  time: number,
  display: number,
  activated: boolean,
  expired: boolean,
  selected: boolean
}

export { previousMonthId, currentMonthId, nextMonthId, SHORTDAYS, SHORTMONTHS, MONTHS };
