const { chromium } = require('playwright');

(async () => {
  // Launch an invisible "headless" browser
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // The 10 URLs we need to scrape
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=65',
    'https://sanand0.github.io/tdsdata/js_table/?seed=66',
    'https://sanand0.github.io/tdsdata/js_table/?seed=67',
    'https://sanand0.github.io/tdsdata/js_table/?seed=68',
    'https://sanand0.github.io/tdsdata/js_table/?seed=69',
    'https://sanand0.github.io/tdsdata/js_table/?seed=70',
    'https://sanand0.github.io/tdsdata/js_table/?seed=71',
    'https://sanand0.github.io/tdsdata/js_table/?seed=72',
    'https://sanand0.github.io/tdsdata/js_table/?seed=73',
    'https://sanand0.github.io/tdsdata/js_table/?seed=74'
  ];

  let grandTotal = 0;

  for (const url of urls) {
    await page.goto(url);
    
    // Playwright automatically waits for the dynamic table cells to load
    await page.waitForSelector('table td'); 
    
    // Read the webpage to extract and sum the numbers
    const pageSum = await page.evaluate(() => {
      let sum = 0;
      const cells = document.querySelectorAll('table td');
      cells.forEach(cell => {
        const number = parseFloat(cell.innerText);
        if (!isNaN(number)) {
          sum += number;
        }
      });
      return sum;
    });
    
    grandTotal += pageSum;
  }

  // Print the final total to the logs
  console.log(`TOTAL SUM: ${grandTotal}`);

  await browser.close();
})();
