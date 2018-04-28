
const Alexa = require('alexa-sdk');
const States = require('./states.const');
const SpeechOutputUtils = require('../utils/speech-output.utils');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('c866993f343e4bb096d52115b8662314');
var https = require('https');


module.exports = Alexa.CreateStateHandler(States.NEWS, {

    'NewsIntent': function() {
        var category = this.event.request.intent.slots.news_category.value;

        self = this;
        newsapi.v2.everything({
            q: 'trump',
            sources: 'bbc-news,the-verge',
            domains: 'bbc.co.uk, techcrunch.com',
            from: '2017-12-01',
            to: '2018-12-12',
            language: 'en',
            sortBy: 'relevancy',
            page: 2
          }).then(response => {
            console.log(response);

            self.response.speak((response["articles"][0]["description"]))
            self.emit(':responseReady');
          });

     
    },


    // Unhandled Intent:

    'Unhandled': function () {
        this.handler.state = States.NONE;
        this.emit('Unhandled'); // emit in newSession handlers
    },

    // Built-In Intents:

    'AMAZON.HelpIntent': function () {
        this.handler.state = States.NONE;
        this.emit(':ask', SpeechOutputUtils.pickRandom(this.t('HELP')));
    },

    'AMAZON.NoIntent': function() {
        this.handler.state = States.NONE;
        this.emit('AMAZON.CancelIntent');
    },

    'AMAZON.StopIntent': function () {
        this.handler.state = States.NONE;
        this.emit('AMAZON.StopIntent');
    },

    'AMAZON.CancelIntent': function () {
        this.handler.state = States.NONE;
        this.emit('AMAZON.CancelIntent');
    }

});
