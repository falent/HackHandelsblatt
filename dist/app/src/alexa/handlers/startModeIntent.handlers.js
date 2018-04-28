const Alexa = require('alexa-sdk');
const States = require('./states.const');
const SpeechOutputUtils = require('../utils/speech-output.utils');
var audioData = require('./audioAssets');
fs = require('fs')

var myIndex = 0;


module.exports = Alexa.CreateStateHandler(States.PODCAST, {
  /*
   *  All Intent Handlers for state : START_MODE
   */
  'ReadPodcastIntent' : function () {
    // Initialize Attributes
    this.attributes['playOrder'] = Array.apply(null, {length: audioData.length}).map(Number.call, Number);
    this.attributes['index'] = 0;
    this.attributes['offsetInMilliseconds'] = 0;
    this.attributes['loop'] = false; //do not loop on the list of podcast
    this.attributes['shuffle'] = false;
    this.attributes['playbackIndexChanged'] = true;
    //  Change state to START_MODE
    this.handler.state = States.PODCAST;

    var message = 'Willkomen in Handelsblatt Podcast sage starte podcast.';
    var reprompt = 'Sage ';

    this.response.speak(message).listen(reprompt);
    this.emit(':responseReady');
  },
  'PlayAudio' : function () {
    if (!this.attributes['playOrder']) {
      // Initialize Attributes if undefined.
      this.attributes['playOrder'] = Array.apply(null, {length: audioData.length}).map(Number.call, Number);
      this.attributes['index'] = 0;
      this.attributes['offsetInMilliseconds'] = 0;
      this.attributes['loop'] = false; //do not loop on the list of podcast
      this.attributes['shuffle'] = false;
      this.attributes['playbackIndexChanged'] = true;
      //  Change state to START_MODE
      this.handler.state = States.PODCAST;
    }

    controller.play.call(this);
  },

  'PlayAudio' : function () { controller.play.call(this) },
  'AMAZON.NextIntent' : function () { controller.playNext.call(this) },
  'AMAZON.PreviousIntent' : function () { controller.playPrevious.call(this) },
  'AMAZON.PauseIntent' : function () { controller.stop.call(this) },
  'AMAZON.StopIntent' : function () { controller.stop.call(this) },
  'AMAZON.CancelIntent' : function () { controller.stop.call(this) },
  'AMAZON.ResumeIntent' : function () { controller.play.call(this) },
  'AMAZON.LoopOnIntent' : function () { controller.loopOn.call(this) },
  'AMAZON.LoopOffIntent' : function () { controller.loopOff.call(this) },
  'AMAZON.ShuffleOnIntent' : function () { controller.shuffleOn.call(this) },
  'AMAZON.ShuffleOffIntent' : function () { controller.shuffleOff.call(this) },
  'AMAZON.StartOverIntent' : function () { controller.startOver.call(this) },
  'AMAZON.HelpIntent' : function () {
    var message = 'Welcome to the AWS Podcast. You can say, play the audio, to begin the podcast.';
    this.response.speak(message).listen(message);
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent' : function () {
    var message = 'Good bye.';
    this.response.speak(message);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent' : function () {
    var message = 'Good bye.';
    this.response.speak(message);
    this.emit(':responseReady');
  },
  'SessionEndedRequest' : function () {
    // No session ended logic
  },
  'Unhandled' : function () {
    var message = 'Sorry, I could not understand. Please say, play the audio, to begin the audio.';
    this.response.speak(message).listen(message);
    this.emit(':responseReady');
  }

});

var controller = function () {
  return {
    play: function () {
      /*
       *  Using the function to begin playing audio when:
       *      Play Audio intent invoked.
       *      Resuming audio when stopped/paused.
       *      Next/Previous commands issued.
       */
      this.handler.state = States.PODCAST;

      if (this.attributes['playbackFinished']) {
        // Reset to top of the playlist when reached end.
        this.attributes['index'] = 0;
        this.attributes['offsetInMilliseconds'] = 0;
        this.attributes['playbackIndexChanged'] = true;
        this.attributes['playbackFinished'] = false;
      }

      var token = String(this.attributes['playOrder'][this.attributes['index']]);
      var playBehavior = 'REPLACE_ALL';
      var podcast = audioData[this.attributes['playOrder'][this.attributes['index']]];
      var offsetInMilliseconds = this.attributes['offsetInMilliseconds'];
      // Since play behavior is REPLACE_ALL, enqueuedToken attribute need to be set to null.
      this.attributes['enqueuedToken'] = null;

      if (canThrowCard.call(this)) {
        var cardTitle = 'Playing ' + podcast.title;
        var cardContent = 'Playing ' + podcast.title;
        this.response.cardRenderer(cardTitle, cardContent, null);
      }

      var message = "This is " + audioData[this.attributes['index']].title;
      this.response.speak(message).audioPlayerPlay(playBehavior, podcast.url, token, null, offsetInMilliseconds);
      this.emit(':responseReady');
    },
    stop: function () {
      /*
       *  Issuing AudioPlayer.Stop directive to stop the audio.
       *  Attributes already stored when AudioPlayer.Stopped request received.
       */
      this.response.audioPlayerStop();
      this.emit(':responseReady');
    },
    playNext: function () {
      /*
       *  Called when AMAZON.NextIntent or PlaybackController.NextCommandIssued is invoked.
       *  Index is computed using token stored when AudioPlayer.PlaybackStopped command is received.
       *  If reached at the end of the playlist, choose behavior based on "loop" flag.
       */
      if (!this.attributes['playOrder']) {
        // Initialize Attributes if undefined.
        this.attributes['playOrder'] = Array.apply(null, {length: audioData.length}).map(Number.call, Number);
        this.attributes['index'] = 0;
        this.attributes['offsetInMilliseconds'] = 0;
        this.attributes['loop'] = false; //do not loop on the list of podcast
        this.attributes['shuffle'] = false;
        this.attributes['playbackIndexChanged'] = true;
        //  Change state to START_MODE
        this.handler.state = States.PODCAST;
      }

      var self = this;
      fs = require('fs')
      fs.readFile(__dirname+"/tom.txt", 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var index = parseInt(data||"0",10);


        index += 1;

        fs.writeFileSync(__dirname+"/tom.txt", index);





        // Check for last audio file.

        // Set values to attributes.
        self.handler.state = States.PODCAST;

        self.attributes['index'] = index;
        self.attributes['offsetInMilliseconds'] = 0;
        self.attributes['playbackIndexChanged'] = true;

        controller.play.call(self);




      });





    },
    playPrevious: function () {
      /*
       *  Called when AMAZON.PreviousIntent or PlaybackController.PreviousCommandIssued is invoked.
       *  Index is computed using token stored when AudioPlayer.PlaybackStopped command is received.
       *  If reached at the end of the playlist, choose behavior based on "loop" flag.
       */
      var index = this.attributes['index'];
      index -= 1;
      // Check for last audio file.
      if (index === -1) {
        if (this.attributes['loop']) {
          index = audioData.length - 1;
        } else {
          // Reached at the end. Thus reset state to start mode and stop playing.
          this.handler.state = States.PODCAST;

          var message = 'You have reached at the start of the playlist.';
          this.response.speak(message).audioPlayerStop();
          return this.emit(':responseReady');
        }
      }
      // Set values to attributes.
      this.attributes['index'] = index;
      this.attributes['offsetInMilliseconds'] = 0;
      this.attributes['playbackIndexChanged'] = true;

      controller.play.call(this);
    },
    loopOn: function () {
      // Turn on loop play.
      this.attributes['loop'] = true;
      var message = 'Loop turned on.';
      this.response.speak(message);
      this.emit(':responseReady');
    },
    loopOff: function () {
      // Turn off looping
      this.attributes['loop'] = false;
      var message = 'Loop turned off.';
      this.response.speak(message);
      this.emit(':responseReady');
    },
    shuffleOn: function () {
      // Turn on shuffle play.
      this.attributes['shuffle'] = true;
      shuffleOrder((newOrder) => {
        // Play order have been shuffled. Re-initializing indices and playing first song in shuffled order.
        this.attributes['playOrder'] = newOrder;
      this.attributes['index'] = 0;
      this.attributes['offsetInMilliseconds'] = 0;
      this.attributes['playbackIndexChanged'] = true;
      controller.play.call(this);
    });
    },
    shuffleOff: function () {
      // Turn off shuffle play.
      if (this.attributes['shuffle']) {
        this.attributes['shuffle'] = false;
        // Although changing index, no change in audio file being played as the change is to account for reordering playOrder
        this.attributes['index'] = this.attributes['playOrder'][this.attributes['index']];
        this.attributes['playOrder'] = Array.apply(null, {length: audioData.length}).map(Number.call, Number);
      }
      controller.play.call(this);
    },
    startOver: function () {
      // Start over the current audio file.
      this.attributes['offsetInMilliseconds'] = 0;
      controller.play.call(this);
    },
    reset: function () {
      // Reset to top of the playlist.
      this.attributes['index'] = 0;
      this.attributes['offsetInMilliseconds'] = 0;
      this.attributes['playbackIndexChanged'] = true;
      controller.play.call(this);
    }
  }
}();

function canThrowCard() {
  /*
   * To determine when can a card should be inserted in the response.
   * In response to a PlaybackController Request (remote control events) we cannot issue a card,
   * Thus adding restriction of request type being "IntentRequest".
   */
  if (this.event.request.type === 'IntentRequest' && this.attributes['playbackIndexChanged']) {
    this.attributes['playbackIndexChanged'] = false;
    return true;
  } else {
    return false;
  }
}

function shuffleOrder(callback) {
  // Algorithm : Fisher-Yates shuffle
  var array = Array.apply(null, {length: audioData.length}).map(Number.call, Number);
  var currentIndex = array.length;
  var temp, randomIndex;

  while (currentIndex >= 1) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  callback(array);
}