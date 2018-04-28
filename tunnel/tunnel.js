var fs = require('fs');
var ngrok = require('ngrok');

ngrok.connect(8001, function (err, url) {
console.log("Your address to Amazon Alexa configuration console:");
saveAddress = url;
console.log(saveAddress);

fs.writeFile("address.txt", saveAddress, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

}); 


