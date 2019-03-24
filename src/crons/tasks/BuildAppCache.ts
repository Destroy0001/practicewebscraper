import { Repository, getRepository } from 'typeorm';
import { Applications } from '@app/entities';
import { AppUtil } from '@app/utils/app.util';
import { WebScraperService } from '@app/services';

export async function buildAppCache() {
  try {
    const applicationRepository = getRepository(Applications);
    const webscraper = new WebScraperService();
    const appUtil = new AppUtil(webscraper);
    new AppCache(appUtil, applicationRepository).start();
  }catch (e) {
    console.log(e);
  }
}

class AppCache {
  constructor(
    private appUtil:AppUtil,
    private applicationRepository:Repository<Applications>,
  ) {}

  public async start() {
    const startTime = new Date().getTime();
    try {
      console.log('Building Application Cache');
      await this.createListingCache();
    }catch (e) {
      console.error('Could not build Cache, it will be built manually');
      console.log(e);
    }
    const endTime = new Date().getTime();
    console.log(`Cinema Cache Built in ${(endTime - startTime) / 1000 } Seconds`);

  }

  private async createListingCache() {
    // this.appUtil.fetchListing();
  }

  private async createDetailsCache(appPackage:string) {}
}
