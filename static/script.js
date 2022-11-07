
let numberofResult = 0;
let totalnumber = 0;
let trackID;
let trackDetail = [];
let newResult = [];
async function SearchByGenre(genre){
    clearList();
    clearplaylistSearch();
    numberofResult = 0;
    const response = fetch("http://localhost:3000/Genre/" + genre)
    .then(async (res) => await res.json())
    .then(async (data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        console.log(data[i]);
        createGenreElement(data[i]);
        numberofResult +=1;
        }
        if (numberofResult == 0){
            alert("No Result Found");
        }
        return numberofResult;
    })
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function searchByArtist(artist){
    console.log(totalnumber);
    clearList();
    clearplaylistSearch();
    numberofResult = 0;
    const response = fetch("http://localhost:3000/Artist/" + artist)
    .then(async (res) => await res.json())
    .then((data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        createArtistElement(data[i]);
        numberofResult+=1;
        }
        if (numberofResult == 0){
            alert("No Result Found");
        }
        return numberofResult;
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function searchByTrack(track){
    clearList();
    numberofResult = 0;
    const response = fetch("http://localhost:3000/trackAlbum/" + track)
    .then( async (res) => await res.json())
    .then((data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        console.log(data[i]);
        createSearchElement(data[i]);
        numberofResult+=1;
        }
        if (numberofResult == 0){
            alert("No Result Found");
        }
        return numberofResult;
    })
}


async function showlist(trackID){
    clearplaylistSearch();
   // console.log("track id : " + trackID);
   const response = fetch("http://localhost:3000/playlist" )
    .then( async (res) => await res.json())
    .then((data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        console.log(data[i]);
        createList(data[i] , trackID);
        }
        return console.log("Showlist return")
    })

}


async function addToList(playlistName , trackID){
    console.log("track id : " + trackID);
    const response = await fetch("http://localhost:3000/playlist/" + playlistName + "/" + trackID )
    .then(alert("Track ID " + trackID +" has been added to "+ playlistName));
    
}


async function ShowPlaylist(){
    clearplaylistshow();
    clearList();
    clearplaylistSearch();
    const response = await fetch("http://localhost:3000/GetplaylistName" )
    .then( async (res) => await res.json())
    .then( async (data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        console.log(data[i]);
    //    ShowPlaylistItem(data[i]);
        CreateplayListElement(data[i]);
        }
        return console.log(data[i])
    })
}


async function ShowPlaylistItem(playlistname){
    console.log("req sent");
    const response = await fetch("http://localhost:3000/GetplaylistItem/" + playlistname)
    .then( async (res) => await res.json())
    .then((data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        console.log("ShowPlaylistItem :" + data[i]);
        CreateItemElement(playlistname,data[i]);
        }
        return console.log("Return of showplaylistitem" + data[i])
    })

}

//////////////////////////////////////////////////////////////////////////
    const searchDiv = document.getElementById("searchDiv");
    searchDiv.setAttribute("class" , "searchdiv")
    const newList = document.createElement("ul") ;
    searchDiv.appendChild(newList);
    newList.setAttribute("class","ulstyle");



function createGenreElement(newResult){
    const newli = document.createElement("li");
    newli.setAttribute("id","newli");
    newli.setAttribute("class","listyle");
    newList.appendChild(newli);
    /////////////////////////////////////////////////////////////
    var newdiv = document.createElement("div");
    newdiv.setAttribute("class","GenresearchStyle");
    newli.appendChild(newdiv);
    /////////////////////////////////////////////////////////////
    var newimg = document.createElement("img");
    newimg.setAttribute("src","/album.png");
    newimg.setAttribute("class","searchimgstyle");
    newdiv.appendChild(newimg);
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Genre ID : " + newResult[0]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Genre Name : " + newResult[1]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Parent ID : " + newResult[2]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Genre Name : " + newResult[3]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    totalnumber+=1;
}



function createArtistElement(newResult){
    const newli = document.createElement("li");
    newli.setAttribute("id","newli");
    newli.setAttribute("class","listyle");
    newList.appendChild(newli);
    /////////////////////////////////////////////////////////////
    var newdiv = document.createElement("div");
    newdiv.setAttribute("class","ArtistsearchStyle");
    newli.appendChild(newdiv);
    /////////////////////////////////////////////////////////////
    var newimg = document.createElement("img");
    newimg.setAttribute("src","/artist.png");
    newimg.setAttribute("class","searchimgstyle");
    newdiv.appendChild(newimg);
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Artist ID : " + newResult[0]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Artist Name : " + newResult[1]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Artist Handle : " + newResult[2]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Artist Members : "));
    newdiv.appendChild(document.createElement("br"));
    newdiv.appendChild(document.createTextNode(newResult[3]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Number of Favorite : " + newResult[4]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    var artistlink = document.createElement("a");
    artistlink.setAttribute("href" , newResult[5]);
    artistlink.appendChild(document.createTextNode("Artist Url"));
    newdiv.appendChild(artistlink);
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    var artistwebsite = document.createElement("a");
    artistwebsite.setAttribute("href" , newResult[6]);
    artistwebsite.appendChild(document.createTextNode("Artist Website"));
    newdiv.appendChild(artistwebsite);
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    totalnumber+=1;
}





function createSearchElement(newResult){
    const newli = document.createElement("li");
    newli.setAttribute("id","newli");
    newli.setAttribute("class","listyle");
    newList.appendChild(newli);
    /////////////////////////////////////////////////////////////
    var newdiv = document.createElement("div");
    newdiv.setAttribute("class","TracksearchStyle");
    newli.appendChild(newdiv);
    /////////////////////////////////////////////////////////////
    var newimg = document.createElement("img");
    newimg.setAttribute("src","/music.png");
    newimg.setAttribute("class","searchimgstyle");
    newdiv.appendChild(newimg);
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    const addButton = document.createElement("button")
    addButton.appendChild(document.createTextNode("Add to Playlist"))
    addButton.setAttribute("onclick" , "showlist('"+newResult[0]+"')");
    addButton.setAttribute("class" , "inputstyle2");
    newdiv.appendChild(addButton);
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Album Name : " + newResult[3]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Track Name : " + newResult[4]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Artist Handle : " + newResult[5]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("TAG : " + newResult[6]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Data created : " + newResult[7]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Data recorded : " + newResult[8]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Duration : " + newResult[9]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    // newdiv.appendChild(document.createTextNode("Genre : " + newResult[10]));
    // newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    newdiv.appendChild(document.createTextNode("Track number : " + newResult[11]));
    newdiv.appendChild(document.createElement("br"));
    /////////////////////////////////////////////////////////////
    totalnumber+=1;
}



function clearList(){
    if (totalnumber>0){
       var j=0; 
       while(j<totalnumber){
        var oo = document.getElementById("newli").remove();
        totalnumber-=1;
    }
}
}
let totalplaylist = 0;

function clearplaylistSearch(){
    if (totalplaylist>0){
       var j=0; 
       while(j<totalplaylist){
        var oo = document.getElementById("playlistItem").remove();
        totalplaylist-=1;
    }
}
}
let totalplaylistshow = 0;
function clearplaylistshow(){

    if (totalplaylistshow>0){
       var j=0; 
       while(j<totalplaylistshow){
        var oo = document.getElementById("newplaylistdiv").remove();
        totalplaylistshow-=1;
    }
}
}



function createList(res , trackID){
    
    const newButton =  document.createElement("button");
    newButton.appendChild(document.createTextNode(res));
    newButton.setAttribute("class" , "inputstyle2   ");
    newButton.setAttribute("id" , "playlistItem")
    newButton.setAttribute("onclick", "addToList('"+ res+"','"+trackID +"')");
 //   newButton.setAttribute("id", res);
    searchDiv.insertBefore(newButton , newList );
    totalplaylist+=1;
    
}

    let playlistdiv = document.getElementById("playlistDiv"); 
    playlistdiv.setAttribute("class" , "playlistdiv");


    function CreateplayListElement(name){
        totalplaylistshow+=1;
        console.log("number of playlist added : " + totalplaylistshow);
        const newplaylistDiv = document.createElement("div");
        newplaylistDiv.setAttribute("id" , "newplaylistdiv")
        newplaylistDiv.setAttribute("class" , "playlistitemdiv");
        playlistdiv.appendChild(newplaylistDiv);


        const newplay =  document.createElement("button");
        newplay.appendChild(document.createTextNode(name));
        newplay.setAttribute("class" , "inputstyle2");
        newplay.setAttribute("onclick" , "ShowPlaylistItem('" + name + "')");
        newplaylistDiv.appendChild(newplay);

        


        const playlistUL = document.createElement("ul");
        playlistUL.setAttribute("id" , name) ;
        newplaylistDiv.appendChild(playlistUL);

    }


    // async function fetchTrack(newResult, data) {
    //     try {
    //       const response = await fetch("http://localhost:3000/getTrack/" + data);
    //       if (!response.ok) {
    //         throw new Error(`HTTP error: ${response.status}`);
    //       }

    //       const temp = await response.json();
    //       console.log(temp[0]);
    //       for(var j = 0 ; j < Object.keys(temp).length ; j++ ){
    //       console.log("residim inja");
    //       newResult.push(temp[j]);
    //       console.log("client newresult : " + newResult[0]);
    //     } }
    //     catch (error) {
    //       console.error(`Could not get products: ${error}`);
    //     }
    //   }
    


async function CreateItemElement(playlistname , PlaylistItem){
    const playlistUL = document.getElementById(playlistname);
    console.log("client side data : " + PlaylistItem + "   "  + playlistname) ;

    fetch("http://localhost:3000/getTrack/" + PlaylistItem)
    .then( async (res) => await res.json())
    .then((data) => {
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        console.log("residim inja");
        newResult = JSON.parse(data[i]);
        }
        return console.log(newResult);
    })
    
    
    const newli = document.createElement("li");
        newli.setAttribute("id","playlistli");
        newli.setAttribute("class","listyle");
        playlistUL.appendChild(newli);
        /////////////////////
        ////////////////////////////////////////
        var newdiv = document.createElement("div");
        newdiv.setAttribute("class","TrackPlaylistStyle");
        newli.appendChild(newdiv);
        /////////////////////////////////////////////////////////////
        var newimg = document.createElement("img");
        newimg.setAttribute("src","/music.png");
        newimg.setAttribute("class","searchimgstyle");
        newdiv.appendChild(newimg);
        newdiv.appendChild(document.createElement("br"));
        /////////////////////////////////////////////////////////////
        // const addButton = document.createElement("button")
        // addButton.appendChild(document.createTextNode("Add to Playlist"))
        // addButton.setAttribute("onclick" , "showlist('"+newResult[0]+"')");
        // addButton.setAttribute("class" , "inputstyle2");
        // newdiv.appendChild(addButton);
        // newdiv.appendChild(document.createElement("br"));
        /////////////////////////////////////////////////////////////
        newdiv.appendChild(document.createTextNode("Album Name : " + newResult[3]));
        newdiv.appendChild(document.createElement("br"));
        /////////////////////////////////////////////////////////////
        newdiv.appendChild(document.createTextNode("Track Name : " + newResult[4]));
        newdiv.appendChild(document.createElement("br"));
        /////////////////////////////////////////////////////////////
        newdiv.appendChild(document.createTextNode("Artist Handle : " + newResult[5]));
        newdiv.appendChild(document.createElement("br"));
        /////////////////////////////////////////////////////////////
        newdiv.appendChild(document.createTextNode("TAG : " + newResult[6]));
        newdiv.appendChild(document.createElement("br"));
        /////////////////////////////////////////////////////////////
        newdiv.appendChild(document.createTextNode("Data created : " + newResult[7]));
        newdiv.appendChild(document.createElement("br"));
        /////////////////////////////////////////////////////////////
        newdiv.appendChild(document.createTextNode("Data recorded : " + newResult[8]));
        newdiv.appendChild(document.createElement("br"));
        /////////////////////////////////////////////////////////////
        newdiv.appendChild(document.createTextNode("Duration : " + newResult[9]));
        newdiv.appendChild(document.createElement("br"));
        /////////////////////////////////////////////////////////////
        // newdiv.appendChild(document.createTextNode("Genre : " + newResult[10]));
        // newdiv.appendChild(document.createElement("br"));
        /////////////////////////////////////////////////////////////
        newdiv.appendChild(document.createTextNode("Track number : " + newResult[11]));
        newdiv.appendChild(document.createElement("br"));
    
}
