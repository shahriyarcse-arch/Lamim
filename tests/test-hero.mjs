import mod from 'file:///C:/Users/ASUS/AppData/Roaming/npm/node_modules/omniroute/node_modules/playwright/index.mjs';
const { chromium } = mod;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.goto(new URL('../index.html', import.meta.url).href, { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(2500);
const info = await page.evaluate(() => {
  const wrapper = document.querySelector('.hero .reveal');
  const art = document.querySelector('.hero-art');
  const h1 = document.querySelector('.hero h1');
  const p = document.querySelector('.hero p');
  const btns = document.querySelectorAll('.hero .actions .btn');
  return {
    wrapperOpacity: wrapper ? parseFloat(getComputedStyle(wrapper).opacity) : -1,
    artOpacity: art ? parseFloat(getComputedStyle(art).opacity) : -1,
    h1Opacity: parseFloat(getComputedStyle(h1).opacity),
    pOpacity: parseFloat(getComputedStyle(p).opacity),
    btn1Opacity: btns[0] ? parseFloat(getComputedStyle(btns[0]).opacity) : -1,
    btn2Opacity: btns[1] ? parseFloat(getComputedStyle(btns[1]).opacity) : -1,
    wrapperVisible: wrapper ? getComputedStyle(wrapper).opacity !== '0' : false,
  };
});
console.log(JSON.stringify(info, null, 2));
if (errors.length) console.log('ERRORS:', errors);
await page.screenshot({ path: new URL('./screenshots/hero-test.png', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1') });
console.log('Screenshot saved');
await browser.close();
