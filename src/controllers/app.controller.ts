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

    const applications = await this.androidApplicationRepository.find();
    return {
      data: {
        applications,
      },
    };
  }

  @Get('/:package')
  @Render('detail.view.html')
  public async detail(
    @Param('package') appPackage: string,
  ) {
    const application = await this.androidApplicationRepository.findOne({ package:appPackage });
    if (!application) {
      throw new NotFoundError('Application Details not found');
    }

    return {
      data: {
        application,
      },
    };
  }
}
