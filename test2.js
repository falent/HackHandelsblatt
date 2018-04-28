var service = require("./dist/app/src/services/newsFeed");
service.getNewsOfLast24h("film").then(r => console.log(JSON.stringify(r)));
