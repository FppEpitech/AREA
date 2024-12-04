import { CronJob } from 'cron';

class CronClass {

    cronJob: CronJob;

    constructor(fct: () => void, time: string) {
        if (!time)
            time = '0 */24 * * * *';
        this.cronJob = new CronJob(time, async () => {
            try {
                await fct();
            } catch (e) {
                console.error(e);
            }
        });

        if (!this.cronJob.running)
            this.cronJob.start();
    }
}

export { CronClass };
