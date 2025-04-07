const functions = require("firebase-functions");
const express = require("express");
const request = require("request");

const app = express();

// Proxy endpoint
app.get("/proxy", (req, res) => {
  const targetUrl = req.query.url; // Get the target URL from the query string
  if (!targetUrl) {
    return res.status(400).send("Missing 'url' query parameter");
  }

  // Forward the request to the target URL
  request(targetUrl).on("error", (err) => {
    res.status(500).send("Error fetching the URL: " + err.message);
  }).pipe(res);
});

// Export the app as a Firebase Function
exports.api = functions.https.onRequest(app);



const functions = require("firebase-functions");
const express = require("express");
const request = require("request");
const cheerio = require("cheerio");

const app = express();

// Proxy endpoint
app.get("/proxy", (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send("Missding 'url' query parameter");
  }

  // Fetch the page content
  request(targetUrl, (error, response, body) => {
    if (error) {
      return res.status(500).send("Error fetching the URL: " + error.message);
    }

    // Use cheerio to load and manipulate the HTML
    const $ = cheerio.load(body);

    // Rewrite all relative URLs (links, images, etc.)
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      if (href && href.startsWith("/")) {
        $(element).attr("href", new URL(href, targetUrl).href);
      }
    });

    $("img").each((index, element) => {
      const src = $(element).attr("src");
      if (src && src.startsWith("/")) {
        $(element).attr("src", new URL(src, targetUrl).href);
      }
    });

    res.send($.html());
  });
});


exports.api = functions.https.onRequest(app);
