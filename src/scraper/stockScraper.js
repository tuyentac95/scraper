const puppeteer = require('puppeteer');

const delay = ms => new Promise(res => {
  console.log(`Waiting ${ms/1000} seconds...`)
  setTimeout(res, ms)
});

(async function scrape() {
  const browser = await puppeteer.launch({headless: false});

  const page = await browser.newPage();
  await page.goto('https://liveboard.cafef.vn/');
  await delay(6000)

  let codes = await page.evaluate(() => {
    let codesElement = document.body.querySelectorAll('.col_l')
    let arr = []
    codesElement.forEach(e => {
      arr = [...arr, {
        id: e.id.replace('_l', ''),
        price: e.textContent
      }]
    })
    return arr
  })

  console.log(codes)
  await browser.close()
})();
