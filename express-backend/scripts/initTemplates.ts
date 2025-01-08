import prisma from '../prismaClient';

import { createServices } from "./createServices";
import { PressureTriggerTemplate, temperatureTriggerTemplate, cloudinessTriggerTemplate, windSpeedTriggerTemplate, humidityTriggerTemplate, weatherTriggerTemplate, isSpotifyNewLikeTriggerTemplate, isSpotifyMusicPlayingTriggerTemplate, isSpotifyMusicPausingTriggerTemplate} from "./createTriggerTemplate";
import { sendDiscordMessageTemplate, skipPreviousSpotifyMusicTemplate, skipNextSpotifyMusicTemplate, resumePlayingSpotifyMusicTemplate, stopPlayingSpotifyMusicTemplate } from "./createActionTemplate";

const triggerTemplates : Map<string, () => Promise<void>> = new Map([
    ["Pressure", PressureTriggerTemplate],
    ["Temperature", temperatureTriggerTemplate],
    ["Cloudiness", cloudinessTriggerTemplate],
    ["Wind Speed", windSpeedTriggerTemplate],
    ["Humidity", humidityTriggerTemplate],
    ["Weather", weatherTriggerTemplate],
    ["Spotify new like", isSpotifyNewLikeTriggerTemplate],
    ["Spotify music playing", isSpotifyMusicPlayingTriggerTemplate],
    ["Spotify music pausing", isSpotifyMusicPausingTriggerTemplate]
]);

const actionTemplates : Map<string, () => Promise<void>> = new Map([
    ["Send Discord Message", sendDiscordMessageTemplate],
    ["Skip to previous music", skipPreviousSpotifyMusicTemplate],
    ["Skip to next music", skipNextSpotifyMusicTemplate],
    ["Resume the music", resumePlayingSpotifyMusicTemplate],
    ["Stop a Spotify playing music", stopPlayingSpotifyMusicTemplate]
]);

const types : Map<string, Map<string, () => Promise<void>>> = new Map([
    ["TriggerTemplate", triggerTemplates],
    ["ActionTemplate", actionTemplates]
]);

async function initAllTemplates() {
    createServices();
    for (const [type, templates] of types) {
        console.log(`Table ${type} already exists. Check if templates are present...`);
        let dbTemplates : any;
        if (type === "TriggerTemplate")
            dbTemplates = await prisma.triggerTemplate.findMany();
        else
            dbTemplates = await prisma.actionTemplate.findMany();
        for (const [name, template] of templates) {
            if (!dbTemplates.some((dbTemplate : any) => dbTemplate.name === name))
                await template();
        }
    }
}

export default initAllTemplates;
