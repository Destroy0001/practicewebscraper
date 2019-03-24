import * as Cron from 'node-cron';
import { buildAppCache } from './tasks/BuildAppCache';
export async function startCron() {
  await buildAppCache();
  // running this every day
  Cron.schedule('0 * * * *', buildAppCache);
}
