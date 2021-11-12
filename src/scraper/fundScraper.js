'use strict'
module.exports = {
  scrape: async () => {
    console.log('[INFO] Start scraping funds...')
    return await scrapeFunds();
  }
}

const puppeteer = require('puppeteer');

const delay = ms => new Promise(res => {
  console.log(`Waiting ${ms/1000} seconds...`)
  setTimeout(res, ms)
});

const scrapeFunds = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://fmarket.vn/san_pham');
  await delay(5000)

  let funds = await page.evaluate(() => {
    let elements = document.body.querySelector('tbody').querySelectorAll('tr')
    let arr = []
    elements.forEach(e => {
      arr = [...arr, {
        code: e.querySelector('.font-bold.wrap-text').textContent,
        issuer: e.querySelector('.issuer-row').textContent,
        type: e.querySelectorAll('.mobile-col')[0].textContent.trim(),
        nav: e.querySelectorAll('.mobile-col')[1].textContent.replace(',', ''),
      }]
    })
    return arr
  })

  await browser.close()
  return funds;
};
