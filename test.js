const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("4afb1b4ecb15496b990434c63b6bb8a7");

newsapi.v2
  .everything({
    q: "internet",
    sources: "bbc-news,the-verge",
    domains: "bbc.co.uk, techcrunch.com",
    from: "2017-12-01",
    to: "2018-04-12",
    language: "en",
    sortBy: "relevancy",
    page: 2
  })
  .then(response => {
    const articles = response.articles;
    return articles.map(a => ({ title: a.title, source: a.source.name }));
  })
  .then(results => console.log(JSON.stringify(results)));

/*
  {  
   "status":"ok",
   "totalResults":860,
   "articles":[  
      {  
         "source":{  
            "id":"the-verge",
            "name":"The Verge"
         },
         "author":"Paul Miller",
         "title":"Facebook quitting advice from a professional internet quitter",
         "description":"Paul Miller, the guy who quit the internet for a year, offers tips on dealing with boredom, loneliness, and other rational fears.",
         "url":"https://www.theverge.com/2018/4/12/17226536/how-to-quit-facebook-tips-from-the-year-with-no-internet-guy",
         "urlToImage":"https://cdn.vox-cdn.com/thumbor/YqpqQS-9H9Nv2h5Tg52oELsrWQU=/0x146:2040x1214/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/10454951/mdoying_180118_2249_facebook_0735stills_like.jpg",
         "publishedAt":"2018-04-12T16:34:11Z"
      },
      {  
         "source":{  
            "id":"techcrunch",
            "name":"TechCrunch"
         },
         "author":"Frederic Lardinois",
         "title":"Cloudflare launches Spectrum to protect the internet beyond the web",
         "description":"When it launched back in 2010, Cloudflare was all about speeding up websites and protecting them from hackers. Today, with the launch of Spectrum, it’s taking a major step to move beyond the web and into protecting — and potentially speeding up — other parts …",
         "url":"http://techcrunch.com/2018/04/12/cloudflare-launches-spectrum-to-protect-the-internet-beyond-the-web/",
         "urlToImage":"https://techcrunch.com/wp-content/uploads/2018/04/gettyimages-457584002.jpg?w=600",
         "publishedAt":"2018-04-12T13:00:22Z"
      },
      {  
         "source":{  
            "id":"the-verge",
            "name":"The Verge"
         },
         "author":"Russell Brandom",
         "title":"Internet pioneer John Perry Barlow is dead at 70",
         "description":"The EFF co-founder and author of “A Declaration of the Independence of Cyberspace” died this morning in his Wyoming home.",
         "url":"https://www.theverge.com/2018/2/7/16988568/john-perry-barlow-internet-pioneer-obituary-electronic-frontier-foundation",
         "urlToImage":"https://cdn.vox-cdn.com/thumbor/E7lEXOiizpJeDChJ2Z2fckIFUxY=/0x340:3916x2390/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/10178759/3267043090_ebae707f90_o.jpg",
         "publishedAt":"2018-02-07T23:16:56Z"
      },
      {  
         "source":{  
            "id":"techcrunch",
            "name":"TechCrunch"
         },
         "author":"Romain Dillet",
         "title":"Mozilla announces an open gateway for the internet of things",
         "description":"Apple, Google, Amazon and Samsung have all been working hard to create their own standard to control all the connected devices around your home. Mozilla just announced that anybody can now create an open gateway to control the internet of things. The organiza…",
         "url":"http://techcrunch.com/2018/02/06/mozilla-announces-an-open-framework-for-the-internet-of-things/",
         "urlToImage":"https://tctechcrunch2011.files.wordpress.com/2018/02/mozilla-blog-hero.png",
         "publishedAt":"2018-02-06T19:45:05Z"
      },
      {  
         "source":{  
            "id":"techcrunch",
            "name":"TechCrunch"
         },
         "author":"Danny Crichton",
         "title":"Brainjunk and the killing of the internet mind",
         "description":"Michael Pollan, the best-selling author of food books including the The Omnivore’s Dilemma and Food Rules, summarized his philosophy of eating quite simply. “Eat food. Not too much. Mostly plants.” The idea was to spend more on quality, and avoid the sorts of…",
         "url":"http://techcrunch.com/2018/02/07/brainjunk-and-the-killing-of-the-internet-mind/",
         "urlToImage":"https://tctechcrunch2011.files.wordpress.com/2018/02/gettyimages-587168288.jpg",
         "publishedAt":"2018-02-07T17:07:13Z"
      },
      {  
         "source":{  
            "id":"bbc-news",
            "name":"BBC News"
         },
         "author":"https://www.facebook.com/bbcnews",
         "title":"Deepfake porn videos deleted from internet by Gfycat",
         "description":"The Gyfcat video clip hosting service says the computer-generated clips are objectionable.",
         "url":"http://www.bbc.co.uk/news/technology-42905185",
         "urlToImage":"https://ichef.bbci.co.uk/news/1024/branded_news/10A3A/production/_99845186_22b328f1-5e3a-48e0-8c1c-479bba06d69b.jpg",
         "publishedAt":"2018-02-01T13:59:58Z"
      },
      {  
         "source":{  
            "id":"techcrunch",
            "name":"TechCrunch"
         },
         "author":"Brian Heater",
         "title":"EFF founder and internet activist John Perry Barlow has died",
         "description":"John Perry Barlow has one of those resumes that seems too surreal to possibly be true. Entertainment sites are lamenting the loss of a poet turned Grateful Dead lyricist. Political sites are mourning the death of a lifelong activist. For tech sites such as ou…",
         "url":"http://techcrunch.com/2018/02/07/eff-founder-and-internet-activist-john-perry-barlow-has-died/",
         "urlToImage":"https://tctechcrunch2011.files.wordpress.com/2018/02/gettyimages-141844354.jpeg",
         "publishedAt":"2018-02-07T23:47:33Z"
      },
      {  
         "source":{  
            "id":"bbc-news",
            "name":"BBC News"
         },
         "author":"https://www.facebook.com/bbcnews",
         "title":"Internet pioneer John Perry Barlow dies, aged 70",
         "description":"He was an advocate of free speech and also wrote lyrics for the Grateful Dead rock group.",
         "url":"http://www.bbc.co.uk/news/technology-42945865",
         "urlToImage":"https://ichef-1.bbci.co.uk/news/1024/branded_news/154F3/production/_99938278_johnperrybarlowgetty.jpg",
         "publishedAt":"2018-02-08T11:50:53Z"
      },
      {  
         "source":{  
            "id":"techcrunch",
            "name":"TechCrunch"
         },
         "author":"Khaled \"Tito\" Hamze",
         "title":"Cloudflare is protecting the internet using groovy lava lamps",
         "description":"Cloudflare has a unique way of protecting a huge portion of the world’s internet. They call it their Wall of Entropy; a wall lined with lava lamps that are being filmed with a camera. That data is then converted to numbers jumbled up with a couple other sourc…",
         "url":"http://techcrunch.com/2018/02/16/cloudflare-is-protecting-the-internet-using-groovy-lava-lamps/",
         "urlToImage":"https://s0.wp.com/wp-content/themes/vip/techcrunch-2013/assets/images/techcrunch.opengraph.default.png",
         "publishedAt":"2018-02-16T20:00:42Z"
      },
      {  
         "source":{  
            "id":"techcrunch",
            "name":"TechCrunch"
         },
         "author":"Devin Coldewey",
         "title":"FCC looks to approve SpaceX’s satellite internet plan",
         "description":"SpaceX is planning to send up a pair of its own satellites in this weekend’s launch, in order to test a proposed space-based broadband internet service. But if you want get into the broadband business, first you have to get past its U.S. gatekeepers: the FCC.…",
         "url":"http://techcrunch.com/2018/02/14/fcc-looks-to-approve-spacexs-satellite-internet-plan/",
         "urlToImage":"https://tctechcrunch2011.files.wordpress.com/2018/02/spacex_sat.png",
         "publishedAt":"2018-02-14T17:54:40Z"
      },
      {  
         "source":{  
            "id":"techcrunch",
            "name":"TechCrunch"
         },
         "author":"Natasha Lomas",
         "title":"5G needs a “new mindset” towards Internet rules, telcos warn",
         "description":"Carriers have kicked off the world’s biggest mobile phone tradeshow with calls for an “investment friendly framework” to fund rollouts of next-gen 5G network technology and level the playing field with Internet giants. “We need a new mindset,” argued Telefoni…",
         "url":"http://techcrunch.com/2018/02/26/5g-needs-a-new-mindset-towards-internet-rules-telcos-warn/",
         "urlToImage":"https://tctechcrunch2011.files.wordpress.com/2018/02/photo-26-02-2018-12-57-44.jpg",
         "publishedAt":"2018-02-26T13:45:22Z"
      },
      {  
         "source":{  
            "id":"bbc-news",
            "name":"BBC News"
         },
         "author":"BBC News",
         "title":"Priya Varrier: The actress whose wink stopped India",
         "description":"Actress Priya Varrier recently became one of the most searched for Indian people on the internet.",
         "url":"http://www.bbc.co.uk/news/av/world-asia-india-43327082/priya-varrier-the-actress-whose-wink-stopped-india",
         "urlToImage":"https://ichef.bbci.co.uk/news/1024/branded_news/7D48/production/_100327023_p060gwwr.jpg",
         "publishedAt":"2018-03-11T00:18:03Z"
      },
      {  
         "source":{  
            "id":"bbc-news",
            "name":"BBC News"
         },
         "author":"https://www.facebook.com/bbcnews",
         "title":"Surgeon David Nott: Hack led to Syria air strike",
         "description":"David Nott had helped Syrian surgeons via the internet - weeks later, their hospital was destroyed.",
         "url":"http://www.bbc.co.uk/news/technology-43486131",
         "urlToImage":"https://ichef-1.bbci.co.uk/news/1024/branded_news/11C56/production/_100509727_syria.jpg",
         "publishedAt":"2018-03-21T14:17:36Z"
      },
      {  
         "source":{  
            "id":"bbc-news",
            "name":"BBC News"
         },
         "author":"https://www.facebook.com/bbcnews",
         "title":"Firearms doctor had 'homemade gunpowder' in his house",
         "description":"Retired consultant Martin Watt was also found to have searched the internet for an explosives guide.",
         "url":"http://www.bbc.co.uk/news/uk-scotland-glasgow-west-43319409",
         "urlToImage":"https://ichef-1.bbci.co.uk/news/1024/branded_news/97A4/production/_100302883_capture.png",
         "publishedAt":"2018-03-07T15:17:03Z"
      },
      {  
         "source":{  
            "id":"bbc-news",
            "name":"BBC News"
         },
         "author":"BBC News",
         "title":"Meet the 'Study Tubers': The YouTubers making studying cool",
         "description":"Meet the 'Study Tubers' who are taking over the internet with their revision videos.",
         "url":"http://www.bbc.co.uk/news/av/entertainment-arts-43643299/meet-the-study-tubers-the-youtubers-making-studying-cool",
         "urlToImage":"https://ichef-1.bbci.co.uk/news/1024/branded_news/AA9F/production/_100697634_p0638ql2.jpg",
         "publishedAt":"2018-04-06T01:16:03Z"
      },
      {  
         "source":{  
            "id":"bbc-news",
            "name":"BBC News"
         },
         "author":"BBC News",
         "title":"Tim Berners-Lee: Net has heaps of problems",
         "description":"The inventor of the World Wide Web says the internet today has \"heaps\" of problems.",
         "url":"http://www.bbc.co.uk/news/av/technology-43352455/tim-berners-lee-net-has-heaps-of-problems",
         "urlToImage":"https://ichef.bbci.co.uk/news/1024/branded_news/8D95/production/_100354263_gettyimages-456019614.jpg",
         "publishedAt":"2018-03-12T06:53:34Z"
      },
      {  
         "source":{  
            "id":"bbc-news",
            "name":"BBC News"
         },
         "author":"Bbc News",
         "title":"'More than half' of UK households face broadband problems",
         "description":"Households have seen slow internet speeds, dropouts and router issues in the last year, says Which.",
         "url":"http://www.bbc.co.uk/news/business-43617492",
         "urlToImage":"https://ichef-1.bbci.co.uk/news/1024/branded_news/17AEC/production/_93840079_laptop.jpg",
         "publishedAt":"2018-04-02T09:50:25Z"
      },
      {  
         "source":{  
            "id":"bbc-news",
            "name":"BBC News"
         },
         "author":"https://www.facebook.com/bbcnews",
         "title":"Russian trolls posted fake Clinton porn",
         "description":"Reddit bans hundreds of fake accounts run by Russian internet trolls.",
         "url":"http://www.bbc.co.uk/news/technology-43725706",
         "urlToImage":"https://ichef-1.bbci.co.uk/news/1024/branded_news/148B6/production/_100805148_reddit.jpg",
         "publishedAt":"2018-04-11T10:40:06Z"
      },
      {  
         "source":{  
            "id":"bbc-news",
            "name":"BBC News"
         },
         "author":"https://www.facebook.com/bbcnews",
         "title":"What ‘Dr Love’ says about DR Congo",
         "description":"Despite poor infrastructure and patchy internet, Congolese people find ways to work and learn.",
         "url":"http://www.bbc.co.uk/news/world-africa-42819135",
         "urlToImage":"https://ichef.bbci.co.uk/images/ic/1024x576/p05vxvg6.jpg",
         "publishedAt":"2018-01-28T00:15:01Z"
      },
      {  
         "source":{  
            "id":"bbc-news",
            "name":"BBC News"
         },
         "author":"https://www.facebook.com/bbcnews",
         "title":"Primary school worker had child abuse images",
         "description":"He was sacked following the discovery of thousands of child abuse photos downloaded from the internet.",
         "url":"http://www.bbc.co.uk/news/uk-scotland-tayside-central-43130265",
         "urlToImage":"https://ichef-1.bbci.co.uk/news/1024/branded_news/CF9E/production/_100105135_dscnew.jpg",
         "publishedAt":"2018-02-20T13:31:23Z"
      }
   ]
}
  */
