import { Controller, Get, Render } from 'routing-controllers';
import { WebScraperService } from '@app/services';

@Controller('/apps')
export class AppController {
  @Get('')
  @Render('listing.view.html')
  public async list() {

  }

  @Get('/:id')
  @Render('detail.view.html')
  public async detail() {

  }
}
