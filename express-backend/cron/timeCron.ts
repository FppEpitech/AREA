import axios from 'axios';

export async function isWorldTime(userId: number, value_json: string, data: any): Promise<boolean> {
    const { city, continent, year, month, day, hour, minute } = JSON.parse(value_json);
    const WorldTimeAPI: string = 'https://timeapi.io/api/time/current/zone?timeZone=' + continent?.value + '%2F' + city?.value;

    try {
        const response = await axios.get(WorldTimeAPI);
        const result: any = response.data;
        console.log('World Time API response:', result);
        const respYear = result.year;
        const respMonth = result.month;
        const respDay = result.day;
        const respHour = result.hour;
        const respMinute = result.minute;

        return (
            respYear === year?.value &&
            respMonth === month?.value &&
            respDay === day?.value &&
            respHour === hour?.value &&
            respMinute === minute?.value
        );
    } catch (error) {
        console.error('Error while fetching world time data:', error);
        return false;
    }
}
