
const Alexa = require('alexa-sdk');
const States = require('./states.const');
const SpeechOutputUtils = require('../utils/speech-output.utils');
var User = require('../models/user');





module.exports = Alexa.CreateStateHandler(States.NAME, {

    'NameIntent': function() {



        var myName = this.event.request.intent.slots.first_name.value;
        this.attributes.name = myName;


        var userID = this.event.session.user.userId;
        console.log(userID);

        self = this;
        User.findOneAndUpdate(
            {userId:  userID},
            {$set:{name:myName}},
            {upsert: true , new: false, runValidators: true},
            function(err, doc){
                if(err){
                    console.log("eeoror");
                }

                console.log(doc);
                if (doc!==null){
                    self.emit(':ask',
                        "Hello "+ myName +"you are new here")
                }else {
                    self.emit(':ask',
                        "Hello "+ myName +"you are not new here")
                }

            });


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























