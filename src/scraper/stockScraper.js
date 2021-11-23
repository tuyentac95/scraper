'use strict'
module.exports = {
  scrape: async () => {
    console.log('[INFO] Start scraping HOSE...')
    let hose = await scrapeStocks('https://liveboard.cafef.vn/');
    let hnx = await scrapeStocks('https://liveboard.cafef.vn/?center=2');
    return [...hose, ...hnx]
  }
}

const puppeteer = require('puppeteer');

const delay = ms => new Promise(res => {
  console.log(`Waiting ${ms/1000} seconds...`)
  setTimeout(res, ms)
});

const scrapeStocks = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url);
  await delay(6000)

  let stocks = await page.evaluate(() => {
    let elements = document.body.querySelectorAll('.col_l')
    let arr = []
    elements.forEach(e => {
      arr = [...arr, {
        code: e.id.replace('_l', ''),
        price: e.textContent
      }]
    })
    return arr
  })

  await browser.close()
  return stocks
};
