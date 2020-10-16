const express = require('express');

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xhr = new XMLHttpRequest();
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {  
    xhr.open("GET", "https://time.com/", true);
    xhr.onload = function () {
        // console.log(xhr.responseText);
        var para = xhr.responseText.match(/<ol class="swipe-h">[\s|\S]*?<\/ol>/g);
        // console.log(para);
        var k = para[0].match(/<a href=[\s|\S]*?>[\s|\S]*?<\/a>/g);
        // console.log(k);
        let name = [];
        let start = "http://time.com";  
        k.forEach(function(item){
          let link = item.match(/=[\s|\S]*?>/); 
          let t=item.replace(/<a href=[\s|\S]*?>|<\/a>/g, " ").trim();
          let eo = {
            "title":t,
            "link":start+link[0].slice(1,-1)
          }
          name.push(eo);
        });
        var main = {};
        main["news"] = name;
        console.log(main);
        res.send(main);   
    };
    xhr.send();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
  