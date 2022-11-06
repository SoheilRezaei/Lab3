const express = require('express');
const app = express();
const port = 3000;


const fs = require("fs");
const { parse } = require("csv-parse");


var genre = [];


fs.createReadStream("./lab3-data/genres.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    genre.push(row);
  })
  .on("end", function () {
    console.log("finished");
    console.log(genre[10]);
  })
  .on("error", function (error) {
    console.log(error.message);
  });
  

app.use('/', express.static('static'));

// app.get('/api/genre', (req, res) => {
//     console.log(`GET request for ${req.url}`);
//     res.send(genre);
// });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

