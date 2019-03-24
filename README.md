#HOW TO SETUP THIS APPLICATION

You must have all dependencies preinstalled: 

  - install nodejs, npm
  - checkout the repository
  - install all packages `npm install`

you can start the application using    `npm start`
you can start the application in watch mode using `npm run watch`


### APPLICATION DIRECTORY STRUCTURE

`src` contains all the source code. 
the file `app.ts` is the entrypoint to the application, and all application bootstrap tasks are defined here. 

* _controller_
    - _app.controller.ts_ : This has the controllers for the listing route and the details route defined. 
* _config_
    - _app.config.ts_ : This has all the application level configs defined, the configs are picked from a `.env` file,                   you can see the `.env.example` file and create a similar `.env` file.
    - _scraper.config.ts_ : This has all the configurations required to do the scraping. 
* _crons_ :
    - tasks
        - _BuildAppCache.ts_: This contains the cron task to do the initial scraping and populate the DB 
        - _Cron.ts_ : This registers the cron tasks
* _entities_: 
    - _androidApplication.entity.ts_ : This is an ORM entity defined for use with typeorm 
    - _middlewares_: This contains all the middlewares in the application
        - _errorhandler.middleware.ts_ : This is the global errorhandler middleware
* _services_: Contains Single Speciality Services. 
    - webscraper.service.ts: Contains the scraper serves that fetches an html page

* types: Contains all custom types if required. 

* _utils_: 
    - _app.util.ts_: a utility file to fetch, parse and populate the database with applications
* _views_: contains all html templates.

    