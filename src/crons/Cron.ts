import * as Cron from 'node-cron';
import { buildAppCache } from './tasks/BuildAppCache';
export function startCron() {
  buildAppCache();
  // running this every day
  Cron.schedule('0 0 * * *', buildAppCache);
}
