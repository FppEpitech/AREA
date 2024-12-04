import { CheckWeather } from "./WeatherCron";
import { CronClass } from './CronClass';

const cronJobs = [
    {
        name: 'CheckWeather',
        cronTime: '* * * * *',
        onTickFunction: CheckWeather
    }
];

function InitCron() {
    cronJobs.forEach((job) => {
        new CronClass(job.onTickFunction, job.cronTime);
    });
}

export {InitCron};
