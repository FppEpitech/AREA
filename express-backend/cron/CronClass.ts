import { CronJob } from 'cron';

class CronClass {

    cronJob: CronJob;
    lastResult: boolean = false;
    data: any;

    constructor(fct: (userId : number, value_json: any, data: any) => Promise<boolean>, userId : number, value_json: string) {
        const { time } = JSON.parse(value_json);
        this.data = {};
        this.cronJob = new CronJob(time.value, async () => {
            try {
                this.lastResult = await fct(userId, value_json, this.data);
            } catch (e) {
                console.error(e);
            }
        });

        if (!this.cronJob.running)
            this.cronJob.start();
    }
}

export { CronClass };
    