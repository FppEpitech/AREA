import { pressure, temperature, cloudiness, windSpeed, humidity, weather } from "./WeatherCron";
import { spotifyNewLike, isSpotifyMusicPlaying, isSpotifyMusicPausing} from "./SpotifyCron";
import { isTramwayClose} from "./NaolibCron";
import sendDiscordMessage from "../action/sendDiscordMessage";
import {stopPlayingSpotifyMusic, resumePlayingSpotifyMusic, skipToNextTrackSpotify, previousPlayingSpotifyMusic} from "../action/SpotifyAction";
import { isWorldTime } from "./TimeCron";
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

const triggersMapFunction: Map<string, (userId: number, value_json: string, data: any) => Promise<boolean>> = new Map([
    ["pressure", pressure],
    ["temperature", temperature],
    ["cloudiness", cloudiness],
    ["windSpeed", windSpeed],
    ["humidity", humidity],
    ["weather", weather],
    ["spotifyNewLike", spotifyNewLike],
    ["isSpotifyMusicPlaying", isSpotifyMusicPlaying],
    ["isSpotifyMusicPausing", isSpotifyMusicPausing],
    ["isTramwayClose", isTramwayClose],
    ["isWorldTime", isWorldTime]
]);

const actionsMapFunction: Map<string, (userId: number, value_json: string) => Promise<void>> = new Map([
    ["sendDiscordMessage", sendDiscordMessage],
    ["stopPlayingSpotifyMusic", stopPlayingSpotifyMusic],
    ["resumePlayingSpotifyMusic", resumePlayingSpotifyMusic],
    ["skipToNextTrackSpotify", skipToNextTrackSpotify],
    ["previousPlayingSpotifyMusic", previousPlayingSpotifyMusic]
]);

async function updateCron() {
    try {
        const tableExists : any = await prisma.$queryRaw`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Trigger')`;
        if (!tableExists[0].exists) {
            console.log('Trigger table does not exist.');
            return;
        }
        const plumsTriggers = await prisma.plum.findMany();
        for (const plums of plumsTriggers) {
            const trigger = await prisma.trigger.findUnique({where: {id: plums.triggerId}});
            if (cronMap.has(plums.id) || !trigger)
                continue;
            const triggerTemplate = await prisma.triggerTemplate.findUnique({
                where: { id: trigger.triggerTemplateId }
            });
            if (triggerTemplate?.type !== 'cron')
                continue;
            try {
                const cron = new CronClass(triggersMapFunction.get(triggerTemplate?.trigFunc) as (userId: number, value_json: string, data: any) => Promise<boolean>, trigger.userId, JSON.stringify(trigger.triggerValue));
                cronMap.set(trigger.id, cron);
            } catch (error) {
                console.error('Error adding cron job:', error);
            }
        }
        for (const [id, cron] of cronMap) {
            if (!plumsTriggers.find(plum => plum.id === id)) {
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
                await actionFunc(plumTrigger.userId,  JSON.stringify(action?.actionValue));
        }
    } catch (error) {
        console.error('Error checking cron results:', error);
    }
}

export const updateCronJob = new CronJob('* * * * *', updateCron);
export const checkCronResultJob = new CronJob('* * * * *', checkCronResult);
