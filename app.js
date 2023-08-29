const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("hello")
})

app.get('/scrape', async (req, res) => {
  const url = req.query.url;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const scrapedContent = $('body').text(); // Change the selector to the appropriate element you want to scrape

    fs.writeFileSync('content.txt', scrapedContent);

    res.send('Content scraped and saved to content.txt');
  } catch (error) {
    res.status(500).send('Error scraping content');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
