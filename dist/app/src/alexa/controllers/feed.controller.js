// audio.controller.js
'use strict';


const SyncRequest = require('sync-request');
const xml2js = require('xml2js');

var audioData;
var res = SyncRequest('GET',"http://intrinsify.libsyn.com/rss");
var parseString = xml2js.parseString;
var audioDataAll = [];

parseString(res.getBody(), function(err,result){
  var i;
    for (i = 0; i < (result['rss']['channel'][0]['item']).length; i++) {
        var raw = result['rss']['channel'][0]['item'][i]['enclosure'][0]['$']['url'];
        var url = raw.replace("http", "https") ;
        var title = result['rss']['channel'][0]['item'][i]['title'][0];
        var rssDate = result['rss']['channel'][0]['item'][i]['pubDate'][0];
        var date = new Date(rssDate);
        //From blog you get date which differes +4 hours in ms with podcasts
        audioData = {"title":title,"url":url, "date":date.getTime()+4*3600000, "dateReadable": rssDate};
        audioDataAll.push(audioData);

  }
});
module.exports = audioDataAll;



/*
// Audio Source - AWS Podcast : https://aws.amazon.com/podcasts/aws-podcast/
var audioData = [
    {
        'title' : 'Episode 139',
        'url' : 'https://feeds.soundcloud.com/stream/274166909-amazon-web-services-306355661-aws-podcast-episode-139.mp3'
    },
    {
        'title' : 'Episode 140',
        'url' : 'https://feeds.soundcloud.com/stream/275202399-amazon-web-services-306355661-amazon-web-services.mp3'
    }
];

module.exports = audioData;

*/