import { CronJob } from 'cron';

class CronClass {

    cronJob: CronJob;
    lastResult: boolean = false;
    data: any;
    status : Boolean = true;

    constructor(fct: (userId : number, value_json: any, data: any) => Promise<boolean>, userId : number, value_json: string, status : boolean) {
        const { time } = JSON.parse(value_json);
        this.status = status;
        this.data = {};
        this.cronJob = new CronJob(time.value, async () => {
            try {
                this.lastResult = (status) ? await fct(userId, value_json, this.data) : false;
            } catch (e) {
                console.error(e);
            }
        });

        if (!this.cronJob.running)
            this.cronJob.start();
    }
}

export { CronClass };
