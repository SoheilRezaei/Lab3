const express = require('express');
const app = express();
const router = express.Router();


const fs = require("fs");
const { parse } = require("csv-parse");

var Genre = [];
var Artist = [];
var trackAlbum = [];
let result = [];

// Creating the back end handler for Search by Genre request

fs.createReadStream("./lab3-data/genres.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    Genre.push(row);
  })
  .on("end", function () {
    console.log("finished reading genre");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
  
  function searchByGenre(genreName) {
    for (let i=0; i<Genre.length; i++){
      var phrase = new RegExp(genreName, "gi");
      let Result = Genre[i][3].match(phrase);
      if (Result != null){
        console.log(Genre[i][3]);
        for (let j=0; j<Genre.length; j++){
          if (Genre[i][4] == Genre[j][0]){
            console.log(" SubGenre of : " + Genre[j][3]);
            result.push([Genre[i][3], Genre[j][3]]);
          }
        }
      }
    }
    console.log(result)
  }


  app.get ('/Genre/:name', (req, res) =>{
    searchByGenre(req.params.name);
    res.send(result);
    result.length = 0;
  });




// Adding the search by Artist request handler

fs.createReadStream("./lab3-data/artists.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", row => Artist.push(row))
  .on("end", function(){
    console.log("finished reading artists");
  })
  .on("error", function(error){
    console.group(error.message);
  });
  
  function searchByArtists(artistName){
    for(let i=0; i<Artist.length; i++){
      var phrase = new RegExp(artistName, "gi");
      let Result = Artist[i][1].match(phrase);
      if (Result != null){
        console.log(Artist[i][1]);
        result.push(Artist[i][1]);
      }
    }
  }

  app.get('/Artist/:name', (req, res) =>{
    searchByArtists(req.params.name);
    res.send(result);
    result.length = 0;
  });





app.use('/', express.static('static'));

// app.get('/api/genre', (req, res) => {
//     console.log(`GET request for ${req.url}`);
//     res.send(genre);
// });
var port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

