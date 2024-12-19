import { lessThan, greaterThan, isEqual } from "./WeatherCron";
import { spotifyNewLike } from "./SpotifyCron";
import sendDiscordMessage from "../action/sendDiscordMessage";
import { CronClass } from './CronClass';
import { sendMailBasic, sendMailComplex } from "../action/sendMail";
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

const triggersMapFunction: Map<string, (userId: number, value_json: string, data: any) => Promise<boolean>> = new Map([
    ["lessThan", lessThan],
    ["greaterThan", greaterThan],
    ["isEqual", isEqual],
    ["spotifyNewLike", spotifyNewLike]
]);

const actionsMapFunction: Map<string, (userId: number, value_json: string) => Promise<void>> = new Map([
    ["sendDiscordMessage", sendDiscordMessage],
    ["sendMailBasic", sendMailBasic],
    ["sendMailBasic", sendMailComplex],
]);

async function updateCron() {
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
            const cron = new CronClass(triggersMapFunction.get(triggerTemplate?.trigFunc) as (userId: number, value_json: string, data: any) => Promise<boolean>, trigger.userId, JSON.stringify(triggerTemplate?.valueTemplate));
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
            const plumTrigger = await prisma.plum.findFirst({where: {triggerId: id}});
            if (!plumTrigger)
                continue;
            const action = await prisma.action.findUnique({where: {id: plumTrigger?.actionId}});
            if (!action)
                continue;
            const actionTemplate = await prisma.actionTemplate.findUnique({where: {id: action?.actionTemplateId}});
            if (!actionTemplate)
                continue;
            const actionFunc = actionsMapFunction.get(actionTemplate?.actFunc);
            if (actionFunc && action.actionValue)
                await actionFunc(plumTrigger.userId, action?.actionValue.toString());
        }
    } catch (error) {
        console.error('Error checking cron results:', error);
    }
}

export const updateCronJob = new CronJob('* * * * *', updateCron);
export const checkCronResultJob = new CronJob('* * * * *', checkCronResult);
