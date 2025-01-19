import { CronJob } from 'cron';

class CronClass {

    cronJob: CronJob;
    lastResult: boolean = false;
    data: any;
    status : Boolean = true;
    lastUpdatedAt : Date = new Date();


    constructor(fct: (userId : number, value_json: any, data: any) => Promise<boolean>, userId : number, value_json: string, status : boolean, updatedAt: Date) {
        this.lastUpdatedAt = updatedAt;

        const { time, city, continent } = JSON.parse(value_json);
        let cronTime = time.value;
        if (city !== undefined && continent !== undefined)
            cronTime = '* * * * *';
        this.status = status;
        this.data = {};
        this.cronJob = new CronJob(cronTime, async () => {
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
