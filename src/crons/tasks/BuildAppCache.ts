import { Repository, getRepository } from 'typeorm';
import { AndroidApplication } from '@app/entities';
import { AppUtil } from '@app/utils/app.util';
import { WebScraperService } from '@app/services';

export async function buildAppCache() {
  try {
    const applicationRepository = getRepository(AndroidApplication);
    const webscraper = new WebScraperService();
    const appUtil = new AppUtil(webscraper, applicationRepository);
    new AppCache(appUtil, applicationRepository).start();
  }catch (e) {
    console.log(e);
  }
}

export class AppCache {
  constructor(
    private appUtil:AppUtil,
    private applicationRepository:Repository<AndroidApplication>,
  ) {}

  public async start() {
    const startTime = new Date().getTime();
    try {
      console.log('Building Application Cache');
      const apps = await this.appUtil.fetchListing();
      const endTime = new Date().getTime();
      console.log(`Application Cache Built in ${(endTime - startTime) / 1000 } Seconds`);
    }catch (e) {
      console.error('Could not Application build Cache');
      console.log(e);
    }
  }
}
