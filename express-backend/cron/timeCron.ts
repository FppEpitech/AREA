import axios from 'axios';

export async function isWorldTime(userId: number, value_json: string, data: any): Promise<boolean> {
    const { city, continent, time } = JSON.parse(value_json);
    const WorldTimeAPI: string = `https://timeapi.io/api/time/current/zone?timeZone=${continent?.value}%2F${city?.value}`;

    try {
        const response = await axios.get(WorldTimeAPI);
        const result: any = response.data;
        const respYear = result.year;
        const respMonth = result.month;
        const respDay = result.day;
        const respHour = result.hour;
        const respMinute = result.minute;

        const cronValue = time?.value;

        function matchesCronPart(value: number, part: string): boolean {
            if (part === '*') return true;
            if (part.includes(',')) {
                return part.split(',').map(Number).includes(value);
            }
            if (part.includes('/')) {
                const [_, step] = part.split('/').map(Number);
                return value % step === 0;
            }
            if (part.includes('-')) {
                const [start, end] = part.split('-').map(Number);
                return value >= start && value <= end;
            }
            return Number(part) === value;
        }

        function doesMatchCron(cron: string, year: number, month: number, day: number, hour: number, minute: number): boolean {
            const [minuteCron, hourCron, dayCron, monthCron, dayOfWeekCron] = cron.split(' ');

            return (
                matchesCronPart(minute, minuteCron) &&
                matchesCronPart(hour, hourCron) &&
                matchesCronPart(day, dayCron) &&
                matchesCronPart(month, monthCron) &&
                matchesCronPart(new Date(year, month - 1, day).getDay(), dayOfWeekCron)
            );
        }
        const isMatching = doesMatchCron(cronValue, respYear, respMonth, respDay, respHour, respMinute);

        console.log('isMatching:', isMatching);
        return isMatching;
    } catch (error) {
        console.error('Error while fetching world time data:', error);
        return false;
    }
}
