import { Service } from 'typedi';
import { WebScraperService } from '@app/services';
import { APPLICATION_LIST_URL, APPLICATION_DETAIL_URL } from '@app/config/scraper.config';
import { HttpError } from 'routing-controllers';

@Service()
export class AppUtil {
  constructor(private webscraperService:WebScraperService) {

  }

  public async fetchListing() {
    const html = await this.webscraperService.scrape(APPLICATION_LIST_URL);
    if (html.success) {
      return this.parseListing(html.data);
    }

    throw new HttpError(html.statusCode, html.data);
  }

  private parseListing(html:string) {
    console.log(html);
    return {};
  }

  public async fetchDetail(appPackage:string) {
    if (!appPackage) {
      throw new HttpError(400, 'Missing application package');
    }
    const url = `${APPLICATION_DETAIL_URL}?id=${appPackage}`;
    const html = await this.webscraperService.scrape(url);

    if (html.success) {
      return this.parseDetail(html.data);
    }

    throw new HttpError(html.statusCode, html.data);
  }

  private parseDetail(html:string) {
    console.log(html);
    return {};
  }
}
