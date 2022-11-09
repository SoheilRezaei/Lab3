
const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');
const csv = require('csv-parser')
const res = require('express/lib/response');
const express = require('express');
const Joi = require('joi')
const app = express();
app.use(express.json());
const router = express.Router();
const { validateSearch } = require("./validator");
const listHeader = ['List_ID', 'Track_ID'];
const playlistHeader = ['Playlist_Name'];



const fs = require("fs");
const { parse } = require("csv-parse");

var Genre = [];
var Artist = [];
var trackAlbum = [];
let result = [];
let playlist = [];
let list = [];
console.log(list, playlist);

fs.createReadStream("./lab3-data/genres.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data",  row => Genre.push(row))
  .on("end" , function(){
    console.log("Finished Reading genre");
  })
  .on("error", function (error) {
    console.log(error.message);
  });


  function searchByGenre(genreName){

    for(let i=0;i<Genre.length;i++){
        var searchname = new RegExp(genreName, "gi");
        let Result = Genre[i][3].match(searchname);
        if (Result!=null){
        console.log(Genre[i][3]);
        for(let j=0;j<Genre.length;j++){
            if (Genre[i][4] == Genre[j][0]){
            console.log("parrent : " + Genre[j][3]);
            result.push([Genre[i][0],Genre[i][3],Genre[j][0],Genre[j][3]]);

            }
        }
        }
    }
  console.log(result)
  }
  


  app.get ('/Genre/:name' , (req , res) =>{
    const { error, value } = validateSearch(req.params.name);
    if (error) {
      return res.send("Invalid Input");
    }
    searchByGenre(req.params.name);
    console.log(result.length);
    if(result.length<=40){
    res.send(result);
    }
    result = [];
});


fs.createReadStream("./lab3-data/artists.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data",  row => Artist.push(row))
  .on("end" , function(){
    console.log("Finished reading Artists");
  })
  .on("error", function (error) {
    console.log(error.message);
  });



function searchByArtist(artistName){
    for(let i=0;i<Artist.length;i++){
        var searchname = new RegExp(artistName, "gi");
        let Result = Artist[i][1].match(searchname);
        if (Result!=null){
        console.log(Artist[i][1]);
        result.push(Artist[i]);
        }
    }
    console.log(result)

  }

  app.get ('/Artist/:name' , (req , res) =>{
    const { error, value } = validateSearch(req.params.name);
    if (error) {
      console.log(error)
      return res.send(error.details);
    }
    searchByArtist(req.params.name);
    console.log(result.length);
    if(result.length<=40){
    res.send(result);
    }
    result = [];
    

});
  


fs.createReadStream("./lab3-data/tracks.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data",  row => trackAlbum.push(row))
  .on("end" , function(){
    console.log("Finished reading tracks");
  })
  .on("error", function (error) {
    console.log(error.message);
  });


app.get ('/trackAlbum/:name' , (req , res) =>{
  const { error, value } = validateSearch(req.params.name);
  if (error) {
    console.log(error)
    return res.send(error.details);
  }
    searchByTrack(req.params.name);
    console.log(result.length);
    if(result.length<=40){
    res.send(result);
    }
    result = [];
    
});



function searchByTrack(trackAlbumName){
  var searchname = new RegExp(trackAlbumName, "gi");
  console.log(searchname);
    for(let i=0;i<trackAlbum.length;i++){
        if (trackAlbum[i][3].match(searchname)!=null || trackAlbum[i][4].match(searchname)!=null || trackAlbum[i][5].match(searchname)!=null) {
        result.push(trackAlbum[i]);
        }
        
    }
  }



fs.createReadStream("./lab3-data/playlist.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data",  row => playlist.push(row))
  .on("end" , function(){
    console.log("loaded the playlist names");
  })
  .on("error", function (error) {
    console.log(error.message);
  });



app.get('/playlist' , (req , res) =>{

res.send(playlist);
result = [];
});





  
fs.createReadStream("./lab3-data/List.csv")
.pipe(parse({ delimiter: ",", from_line: 1 }))
.on("data",  row => list.push(row))
.on("end" , function(){
  console.log("loaded playlist info");
})
.on("error", function (error) {
  console.log(error.message);
});


function completingList(){
  for (i = 0 ; i < list.length ; i++){
    for (j = 0 ; j < trackAlbum.length ; j++){
      if (list[i][1] == trackAlbum[j][0]){
        list[i][2] = trackAlbum[j][3];
        list[i][3] = trackAlbum[j][4];
        list[i][4] = trackAlbum[j][5];
      }
    }
  }
}

app.get('/playlist/:playlist/:trackid' , (req , res) =>{

  flag = AddTrackToPlaylist(req.params.playlist , req.params.trackid);
  console.log("flag : " + flag)
  if (flag == 1){
    res.send("Successful");
  }else{
    res.send("Unsuccessful");
  }
  
    function AddTrackToPlaylist(playlist , trackid){
      flag = 0
      for (i=0 ; i<list.length ; i++){
        if(list[i][0] == playlist && list[i][1] == trackid){
        console.log("found in :" + i)
        flag = 1;
        return 0;
      }
    }
  
      if (flag == 0){
        list.push([ playlist  , trackid ]);
        const val = convertArrayToCSV(list, {
          listHeader,
          seperator: ','
        });
  
        fs.writeFile('./lab3-data/List.csv', val, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });  
        return 1;
      }
    }       
      res.status(200).send();
      result = [];
      });


app.get ('/getTrack/:trackID', (req, res) => {
  const { error, value } = validateSearch(req.params.trackID);
  if (error) {
    console.log(error)
    return res.send(error.details);
  }
  searchInTrack(req.params.trackID);
  res.send(result);
  result = [];
});

function searchInTrack(trackId){
  for (let i=0; i<trackAlbum.length; i++){
    if (trackId == trackAlbum[i][0]){
      result = trackAlbum[i];
    }
  }

}





app.get('/GetplaylistName' , (req , res) =>{
  completingList();  
  res.send(playlist);
  result.length = 0;
});



app.get('/GetplaylistItem/:playlistname' , (req , res) =>{
  const { error, value } = validateSearch(req.params.name);
  if (error) {
    console.log(error)
    return res.send(error.details);
  }
  returnplaylistItem(req.params.playlistname);
  res.send(result);
  result.length = 0;
  });

function returnplaylistItem(playlistname){
  for ( i = 0 ; i<list.length ; i++){
    if(list[i][0] == playlistname){
      result.push(list[i][1]);
    }
  }
  console.log("result : " + result);
}




app.get('/RemovePlayList/:playlistname' , (req , res) =>{
  RemoveFromPlaylist(req.params.playlistname);
  RemoveFromlist(req.params.playlistname);
  res.status(200).send();
  result.length = 0;
  });

function RemoveFromPlaylist(playlistname){
  for ( i = 0; i < playlist.length; i++){
    if(playlist[i] == playlistname){
      playlist.splice(i,1);
    }
  }
  
const val = convertArrayToCSV(playlist, {
  playlistHeader,
  seperator: ','
});

fs.writeFile('./lab3-data/playlist.csv', val, (err) => {
  if (err) throw err;
  console.log('Playlist modified!');
});    

  console.log(playlist);
}
function RemoveFromlist(playlistName){
  for ( i=0; i<list.length; i++){
    if(list[i][0] == playlistName) {
      list.splice(i,1);
      i-=1;
    }
  }
  const val = convertArrayToCSV(list, {
    playlistHeader,
    seperator: ','
  });

fs.writeFile('./lab3-data/List.csv', val, (err) => {
  if (err) throw err;
  console.log('Playlist Details have been modified!')
})

console.log(list);
}





app.get('/AddtoPlayList/:nameofplaylist' , (req , res) =>{
  const { error, value } = validateSearch(req.params.nameofplaylist);
  if (error) {
    console.log(error)
    return res.send(error.details);
  }
  flag = Addnewplaylist(req.params.nameofplaylist);
  if (flag == 1) {
    res.send("Successful");
    result = [];
  }
  else {
    res.send("Unsuccessful")
    result = [];
    }
  });

  
  
  
function Addnewplaylist(playlistname){
  flag = 0;
  for ( i = 0; i < playlist.length; i++){
    if(playlist[i] == playlistname){
      res.send("Already Exists!");
      flag = 1;
      return 0;
    }
    
  }
  if (flag == 0){
    playlist.push([playlistname]);

    const val = convertArrayToCSV(playlist, {
      playlistHeader,
      seperator: ','
    });
  
   fs.writeFile('./lab3-data/playlist.csv', val, (err) => {
      if (err) throw err;
      console.log('Playlists were updated!');
    });    
  }
  
    console.log(playlist);
    return 1;
}


app.get('/SortByArtist' , (req , res) =>{
  sortbyArtist();
  sortbyArtist();
  sortbyArtist();
  sortbyArtist();
  res.status(200).send();
  result.length = 0;
  });


function sortbyArtist(){
      for (let i = 1; i < list.length; i++) {
          let current = list[i];
          let j = i-1; 
          while ((j > -1) && (current[4] < list[j][4])) {
              list[j+1] = list[j];
              j--;
          }
          list[j+1] = current;
      }

}

app.get('/SortByTrack' , (req , res) =>{
  sortbyTrack();
  sortbyTrack();
  sortbyTrack();
  sortbyTrack();
  res.status(200).send();
  result.length = 0;
  });


function sortbyTrack(){
      for (let i = 1; i < list.length; i++) {
          let current = list[i];
          let j = i-1; 
          while ((j > -1) && (current[3] < list[j][3])) {
              list[j+1] = list[j];
              j--;
          }
          list[j+1] = current;
      }

}

app.get('/SortByAlbum' , (req , res) =>{
  sortbyAlbum();
  sortbyAlbum();
  sortbyAlbum();
  sortbyAlbum();
  res.status(200).send();
  result.length = 0;
  });


function sortbyAlbum(){
      for (let i = 1; i < list.length; i++) {
          let current = list[i];
          let j = i-1; 
          while ((j > -1) && (current[2] < list[j][2])) {
              list[j+1] = list[j];
              j--;
          }
          list[j+1] = current;
      }

}

app.get('/Getnumberoftrack/:playlistname' , (req , res) =>{
  console.log("request recieved :" + req.params.playlistname);
  let count = [GetNumbeerOfTrackInPlaylist(req.params.playlistname)];
  res.send(count);
  result = [];
  });


  function GetNumbeerOfTrackInPlaylist(playlist){
   let count = 0
    for (let i = 0; i < list.length; i++) {
     if (list[i][0] == playlist){
      count++;
     }
  }
  return count;
  }




app.use('/' , express.static('static'));


function validate(course){
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(course , schema);
}


var port = process.env.PORT || 3000;
app.listen(port , ()=>console.log(`listening port ${port}`));