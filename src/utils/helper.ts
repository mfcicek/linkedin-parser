export async function autoScroll(page) {
  await page.evaluate(() => {
    return new Promise<void>((resolve, reject) => {
      let totalHeight = 0;
      let distance = 500;
      let timer = setInterval(() => {
        let scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

export const statusLog = (
  section: string,
  message: string,
  scraperSessionId?: string | number
) => {
  const sessionPart = scraperSessionId ? ` (${scraperSessionId})` : '';
  const messagePart = message ? `: ${message}` : null;
  return console.log(`Scraper (${section})${sessionPart}${messagePart}`);
};

export function chunk(array, chunkSize) {
  return [].concat.apply(
    [],
    array.map(function (elem, i) {
      return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    })
  );
}

module.exports = { autoScroll, statusLog, chunk };
