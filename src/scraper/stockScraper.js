'use strict'
module.exports = {
  scrape: async () => {
    console.log('[INFO] Start scraping HOSE...')
    return await scrapeStocks('https://liveboard.cafef.vn/')
  }
}

const puppeteer = require('puppeteer');

const delay = ms => new Promise(res => {
  console.log(`Waiting ${ms/1000} seconds...`)
  setTimeout(res, ms)
});

const scrapingPrice = () => {
  let elements = document.body.querySelectorAll('.sorting_1')
  let arr = []
  elements.forEach(e => {
    let ep = e.parentElement.querySelector(':nth-child(12)')
    console.log(ep.innerHTML)
    arr = [...arr, {
      code: e.textContent,
      price: ep.textContent
    }]
  })
  return arr.filter(s => s.code !== '')
}

const scrapeStocks = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto(url);
  await delay(6000)
  let hose = await page.evaluate(scrapingPrice)

  await page.click('#myTab :nth-child(4)')
  await delay(6000)
  let hnx = await page.evaluate(scrapingPrice)

  await browser.close()
  return [...hose, ...hnx]
};
