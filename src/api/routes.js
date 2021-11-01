'use strict'
module.exports = function (app) {
  let controller = require('./controller');

  app.route('/')
    .get(controller.welcome)

  app.route('/scrape/stocks/')
    .get(controller.scrapeStock)

  app.route('/scrape/funds/')
    .get(controller.scrapeFund)
}