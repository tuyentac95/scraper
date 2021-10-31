const puppeteer = require('puppeteer');

const delay = ms => new Promise(res => {
  console.log(`Waiting ${ms/1000} seconds...`)
  setTimeout(res, ms)
});

(async function scrape() {
  const browser = await puppeteer.launch({headless: false});

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
        type: e.querySelectorAll('.mobile-col')[0].textContent,
        nav: e.querySelectorAll('.mobile-col')[1].textContent.replace(',', ''),
      }]
    })
    return arr
  })

  console.log(funds)
  await browser.close()
})();
