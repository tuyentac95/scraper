'use strict'
module.exports = function (app) {
  let controller = require('./controller');

  app.route('/')
    .get(controller.welcome)

  app.route('/stocks/:code')
    .get(controller.fetchStock)
}