import { Controller, Get, Render } from 'routing-controllers';
import { WebScraperService } from '@app/services';

@Controller('/apps')
export class AppController {
  constructor(private webScraperService:WebScraperService) {}

  @Get('')
  @Render('listing.view.html')
  public async getListing() {

  }

  @Get('/:id')
  @Render('detail.view.html')
  public async getDetails() {

  }
}
