const Alexa = require("alexa-sdk");
const States = require("./states.const");
const SpeechOutputUtils = require("../utils/speech-output.utils");
var https = require("https");
var _ = require("lodash");
const newsService = require("../../services/newsFeed");

let NEWS = [];
let ALL_NEWS = [];

module.exports = Alexa.CreateStateHandler(States.NEWS, {
  NewsIntent: function(event) {
    var topic = this.event.request.intent.slots.news_topic.value;
    console.log("ttttopicc : " + topic);

    self = this;
    return newsService.getNewsOfLast24h(topic).then(results => {
      console.log(JSON.stringify(results));
      NEWS = results.map((entry, idx) => ({
        ...entry,
        title: `Punkt ${idx + 1}: ${entry.title}`
      }));
      ALL_NEWS = _.cloneDeep(results);

      let currentNews = _.take(NEWS, 3);
      NEWS = _.drop(NEWS, 3);
      if (currentNews && currentNews.length > 1) {
        let message = `Ich habe ${results.length} Ergebnisse gefunden. `;
        message += currentNews.map(e => e.title).join(" ");

        if (NEWS && NEWS.length > 1) {
          message += ` Habe noch ${NEWS.length} weitere Nachricht${
            NEWS.length === 1 ? "." : "en."
          }`;
          message +=
            "Sag die Nummer, wo du noch mehr wissen willst oder willst einfach weiter?";
        } else {
          message += " Mehr hab ich nicht. Ciaoi.";
        }
        self.response.speak(message).listen(message);
      } else {
        self.response.speak(
          `Habe keine Neuigkeiten über ${topic} gefunden in den letzten 24 Stunden.`
        );
      }
      console.log(
        "resesponsee : " + JSON.stringify(results.map(e => e.title).join(" "))
      );
      self.emit(":responseReady");
    });
  },

  "AMAZON.YesIntent": function() {
    console.log("AMAZON.YesIntent: " + JSON.stringify(NEWS));
    self = this;
    if (NEWS && NEWS.length > 1) {
      let currentNews = _.take(NEWS, 3);
      NEWS = _.drop(NEWS, 3);
      let message = currentNews.map(e => e.title).join(" ");
      if (NEWS && NEWS.length > 1) {
        message += ` Habe noch ${NEWS.length} weitere Nachricht${
          NEWS.length === 1 ? "" : "en"
        } für Dich.`;
        message += " Zu welcher Nummer willst Du Details oder einfach weiter?";
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

  NewsDetailsIntent: function(event) {
    self = this;
    var topicNumber = parseInt(
      this.event.request.intent.slots.topicValue.value,
      10
    );
    console.log(
      "ttttopicc number : " + JSON.stringify(this.event.request.intent.slots)
    );

    if (topicNumber > ALL_NEWS.length) {
      let message = `Habe gar nicht soviele Nachrichten. Die Nummer sollte schon zwischen 1 und ${topicNumber} liegen.`;
      self.response.speak(message).listen(message);
    } else {
      console.log(JSON.stringify(ALL_NEWS[topicNumber - 1]));
      console.log("ALL_NEWS " + JSON.stringify(ALL_NEWS));
      let message = `
            Alles klaro. Hier noch mehr zu Punkt ${topicNumber}. 
            ${ALL_NEWS[topicNumber - 1].description}
        `;

      self.response.speak(message).listen(message);
    }
    self.emit(":responseReady");
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
