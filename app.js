


const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');
const csv = require('csv-parser')
const express = require('express');
const Joi = require('joi')
const res = require('express/lib/response');
const app = express();
app.use(express.json());
const router = express.Router();

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
//////////////////////////////////////////////////////////////////////////////////////////////////////


fs.createReadStream("./genres.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data",  row => Genre.push(row))
  .on("end" , function(){
    console.log("kire khar");
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
    searchByGenre(req.params.name);
    console.log(result.length);
    if(result.length<=40){
    res.send(result);
    }
    result.length = 0
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
fs.createReadStream("./artists.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data",  row => Artist.push(row))
  .on("end" , function(){
    console.log("kir to khamenei");
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
    searchByArtist(req.params.name);
    console.log(result.length);
    if(result.length<=40){
    res.send(result);
    }
    result.length = 0
    

});
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


fs.createReadStream("./tracks.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data",  row => trackAlbum.push(row))
  .on("end" , function(){
    console.log("kir to beyte rahbari");
  })
  .on("error", function (error) {
    console.log(error.message);
  });


app.get ('/trackAlbum/:name' , (req , res) =>{
    searchByTrack(req.params.name);
    console.log(result.length);
    if(result.length<=40){
    res.send(result);
    }
    result.length = 0
    
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

 // 
// || trackAlbum[i][5].match(searchname!=null)  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


fs.createReadStream("./playlist.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data",  row => playlist.push(row))
  .on("end" , function(){
    console.log("kir to jagath");
  })
  .on("error", function (error) {
    console.log(error.message);
  });



app.get('/playlist' , (req , res) =>{

res.send(playlist);
result.length = 0;
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  
fs.createReadStream("./List.csv")
.pipe(parse({ delimiter: ",", from_line: 1 }))
.on("data",  row => list.push(row))
.on("end" , function(){
  console.log("kir tu sam");
})
.on("error", function (error) {
  console.log(error.message);
});




app.get('/playlist/:playlist/:trackid' , (req , res) =>{

    // UpdatePlayList(req.params.playlist , req.params.trackid);
    list.push([ req.params.playlist  , req.params.trackid ]);
    const val = convertArrayToCSV(list, {
      listHeader,
      seperator: ','
    });
    console.log(val);

    fs.writeFile('./List.csv', val, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });    
    res.status(200).send();
    result.length = 0;
    });
  

///////////////////////////////////////////////////////////////////////////


app.get ('/getTrack/:trackID', (req, res) => {
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





//////////////////////////////////////////////////////////////////////////////

app.get('/GetplaylistName' , (req , res) =>{
res.send(playlist);
result.length = 0;
});




//////////////////////////////////////////////////////////////////////////////
app.get('/GetplaylistItem/:playlistname' , (req , res) =>{
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



/////////////////////////////////////////////////////////////////

app.get('/RemovePlayList/:playlistname' , (req , res) =>{
  RemoveFromPlaylist(req.params.playlistname);
  res.status(200).send();
  result.length = 0;
  });

function RemoveFromPlaylist(playlistname){
  for ( i = 0 ; i<playlist.length ; i++){
    if(playlist[i] == playlistname){
      playlist.splice(i,1);
    }
  }
  
const val = convertArrayToCSV(playlist, {
  playlistHeader,
  seperator: ','
});

fs.writeFile('./playlist.csv', val, (err) => {
  if (err) throw err;
  console.log('The playlist file has been saved!');
});    


  console.log(playlist);
}






////////////////////////////////////////////////////////////////////

app.get('/AddtoPlayList/:nameofplaylist' , (req , res) =>{
  Addnewplaylist(req.params.nameofplaylist)
  res.status(200).send();
  result.length = 0;
  });
  
  
function Addnewplaylist(playlistname){
  flag = 0;
  for ( i = 0 ; i<playlist.length ; i++){
    if(playlist[i] == playlistname){
      res.send("unable to add");
      flag = 1;
    }
    
  }
  if (flag==0){
    playlist.push([playlistname]);
  }



  const val = convertArrayToCSV(playlist, {
    playlistHeader,
    seperator: ','
  });
  
  fs.writeFile('./playlist.csv', val, (err) => {
    if (err) throw err;
    console.log('The playlist file has been saved!');
  });    
  
  
    console.log(playlist);
  
}



///////////////////////////////////////////////////////////////////////////


















app.use('/' , express.static('static'));



function validate(course){
    const schema = {
        name : Joi.string().min(3).required()
    };
    return Joi.validate(course , schema);
}


var port = process.env.PORT || 3000;
app.listen(port , ()=>console.log(`listening port ${port}`));