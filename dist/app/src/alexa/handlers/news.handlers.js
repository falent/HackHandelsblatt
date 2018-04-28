const Alexa = require("alexa-sdk");
const States = require("./states.const");
const SpeechOutputUtils = require("../utils/speech-output.utils");
var https = require("https");

const newsService = require("../../services/newsFeed");

let NEWS = [];

module.exports = Alexa.CreateStateHandler(States.NEWS, {
  NewsIntent: function(event, context, callback) {
    var topic = this.event.request.intent.slots.news_topic.value;
    console.log("ttttopicc : " + topic);

    self = this;
    return newsService
      .getNewsOfLast24h(topic)
      .then(results => {
        console.log(JSON.stringify(results));
        let currentNews = results.slice(0, 3);
        NEWS = results.slice(3);
        if (currentNews && currentNews.length > 1) {
          let message = `Ich habe ${results.length} Ergebnisse gefunden. `;
          currentNews = currentNews.map(entry =>
            entry.replace(/.*reports: /, "")
          );
          message += currentNews
            .map((entry, idx) => `Punkt ${idx + 1}: ${entry}`)
            .join(" ");
          if (NEWS && NEWS.length > 1) {
            message += ` Habe noch ${NEWS.length} weitere Nachricht${
              NEWS.length === 1 ? "." : "en."
            }`;
            message += " Willst Du noch mehr?";
          }
          self.response.speak(message);
        } else {
          self.response.speak(
            `Habe keine Neuigkeiten über ${topic} gefunden in den letzten 24 Stunden.`
          );
        }
        console.log("resesponsee : " + JSON.stringify(results.join(" ")));
        self.emit(":responseReady");
      })
      .then(callback);
  },

  // Unhandled Intent:

  Unhandled: function() {
    this.handler.state = States.NONE;
    this.emit("Unhandled"); // emit in newSession handlers
  },

  // Built-In Intents:

  "AMAZON.HelpIntent": function() {
    this.handler.state = States.NONE;
    this.emit(":ask", SpeechOutputUtils.pickRandom(this.t("HELP")));
  },

  "AMAZON.NoIntent": function() {
    this.handler.state = States.NONE;
    this.emit("AMAZON.CancelIntent");
  },

  "AMAZON.StopIntent": function() {
    this.handler.state = States.NONE;
    this.emit("AMAZON.StopIntent");
  },

  "AMAZON.CancelIntent": function() {
    this.handler.state = States.NONE;
    this.emit("AMAZON.CancelIntent");
  }
});
