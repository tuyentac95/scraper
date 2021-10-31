const puppeteer = require('puppeteer');

(async function scrape() {
  const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com/search.aspx');

  await page.waitForSelector('#author');
  await page.select('#author', 'Albert Einstein');

  await page.waitForSelector('#tag');
  await page.select('#tag', 'learning');

  await page.click('.btn');
  await page.waitForSelector('.quote');

  // extracting information from code
  let quotes = await page.evaluate(() => {

    let quotesElement = document.body.querySelectorAll('.quote');
    let quotes = Object.values(quotesElement).map(x => {
      return {
        author: x.querySelector('.author').textContent,
        quote: x.querySelector('.content').textContent,
        tag: x.querySelector('.tag').textContent,

      }
    });

    return quotes;

  });

  // logging results
  console.log(quotes);
  await browser.close();

})();
