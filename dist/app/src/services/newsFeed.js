require("dotenv").config();
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("c866993f343e4bb096d52115b8662314");
const _ = require("lodash");
const moment = require("moment");

exports.getNewsOfLast24h = topic => {
  console.log(`topic "${topic}"`);
  const to = moment().format("YYYY-MM-DD");
  const from = moment()
    .subtract(1, "days")
    .format("YYYY-MM-DD");

  console.log(to);
  console.log(from);

  return newsapi.v2
    .everything({
      q: topic.toString(),
      sources: "handelsblatt, bild, die-zeit, focus, spiegel-online",
      domains:
        "handelsblatt.com, bild.de, bunte.de, zeit.de, focus.de, spiegel.de",
      from,
      to,
      language: "de",
      sortBy: "relevancy",
      page: 2
    })
    .then(response => {
      const articles = response.articles;
      const results = articles.map(a => ({
        title: a.title,
        source: a.source.name,
        description:
          a.description || "Leider sind hier keine Details vorhanden."
      }));
      console.log(JSON.stringify(results));
      return results;
    });
};
