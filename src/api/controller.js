'use strict'
module.exports = {
  welcome: (req, res) => {
    return res.json({ message: "Application already"})
  },

  fetchStock(req, res) {
    return res.json({ message: `Fetch price of ${req.params.code}`});
  },

  scrapeFund: async (req, res) => {
    let day = (new Date()).toISOString()

    try {
      let fundScraper = require('../scraper/fundScraper')
      let data = await fundScraper.scrape()
      return res.json({code: 200, day, data});
    } catch (err) {
      console.log(err)
      return res.json({code: 404, message: err.message})
    }
  }
}