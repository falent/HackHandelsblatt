require("dotenv").config();
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
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
      sources: "handelsblatt",
      domains: "handelsblatt.com",
      from,
      to,
      language: "de",
      sortBy: "relevancy",
      page: 2
    })
    .then(response => {
      const articles = response.articles;
      const results = articles
        .map(a => ({ title: a.title, source: a.source.name }))
        .map(content => `The ${content.source} reports: ${content.title}.`);
      console.log(JSON.stringify(results));
      return results;
    });
};