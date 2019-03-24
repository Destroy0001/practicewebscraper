import { Service } from 'typedi';
import { WebScraperService } from '@app/services';
import { APPLICATION_LIST_URL, APPLICATION_DETAIL_URL } from '@app/config/scraper.config';
import { HttpError } from 'routing-controllers';
import { JSDOM as DOM } from 'jsdom';
import { AndroidApplication } from '@app/entities';
import { Repository } from 'typeorm';

@Service()
export class AppUtil {
  constructor(
      private webscraperService:WebScraperService,
      private androidApplicationRepository: Repository<AndroidApplication>,
  ) {

  }

  public async fetchListing() {
    const html = await this.webscraperService.scrape(APPLICATION_LIST_URL);
    if (html.success) {
      return this.parseListing(html.data);
    }

    throw new HttpError(html.statusCode, html.data);
  }

  private async parseListing(html:string) {
    const { window } = new DOM(html);
    const { document } = window;
    const appNodeList:NodeListOf<Element> = document.querySelectorAll('.card.apps');
    const appNodeArray = Array.from(appNodeList);
    const apps:AndroidApplication[] = [];

    for (const element in appNodeArray) {
      const appPackage = appNodeList[element].getAttribute('data-docid');
      const app = await this.androidApplicationRepository
            .findOne({ package:appPackage }) || new AndroidApplication();

      app.package = appPackage;
      apps.push(app);
    }

    return await Promise.all(apps.map(app => this.fetchDetail(app)));
  }

  private async fetchDetail(app:AndroidApplication) {
    const url = `${APPLICATION_DETAIL_URL}?id=${app.package}`;
    const html = await this.webscraperService.scrape(url);
    if (html.success) {
      return await this.parseDetail(app, html.data);
    }

    throw new HttpError(html.statusCode, html.data);
  }

  private async parseDetail(app:AndroidApplication, html:string) {
    const { window } = new DOM(html);
    const { document } = window;
    app.name = document.querySelector('meta[itemprop="name"]')
                       .getAttribute('content');
    app.iconUrl = document.querySelector('meta[itemprop="image"]')
                          .getAttribute('content');
    app.description = document.querySelector('meta[itemprop="description"]')
                              .getAttribute('content');
    app.category = document.querySelector('meta[itemprop="applicationCategory"]')
                           .getAttribute('content');
    const trailerNode =  document.querySelector('button[data-trailer-url]');
    if (trailerNode) {
      app.trailerUrl = trailerNode.getAttribute('data-trailer-url');
    }

    const screenshotListNode = document.querySelectorAll('button[data-screenshot-item-index] img');
    const screenshotList:{urls:string[]} = { urls: [] };
    screenshotListNode.forEach((screenshotNode:Element) => {
      const screenshotUrl = screenshotNode.getAttribute('src');
      if (screenshotUrl) {
        console.log(app.package, screenshotUrl);
        screenshotList.urls.push(screenshotUrl);
      }
    });
    app.screenshotUrlList = JSON.stringify(screenshotList);

    /* saving the application */
    return await this.androidApplicationRepository.save(app);
  }

}
