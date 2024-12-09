import { CronJob } from 'cron';

class CronClass {

    cronJob: CronJob;
    lastResult: boolean = false;

    // The function here is to call the trigger function.
    constructor(fct: (value_json: string) => Promise<boolean>, value_json: string) {
        const { time } = JSON.parse(value_json)
        this.cronJob = new CronJob(time, async () => {
            try {
                this.lastResult = await fct(value_json);
            } catch (e) {
                console.error(e);
            }
        });

        if (!this.cronJob.running)
            this.cronJob.start();
    }
}

export { CronClass };
