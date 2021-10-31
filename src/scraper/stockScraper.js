'use strict'
module.exports = {
  scrape: async () => {
    console.log('[INFO] Start scraping...')
    return await scrapeStocks();
  }
}

const puppeteer = require('puppeteer');

const delay = ms => new Promise(res => {
  console.log(`Waiting ${ms/1000} seconds...`)
  setTimeout(res, ms)
});

const scrapeStocks = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://liveboard.cafef.vn/');
  await delay(6000)

  let stocks = await page.evaluate(() => {
    let elements = document.body.querySelectorAll('.col_l')
    let arr = []
    elements.forEach(e => {
      arr = [...arr, {
        id: e.id.replace('_l', ''),
        price: e.textContent
      }]
    })
    return arr
  })

  console.log(stocks)
  await browser.close()
  return stocks
};
