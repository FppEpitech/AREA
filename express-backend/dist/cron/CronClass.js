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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronClass = void 0;
const cron_1 = require("cron");
class CronClass {
    // The function here is to call the trigger function.
    constructor(fct, value_json) {
        this.lastResult = false;
        const { time } = JSON.parse(value_json);
        this.cronJob = new cron_1.CronJob(time, () => __awaiter(this, void 0, void 0, function* () {
            try {
                this.lastResult = yield fct(value_json);
            }
            catch (e) {
                console.error(e);
            }
        }));
        if (!this.cronJob.running)
            this.cronJob.start();
    }
}
exports.CronClass = CronClass;
//# sourceMappingURL=CronClass.js.map