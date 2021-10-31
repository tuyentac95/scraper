'use strict'
module.exports = {
  welcome: (req, res) => {
    return res.json({ message: "Application already"})
  },

  scrapeStock: async (req, res) => {
    console.log('----------')
    let day = (new Date()).toISOString()

    try {
      let stockScraper = require('../scraper/stockScraper')
      let data = await stockScraper.scrape()
      return res.json({ code: 200, day, data });
    } catch (err) {
      console.log(err)
      return res.json({ code: 404, message: err.message})
    }
  }
}