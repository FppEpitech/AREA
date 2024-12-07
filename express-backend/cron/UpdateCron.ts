import { lessThan, greaterThan, isEqual } from "./WeatherCron";
import { CronClass } from './CronClass';
import prisma from '../prismaClient'
import {CronJob} from "cron";


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

// UpdateCron is now a cron too, it will be called every 10 minutes. But it will not be added to the map.
// UpdateCron time = 0 */10 * * * *

async function updateCron() {
    try {
        const triggers = await prisma.trigger.findMany();
        console.log("Triggers number: ", triggers.length);
        for (const trigger of triggers) {
            if (cronMap.has(trigger.id))
                continue;
            const triggerTemplate = await prisma.triggerTemplate.findUnique({
                where: { id: trigger.triggerTemplateId }
            });
            if (triggerTemplate?.type !== 'cron')
                continue;
            const cron = new CronClass(triggersMapFunction.get(triggerTemplate?.trigFunc) as (value_json: string) => Promise<boolean>, JSON.stringify(triggerTemplate?.valueTemplate));
            cronMap.set(trigger.id, cron);
        }
        for (const [id, cron] of cronMap) {
            if (!triggers.some(trigger => trigger.id === id)) {
                cron.cronJob.stop();
                cronMap.delete(id);
            }
        }
    } catch (error) {
        console.error('Error initializing cron jobs:', error);
    }
}

// for all cron is one === true so find by plum trigger id his action and execute it
async function checkCronResult() {
    try {
        for (const [id, cron] of cronMap) {
            if (!cron.lastResult)
                continue;
            const plumTrigger = await prisma.plum.findUnique({
                where: { triggerId: id }
            });
            if (!plumTrigger)
                continue;
            const action = await prisma.action.findUnique({
                where: { id: plumTrigger?.actionId }
            });
            if (!action)
                continue;
            console.log('Action executed:', action);
        }
    } catch (error) {
        console.error('Error checking cron results:', error);
    }
}

export const updateCronJob = new CronJob('0 */10 * * * *', updateCron);
export const checkCronResultJob = new CronJob('0 */10 * * * *', checkCronResult);
