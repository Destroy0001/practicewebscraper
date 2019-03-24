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
    let  newApps:AndroidApplication[] = [];
    const oldApps:AndroidApplication[] = [];

    for (const element in appNodeArray) {
      const appPackage = appNodeList[element].getAttribute('data-docid');
      const app = await this.androidApplicationRepository
            .findOne({ package:appPackage }) || new AndroidApplication();

      // differentiating between old and new apps
      // so that all apps aren't rescraped
      // and only the new ones are
      if (app.id) {
        oldApps.push(app);
      }else {
        app.package = appPackage;
        newApps.push(app);
      }
    }

    // promise.all will executes these requests parallelly,
    // instead of the regular await this.fetchDetail
    // which will only get the second request when the first request is completed
    // as the next promise goes into the then of the last promise
    // this improves speed
    if (newApps.length) {
      newApps = await Promise.all(newApps.map(app => this.fetchDetail(app)));
    }
    return [...oldApps, ...newApps];
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
    // TODO: the images are loaded asynchronously,
    // find a fix to that later
    screenshotListNode.forEach((screenshotNode:Element) => {
      const screenshotUrl = screenshotNode.getAttribute('src');
      if (screenshotUrl) {
        screenshotList.urls.push(screenshotUrl);
      }
    });
    app.screenshotUrlList = JSON.stringify(screenshotList);

    /* saving the application */
    return await this.androidApplicationRepository.save(app);
  }

}
