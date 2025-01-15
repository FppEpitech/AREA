import axios from 'axios';

export async function isWorldTime(userId: number, value_json: string, data: any): Promise<boolean> {
    const { city, country, year, month, day, hour, minute } = JSON.parse(value_json);
    const WorldTimeAPI: string = 'http://worldtimeapi.org/api/timezone/' + city?.value + '/' + country?.value;

    try {
        const response = await axios.get(WorldTimeAPI);
        const result: any = response.data;
        const stringData = result?.dateTime;
        const date = new Date(stringData);
        const respYear = date.getUTCFullYear();
        const respMonth = date.getUTCMonth() + 1;
        const respDay = date.getUTCDate();
        const respHour = date.getUTCHours();
        const respMinute = date.getUTCMinutes();

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
