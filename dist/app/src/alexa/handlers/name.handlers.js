
const Alexa = require('alexa-sdk');
const States = require('./states.const');
const SpeechOutputUtils = require('../utils/speech-output.utils');


module.exports = Alexa.CreateStateHandler(States.PODCAST, {

    'NameIntent': function() {


    },



    'Unhandled': function () {
        const speechOutput = '';
        const reprompt = 'Please tell me, how old you are.'
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },

    // Built-In Intents:

    'AMAZON.HelpIntent': function () {
        this.handler.state = States.NONE;
        this.emit(':ask', SpeechOutputUtils.pickRandom(this.t('HELP')));
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























