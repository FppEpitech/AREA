import { lessThan, greaterThan, isEqual } from "./WeatherCron";
import { CronClass } from './CronClass';
import prisma from '../prismaClient'
import {CronJob} from "cron";

const cronJobs = [
    {
        name: 'CheckWeather',
        cronTime: '* * * * *',
        onTickFunction: CheckWeather
    }
];

/**
 * Old init cron function.

new CronClass(job.onTickFunction, job.cronTime);
function InitCron() {
    cronJobs.forEach((job) => {
    });
}

*/

/**
 * Init cron function.
 */

/**
 * Map of cron jobs.
 * If a cron is find in the db, it will be added to the map. And will be started.
 *
 * IF a cron is not in the db, it will be removed from the map. And will be stopped.
 *
 * While a cronJob is in the map, it will be executed.
 */
const cronMap = new Map<number, CronClass>();

const triggersMapFunction: Map<string, (value_json: string) => Promise<boolean>> = new Map([
    ["lessThan", lessThan],
    ["greaterThan", greaterThan],
    ["isEqual", isEqual]
]);

// InitCron is now a cron too, it will be called every 10 minutes. But it will not be added to the map.
// InitCron time = 0 */10 * * * *

async function InitCron() {
    try {
        const triggers = await prisma.trigger.findMany();
        for (const trigger of triggers) {
            if (cronMap.has(trigger.id))
                continue;
            const triggerTemplate = await prisma.triggerTemplate.findUnique({
                where: { id: trigger.triggerTemplateId }
            });
            if (triggerTemplate?.type !== 'cron')
                continue;
            const cron = new CronClass(triggersMapFunction.get(triggerTemplate.trigFunc) as (value_json: string) => Promise<boolean>, JSON.stringify(triggerTemplate.valueTemplate));
            cronMap.set(trigger.id, cron);
        }
        
    } catch (error) {
        console.error('Error initializing cron jobs:', error);
    }
}

export const InitCronJob = new CronJob('0 */10 * * * *', InitCron);



export {InitCron};
