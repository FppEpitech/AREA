import prisma from '../prismaClient';

import { PressureTriggerTemplate, temperatureTriggerTemplate, cloudinessTriggerTemplate, windSpeedTriggerTemplate, humidityTriggerTemplate, weatherTriggerTemplate, isSpotifyNewLikeTriggerTemplate } from "./createTriggerTemplate";
import { sendDiscordMessageTemplate } from "./createActionTemplate";
import { createServices } from "./createServices";
const triggerTemplates : Map<string, () => Promise<void>> = new Map([
    ["Pressure", PressureTriggerTemplate],
    ["Temperature", temperatureTriggerTemplate],
    ["Cloudiness", cloudinessTriggerTemplate],
    ["Wind Speed", windSpeedTriggerTemplate],
    ["Humidity", humidityTriggerTemplate],
    ["Weather", weatherTriggerTemplate],
    ["Spotify new like", isSpotifyNewLikeTriggerTemplate]
]);

const actionTemplates : Map<string, () => Promise<void>> = new Map([
    ["Send Discord Message", sendDiscordMessageTemplate]
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
