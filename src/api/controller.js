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

      let caller = require('../axios/apiCaller')
      await caller.submitStocks(data, day.substr(0,10))

      return res.json({status: 200, day, data});
    } catch (err) {
      console.log(err)
      return res.json({status: 404, message: err.message})
    }
  },

  scrapeFund: async (req, res) => {
    let day = (new Date()).toISOString()

    try {
      let fundScraper = require('../scraper/fundScraper')
      let data = await fundScraper.scrape()
      return res.json({status: 200, day, data});
    } catch (err) {
      console.log(err)
      return res.json({status: 404, message: err.message})
    }
  }
}