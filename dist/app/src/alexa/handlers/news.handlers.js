const Alexa = require("alexa-sdk");
const States = require("./states.const");
const SpeechOutputUtils = require("../utils/speech-output.utils");
var https = require("https");
var _ = require("lodash");
const newsService = require("../../services/newsFeed");

let NEWS = [];

module.exports = Alexa.CreateStateHandler(States.NEWS, {
  NewsIntent: function(event) {
    var topic = this.event.request.intent.slots.news_topic.value;
    console.log("ttttopicc : " + topic);

    self = this;
    return newsService.getNewsOfLast24h(topic).then(results => {
      console.log(JSON.stringify(results));
      NEWS = results
        .map(entry => entry.replace(/.*reports: /, ""))
        .map((entry, idx) => `Punkt ${idx + 1}: ${entry}`);

      let currentNews = _.take(NEWS, 3);
      NEWS = _.drop(NEWS, 3);
      if (currentNews && currentNews.length > 1) {
        let message = `Ich habe ${results.length} Ergebnisse gefunden. `;
        message += currentNews.join(" ");

        if (NEWS && NEWS.length > 1) {
          message += ` Habe noch ${NEWS.length} weitere Nachricht${
            NEWS.length === 1 ? "." : "en."
          }`;
          message += " Willst Du noch mehr?";
        } else {
          message += " Mehr hab ich nicht. Ciaoi.";
        }
        self.response.speak(message).listen(message);
      } else {
        self.response.speak(
          `Habe keine Neuigkeiten über ${topic} gefunden in den letzten 24 Stunden.`
        );
      }
      console.log("resesponsee : " + JSON.stringify(results.join(" ")));
      self.emit(":responseReady");
    });
  },

  "AMAZON.YesIntent": function() {
    console.log("AMAZON.YesIntent: " + JSON.stringify(NEWS));
    self = this;
    if (NEWS && NEWS.length > 1) {
      let currentNews = _.take(NEWS, 3);
      NEWS = _.drop(NEWS, 3);
      let message = currentNews.join(" ");
      if (NEWS && NEWS.length > 1) {
        message += ` Habe noch ${NEWS.length} weitere Nachricht${
          NEWS.length === 1 ? "" : "en"
        } für Dich.`;
        message += " Willst Du noch mehr?";
      } else {
        message += " Das war alles. Tschüssi";
      }
      self.response.speak(message).listen(message);
      self.emit(":responseReady");
    } else {
      self.response.speak(`Habe nix mehr für Dich.`);
      self.emit(":responseReady");
    }
  },

  "AMAZON.NoIntent": function() {
    this.handler.state = States.NONE;
    console.log("AMAZON.NoIntent");
    this.emit(":tell", "Alles klar. Tschüssi");
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

  "AMAZON.StopIntent": function() {
    this.handler.state = States.NONE;
    this.emit("AMAZON.StopIntent");
  },

  "AMAZON.CancelIntent": function() {
    this.handler.state = States.NONE;
    this.emit("AMAZON.CancelIntent");
  }
});
