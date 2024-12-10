import { CronJob } from 'cron';

class CronClass {

    cronJob: CronJob;
    lastResult: boolean = false;
    data: any;

    // The function here is to call the trigger function.
    constructor(fct: (userId : number, value_json: string) => Promise<boolean>, userId : number, value_json: string) {
        const { time } = JSON.parse(value_json)
        this.cronJob = new CronJob(time, async () => {
            try {
                this.lastResult = await fct(userId, value_json);
            } catch (e) {
                console.error(e);
            }
        });

        if (!this.cronJob.running)
            this.cronJob.start();
    }
}

export { CronClass };
