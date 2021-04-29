import cron from 'node-cron';
import { container } from 'tsyringe';
import tasksConfig from '@config/tasks';
import AutoRemoveMovieService from './services/AutoRemoveMovieService';

cron.schedule(
  tasksConfig.autoRemoveMovieScheduleTime,
  async () => {
    console.info('Running a job at 06:00 at America/Sao_Paulo timezone');
    const autoRejectGift = container.resolve(AutoRemoveMovieService);
    await autoRejectGift.execute();
  },
  {
    timezone: 'America/Sao_Paulo',
  },
);
