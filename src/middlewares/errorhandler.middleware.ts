import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'after' })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {

  error(error: any, request: any, response: any, next: Function): void {
    console.log('Error handled: ', error);
    response.status(error.httpCode || 500);
    return response.render(
    'error.view.html', {
      httpCode:error.httpCode || 500,
      message: error.message || 'An unknown Error Occured',
    });
  }

}
