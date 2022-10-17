import { GenerateDateByMonth, DateDetail } from '../';

const generateDateByMonth: GenerateDateByMonth = (date, options) => {
    const { existingDates, operand } = Object.assign({}, { operand: 0, existingDates: <string[]>[] }, options),  
        now = new Date(),
        current_date = new Date(date.getFullYear(), date.getMonth() + operand, 1),
        month = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0),
        month_length = month.getDate(),
        start_day = new Date(current_date.getFullYear(), current_date.getMonth(), 1 - current_date.getDay(), 23, 59, 59),
        dates: DateDetail[] = [];

    now.setHours(0, 0, 0, 0);
    for(let i = 1 - current_date.getDay(); i <= (42 - current_date.getDay()); i++) {
        const j = start_day.getDate(),
            expired = now > start_day;

        let jsonDate: string, 
          id = 0, 
          alt = start_day.toJSON();

        start_day.setHours(0, 0, 0, 0);
        jsonDate = start_day.toJSON();
        dates.push({
            id: id++,
            alt: alt,
            json: jsonDate,
            time: start_day.getTime(), 
            display: i > 0 && i <= month_length?j:null,
            activated: i > 0 && i <= month_length,
            expired,
            selected: existingDates.includes(jsonDate)
        });
        start_day.setDate(j + 1);
    }

    return {
        dates: dates,
        current: month
    };
}

export default generateDateByMonth;
