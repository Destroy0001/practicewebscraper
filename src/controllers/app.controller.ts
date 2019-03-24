import { Controller, Get, Render, Param, QueryParam, NotFoundError } from 'routing-controllers';
import { Repository } from 'typeorm';
import { AndroidApplication } from '@app/entities';
import { AppUtil } from '@app/utils/app.util';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Controller('/apps')
export class AppController {
  constructor(
      @InjectRepository(AndroidApplication)
      private androidApplicationRepository:Repository<AndroidApplication>,
      private appUtil:AppUtil,
  ) {

  }

  @Get('')
  @Render('listing.view.html')
  public async list(
    @QueryParam('refresh') refresh:boolean,
  ) {
    if (refresh) {
      await this.appUtil.fetchListing();
    }

    return await this.androidApplicationRepository.find();
  }

  @Get('/:package')
  @Render('detail.view.html')
  public async detail(
    @Param('package') appPackage: string,
  ) {
    const app = await this.androidApplicationRepository.findOne({ package:appPackage });
    if (!app) {
      throw new NotFoundError('Application Details not found');
    }

    return app;
  }
}
