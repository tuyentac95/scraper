const puppeteer = require('puppeteer');

(async function scrape() {
  const browser = await puppeteer.launch({headless: false});

  const page = await browser.newPage();
  await page.goto('https://liveboard.cafef.vn/');

  console.log('wait aaa...')
  await page.waitForSelector('#AAA_l')
  console.log('aaa fetched')

  let codes = await page.evaluate(() => {
    let codesElement = document.body.querySelector('#AAA_l');
    console.log(codesElement.textContent)
    return codesElement.textContent
  })

  console.log(codes)
  await browser.close()
})();
