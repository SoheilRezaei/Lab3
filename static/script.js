let resultCount = 0;
let clearCount = 0;
let trackID;
let trackDetail = [];


async function SearchByGenre(genre) {
    clearList();
    clearplaylistSearch();
    clearplaylistshow();
    // timeSum();
    clearcreatenewplaylist();
    resultCount = 0;
    fetch("http://localhost:3000/Genre/" + genre)
        .then(res => {
            if(!res.ok) {
                return res.text().then(text => { throw new Error(text) }).then(AbortController)
               }
              else {
               return res.json();
             }    
            })
        .then((data) => {
            var i = Object.keys(data).length;
            for (var i = 0; i < Object.keys(data).length; i++) {
                console.log(data[i]);
                createGenreElement(data[i]);
                resultCount += 1;
            }
            if (resultCount == 0) {
                alert("No Result Found");
            }
        })
        .catch(err => {
            console.log("caught it!",err);
         });

}

async function SearchByArtist(artist) {
    console.log(clearCount);
    clearList();
    clearplaylistSearch();
    clearplaylistshow();
    clearcreatenewplaylist();
    resultCount = 0;
    fetch("http://localhost:3000/Artist/" + artist)
        .then(res => {
            if(!res.ok) {
                return res.text().then(text => { throw new Error(text) }).then(AbortController)
            }
            else {
            return res.json();
            }    
            })
        .then((data) => {
            var i = Object.keys(data).length;
            for (var i = 0; i < Object.keys(data).length; i++) {
                createArtistElement(data[i]);
                resultCount += 1;
            }
            if (resultCount == 0) {
                alert("No Result Found");
            }
        })
}

async function SearchByTrack(track) {
    clearList();
    clearplaylistshow();
    clearcreatenewplaylist();
    clearplaylistSearch();
    totalplaylistitems = 0;
    resultCount = 0;
    fetch("http://localhost:3000/trackAlbum/" + track)
        .then(res => {
            if(!res.ok) {
                return res.text().then(text => { throw new Error(text) }).then(AbortController)
            }
            else {
            return res.json();
            }    
            })
        .then((data) => {
            var i = Object.keys(data).length;
            for (var i = 0; i < Object.keys(data).length; i++) {
                console.log(data[i]);
                createSearchElement(data[i]);
                resultCount += 1;
            }
            if (resultCount == 0) {
                alert("No Result Found");
            }
        })
}

async function showlist(trackID) {
    clearplaylistSearch();
    console.log(totalplaylistitems);
    fetch("http://localhost:3000/playlist")
        .then(res => {
            if(!res.ok) {
                return res.text().then(text => { throw new Error(text) }).then(AbortController)
            }
            else {
            return res.json();
            }    
            })
        .then((data) => {
            var i = Object.keys(data).length;
            for (var i = 0; i < Object.keys(data).length; i++) {
                console.log(data[i]);
                createList(data[i], trackID);
            }
        })

}


async function addToList(playlistName, trackID) {
    console.log("track id : " + trackID);
    fetch("http://localhost:3000/playlist/" + playlistName + "/" + trackID)
    .then((text) => {   
        console.log("add track to playlist: " + text);   
        if (text == "yes"){
            
            alert("Track ID " + trackID +" has been added to "+ playlistName)
        }
        else {
            alert("track already exists in "+playlistName);
        }
    });
    
}



async function ShowPlaylist() {
    clearplaylistshow();
    clearList();
    clearplaylistSearch();
    clearcreatenewplaylist();
    totalplaylistitems = 0;
    fetch("http://localhost:3000/GetplaylistName")
        .then(res => {
            if(!res.ok) {
                return res.text().then(text => { throw new Error(text) }).then(AbortController)
            }
            else {
            return res.json();
            }    
            })
        .then((data) => {
            var i = Object.keys(data).length;
            for (var i = 0; i < Object.keys(data).length; i++) {
                console.log(data[i]);
                //    ShowPlaylistItem(data[i]);
                CreateplayListElement(data[i]);
            }
        })
}


async function ShowPlaylistItem(playlistname) {
    clearplaylistitem();
    console.log("req sent");
    fetch("http://localhost:3000/GetplaylistItem/" + playlistname)
        .then(res => {
            if(!res.ok) {
                return res.text().then(text => { throw new Error(text) }).then(AbortController)
            }
            else {
            return res.json();
            }    
            })
        .then((data) => {
            var i = Object.keys(data).length;
            for (var i = 0; i < Object.keys(data).length; i++) {
                console.log(data[i]);
                CreateItemElement(playlistname, data[i]);
            }

        })

}

function RemovePlaylist(playlistname) {
    fetch("http://localhost:3000/RemovePlayList/" + playlistname)
        .then(function() {
            console.log("play list removed");
            ShowPlaylist();
        });


}


const searchGenre = document.getElementById('genre');
const searchArtist = document.getElementById('artist');
const searchTrack = document.getElementById('track');
// const newPlaylist = document.getElementById('nameofnewplaylist');

searchGenre.addEventListener("keypress", (evt) => {
    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    const regex = /^[a-zA-Z0-9_]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
});

searchArtist.addEventListener("keypress", (evt) => {
    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    const regex = /^[a-zA-Z0-9_]*$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
});

searchTrack.addEventListener("keypress", (evt) => {
    const theEvent = evt || window.event;
    let key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    const regex = /^[a-zA-Z0-9_]*$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
});

// newPlaylist.addEventListener("keypress", (evt) => {
//     const theEvent = evt || window.event;
//     let key = theEvent.keyCode || theEvent.which;
//     key = String.fromCharCode(key);
//     const regex = /^[a-zA-Z0-9_]*$/;
//     if (!regex.test(key)) {
//         theEvent.returnValue = false;
//         if (theEvent.preventDefault) theEvent.preventDefault();
//     }
// });


function AddPlaylistMenu() {
    clearcreatenewplaylist();
    clearList();
    clearplaylistshow();
    clearplaylistSearch();
    totalcreatenewplaylist += 1;
    const createplaylistDiv = document.createElement("div");
    createplaylistDiv.setAttribute("id", "createplaylistdiv")
    createplaylistDiv.setAttribute("class", "createplaylistdiv")
    document.body.insertBefore(createplaylistDiv, playlistdiv);

    const playlistnameInput = document.createElement("input");
    playlistnameInput.setAttribute("class", "inputstyle");
    playlistnameInput.setAttribute("id", "nameofnewplaylist")
    playlistnameInput.setAttribute("placeholder", "Enter playlist name...");
    createplaylistDiv.appendChild(playlistnameInput);

    const playlistInput = document.createElement("input");
    playlistInput.setAttribute("type", "image");
    playlistInput.setAttribute("src", "/add.png");
    playlistInput.setAttribute("class", "searchimg");
    playlistInput.setAttribute("onclick", "Addtoplaylist(document.getElementById('nameofnewplaylist').value)");
    createplaylistDiv.appendChild(playlistInput);

    playlistnameInput.addEventListener("keypress", (evt) => {
        const theEvent = evt || window.event;
        let key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        const regex = /^[a-zA-Z0-9_]*$/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    });

}


function Addtoplaylist(value) {
    fetch("http://localhost:3000/AddtoPlayList/" + value)
        .then((response) => response.text())
        .then((text) => {      
            if (text == "yes"){
            ShowPlaylist();
            }
            else {
                alert("Playlist already exists!");
            }
        }); 
}

function sortbyArtist(playlistname){
    console.log("client side sort by artist");
    fetch("http://localhost:3000/SortByArtist")
    .then(function(){
        ShowPlaylistItem(playlistname)
     })
}

const searchDiv = document.getElementById("searchDiv");
searchDiv.setAttribute("class", "searchdiv")
const newList = document.createElement("ul");
searchDiv.appendChild(newList);
newList.setAttribute("class", "ulstyle");



function createGenreElement(newResult) {
    const newli = document.createElement("li");
    newli.setAttribute("id", "newli");
    newli.setAttribute("class", "listyle");
    newList.appendChild(newli);

    var newdiv = document.createElement("div");
    newdiv.setAttribute("class", "GenresearchStyle");
    newli.appendChild(newdiv);

    var newimg = document.createElement("img");
    newimg.setAttribute("src", "/album.png");
    newimg.setAttribute("class", "searchimgstyle");
    newdiv.appendChild(newimg);
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Genre ID : " + newResult[0]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Genre Name : " + newResult[1]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Parent ID : " + newResult[2]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Genre Name : " + newResult[3]));
    newdiv.appendChild(document.createElement("br"));

    clearCount += 1;
}



function createArtistElement(newResult) {
    const newli = document.createElement("li");
    newli.setAttribute("id", "newli");
    newli.setAttribute("class", "listyle");
    newList.appendChild(newli);

    var newdiv = document.createElement("div");
    newdiv.setAttribute("class", "ArtistsearchStyle");
    newli.appendChild(newdiv);

    var newimg = document.createElement("img");
    newimg.setAttribute("src", "/artist.png");
    newimg.setAttribute("class", "searchimgstyle");
    newdiv.appendChild(newimg);
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Artist ID : " + newResult[0]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Artist Name : " + newResult[1]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Artist Handle : " + newResult[2]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Artist Members : "));
    newdiv.appendChild(document.createElement("br"));
    newdiv.appendChild(document.createTextNode(newResult[3]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Number of Favorite : " + newResult[4]));
    newdiv.appendChild(document.createElement("br"));

    var artistlink = document.createElement("a");
    artistlink.setAttribute("href", newResult[5]);
    artistlink.appendChild(document.createTextNode("Artist Url"));
    newdiv.appendChild(artistlink);
    newdiv.appendChild(document.createElement("br"));

    var artistwebsite = document.createElement("a");
    artistwebsite.setAttribute("href", newResult[6]);
    artistwebsite.appendChild(document.createTextNode("Artist Website"));
    newdiv.appendChild(artistwebsite);
    newdiv.appendChild(document.createElement("br"));

    clearCount += 1;
}




function createSearchElement(newResult) {
    const newli = document.createElement("li");
    newli.setAttribute("id", "newli");
    newli.setAttribute("class", "listyle");
    newList.appendChild(newli);

    var newdiv = document.createElement("div");
    newdiv.setAttribute("class", "TracksearchStyle");
    newli.appendChild(newdiv);

    var newimg = document.createElement("img");
    newimg.setAttribute("src", "/music.png");
    newimg.setAttribute("class", "searchimgstyle");
    newdiv.appendChild(newimg);
    newdiv.appendChild(document.createElement("br"));

    const addButton = document.createElement("button")
    addButton.appendChild(document.createTextNode("Add to Playlist"))
    addButton.setAttribute("onclick", "showlist('" + newResult[0] + "')");
    addButton.setAttribute("class", "inputstyle2");
    newdiv.appendChild(addButton);
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Album Name : " + newResult[3]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Track Name : " + newResult[4]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Artist Handle : " + newResult[5]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("TAG : " + newResult[6]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Data created : " + newResult[7]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Data recorded : " + newResult[8]));
    newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Duration : " + newResult[9]));
    newdiv.appendChild(document.createElement("br"));

    // newdiv.appendChild(document.createTextNode("Genre : " + newResult[10]));
    // newdiv.appendChild(document.createElement("br"));

    newdiv.appendChild(document.createTextNode("Track number : " + newResult[11]));
    newdiv.appendChild(document.createElement("br"));

    clearCount += 1;
}



function clearList() {
    if (clearCount > 0) {
        var j = 0;
        while (j < clearCount) {
            var oo = document.getElementById("newli").remove();
            clearCount -= 1;
        }
    }
}
let totalplaylist = 0;

function clearplaylistSearch() {
    if (totalplaylist > 0) {
        var j = 0;
        while (j < totalplaylist) {
            var oo = document.getElementById("playlistItem").remove();
            totalplaylist -= 1;
        }
    }
}
let totalplaylistshow = 0;

function clearplaylistshow() {

    if (totalplaylistshow > 0) {
        var j = 0;
        while (j < totalplaylistshow) {
            var oo = document.getElementById("newplaylistdiv").remove();
            totalplaylistshow -= 1;
        }
    }
}

let totalplaylistitems = 0;

function clearplaylistitem() {

    if (totalplaylistitems > 0) {
        var j = 0;
        while (j < totalplaylistitems) {
            var oo = document.getElementById("playlistli").remove();
            totalplaylistitems -= 1;
        }
    }
}


let totalcreatenewplaylist = 0;

function clearcreatenewplaylist() {

    if (totalcreatenewplaylist > 0) {
        var j = 0;
        while (j < totalcreatenewplaylist) {
            var oo = document.getElementById("createplaylistdiv").remove();
            totalcreatenewplaylist -= 1;
        }
    }
}


function createList(res, trackID) {

    const newButton = document.createElement("button");
    newButton.appendChild(document.createTextNode(res));
    newButton.setAttribute("class", "inputstyle2   ");
    newButton.setAttribute("id", "playlistItem")
    newButton.setAttribute("onclick", "addToList('" + res + "','" + trackID + "')");
    //   newButton.setAttribute("id", res);
    searchDiv.insertBefore(newButton, newList);
    totalplaylist += 1;

}

let playlistdiv = document.getElementById("playlistDiv");
playlistdiv.setAttribute("class", "playlistdiv");


function CreateplayListElement(name) {
    totalplaylistshow += 1;
    console.log("number of playlist added : " + totalplaylistshow);
    const newplaylistDiv = document.createElement("div");
    newplaylistDiv.setAttribute("id", "newplaylistdiv")
    newplaylistDiv.setAttribute("class", "playlistitemdiv");
    playlistdiv.appendChild(newplaylistDiv);


    const newplay = document.createElement("button");
    newplay.appendChild(document.createTextNode(name));
    newplay.setAttribute("class", "inputstyle2");
    newplay.setAttribute("onclick", "ShowPlaylistItem('" + name + "')");
    newplaylistDiv.appendChild(newplay);

    const deletebutton = document.createElement("input");
    deletebutton.setAttribute("onclick", "RemovePlaylist('" + name + "')");
    deletebutton.setAttribute("class", "deleteplaylistimg");
    deletebutton.setAttribute("src", "/delete.png");
    deletebutton.setAttribute("type", "image");
    newplaylistDiv.appendChild(deletebutton);


    const playlistUL = document.createElement("ul");
    playlistUL.setAttribute("id", name);
    newplaylistDiv.appendChild(playlistUL);

}



async function CreateItemElement(playlistname, data) {
    let newResult = [];
    totalplaylistitems += 1;
    const playlistUL = document.getElementById(playlistname);
    console.log("client side data : " + data + "   " + playlistname);
    fetch("http://localhost:3000/getTrack/" + data)
        .then(res => {
            if(!res.ok) {
                return res.text().then(text => { throw new Error(text) }).then(AbortController)
            }
            else {
            return res.json();
            }    
            })
        .then((data) => {
            var i = Object.keys(data).length;
            for (var i = 0; i < Object.keys(data).length; i++) {
                console.log("residim inja");
                newResult.push(data[i]);
            }
            const newli = document.createElement("li");
            newli.setAttribute("id", "playlistli");
            newli.setAttribute("class", "listyle");
            playlistUL.appendChild(newli);

            var newdiv = document.createElement("div");
            newdiv.setAttribute("class", "TrackPlaylistStyle");
            newli.appendChild(newdiv);

            var newimg = document.createElement("img");
            newimg.setAttribute("src", "/music.png");
            newimg.setAttribute("class", "searchimgstyle");
            newdiv.appendChild(newimg);
            newdiv.appendChild(document.createElement("br"));

            // const addButton = document.createElement("button")
            // addButton.appendChild(document.createTextNode("Add to Playlist"))
            // addButton.setAttribute("onclick" , "showlist('"+newResult[0]+"')");
            // addButton.setAttribute("class" , "inputstyle2");
            // newdiv.appendChild(addButton);
            // newdiv.appendChild(document.createElement("br"));

            newdiv.appendChild(document.createTextNode("Album Name : " + newResult[3]));
            newdiv.appendChild(document.createElement("br"));

            newdiv.appendChild(document.createTextNode("Track Name : " + newResult[4]));
            newdiv.appendChild(document.createElement("br"));

            newdiv.appendChild(document.createTextNode("Artist Handle : " + newResult[5]));
            newdiv.appendChild(document.createElement("br"));

            newdiv.appendChild(document.createTextNode("TAG : " + newResult[6]));
            newdiv.appendChild(document.createElement("br"));

            newdiv.appendChild(document.createTextNode("Data created : " + newResult[7]));
            newdiv.appendChild(document.createElement("br"));

            newdiv.appendChild(document.createTextNode("Data recorded : " + newResult[8]));
            newdiv.appendChild(document.createElement("br"));

            newdiv.appendChild(document.createTextNode("Duration : " + newResult[9]));
            newdiv.appendChild(document.createElement("br"));

            newdiv.appendChild(document.createTextNode("Track number : " + newResult[11]));
            newdiv.appendChild(document.createElement("br"));


        })



}

function timeSum() {
Time = [];    
Time[1] = "2:48";
Time[2] = "7:31";

time3 = formatTime(timeToSEC(Time[1]) + timeToSEC(Time[2]));
console.log(time3);

function timeToSEC(time) {
    console.log(time);
    var seg = time.split(":");
    return (seg[0]*60) + (+seg[1]);
}

function zeroPad(num) {
    if (num < 10) {
        return "0"+num;
    }   else    {
        return ""+num;
    }    
}

function formatTime(seconds) {

    return [
        zeroPad(Math.floor(seconds/60)%60),
        zeroPad(seconds%60),
    ].join(":");
}
}
