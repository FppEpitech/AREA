"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCronResultJob = exports.updateCronJob = void 0;
const WeatherCron_1 = require("./WeatherCron");
const CronClass_1 = require("./CronClass");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const cron_1 = require("cron");
/**
 * Map of cron jobs.
 * If a cron is find in the db, it will be added to the map. And will be started.
 *
 * IF a cron is not in the db, it will be removed from the map. And will be stopped.
 *
 * While a cronJob is in the map, it will be executed.
 */
const cronMap = new Map();
const triggersMapFunction = new Map([
    ["lessThan", WeatherCron_1.lessThan],
    ["greaterThan", WeatherCron_1.greaterThan],
    ["isEqual", WeatherCron_1.isEqual]
]);
// UpdateCron is now a cron too, it will be called every 10 minutes. But it will not be added to the map.
// UpdateCron time = 0 */10 * * * *
function updateCron() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const triggers = yield prismaClient_1.default.trigger.findMany();
            console.log("Triggers number: ", triggers.length);
            for (const trigger of triggers) {
                if (cronMap.has(trigger.id))
                    continue;
                const triggerTemplate = yield prismaClient_1.default.triggerTemplate.findUnique({
                    where: { id: trigger.triggerTemplateId }
                });
                if ((triggerTemplate === null || triggerTemplate === void 0 ? void 0 : triggerTemplate.type) !== 'cron')
                    continue;
                const cron = new CronClass_1.CronClass(triggersMapFunction.get(triggerTemplate === null || triggerTemplate === void 0 ? void 0 : triggerTemplate.trigFunc), JSON.stringify(triggerTemplate === null || triggerTemplate === void 0 ? void 0 : triggerTemplate.valueTemplate));
                cronMap.set(trigger.id, cron);
            }
            for (const [id, cron] of cronMap) {
                if (!triggers.some(trigger => trigger.id === id)) {
                    cron.cronJob.stop();
                    cronMap.delete(id);
                }
            }
        }
        catch (error) {
            console.error('Error initializing cron jobs:', error);
        }
    });
}
// for all cron is one === true so find by plum trigger id his action and execute it
function checkCronResult() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const [id, cron] of cronMap) {
                if (!cron.lastResult)
                    continue;
                const plumTrigger = yield prismaClient_1.default.plum.findFirst({ where: { triggerId: id } });
                if (!plumTrigger)
                    continue;
                const action = yield prismaClient_1.default.action.findUnique({ where: { id: plumTrigger === null || plumTrigger === void 0 ? void 0 : plumTrigger.actionId } });
                if (!action)
                    continue;
                console.log('Action executed:', action);
            }
        }
        catch (error) {
            console.error('Error checking cron results:', error);
        }
    });
}
exports.updateCronJob = new cron_1.CronJob('0 */10 * * * *', updateCron);
exports.checkCronResultJob = new cron_1.CronJob('0 */10 * * * *', checkCronResult);
//# sourceMappingURL=UpdateCron.js.map