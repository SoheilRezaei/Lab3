
var resultCount = 0;
// Adding the Search By Genre request

async function SearchByGenre(genre){
    fetch("http://localhost:5000/Genre/" + genre)
    .then((res) => res.json())
    .then((data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        console.log(data[i]);
        createGenreElement(data[i]);
        resultCount += 1;
        }
        if (resultCount == 0) alert("No results found!");
    })
}

// Adding the Search By Artist request

async function SearchByArtist(artist){
    resultCount = 0;
    fetch("http://localhost:5000/Artist/" + artist)
    .then((res) => res.json())
    .then((data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        createArtistElement(data[i]);
        resultCount += 1;
        console.log(data[i]);
        }
        if (resultCount == 0) alert("No results found!");
    })
}

// Adding the Search by Track or Album request

async function SearchByTrack(track){
    fetch("http://localhost:5000/Track/" + track)
    .then((res) => res.json())
    .then((data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        console.log(data[i]);
        }
    })
}

async function SearchByAlbum(album){
    fetch("http://localhost:5000/Album/" + album)
    .then((res) => res.json())
    .then((data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        console.log(data[i]);
        }
    })
}


const searchDiv = document.getElementById("searchDiv");
const newList = document.createElement("ul") ;
searchDiv.appendChild(newList);
newList.setAttribute("class","ulstyle");


function createGenreElement(newResult){
    const newli = document.createElement("li");
    newli.setAttribute("class","listyle");
    newList.appendChild(newli);

    var newdiv = document.createElement("div");
    newdiv.setAttribute("class","GenresearchStyle");
    newli.appendChild(newdiv);

    var newimg = document.createElement("img");
    newimg.setAttribute("src","./lab3-data/album.png");
    newimg.setAttribute("class","searchimgstyle");
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

}




function createArtistElement(newResult){
    const newli = document.createElement("li");
    newli.setAttribute("class","listyle");
    newList.appendChild(newli);

    var newdiv = document.createElement("div");
    newdiv.setAttribute("class","ArtistsearchStyle");
    newli.appendChild(newdiv);

    var newimg = document.createElement("img");
    newimg.setAttribute("src","/artist.png");
    newimg.setAttribute("class","searchimgstyle");
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
    artistlink.setAttribute("href" , newResult[5]);
    artistlink.appendChild(document.createTextNode("Artist Url"));
    newdiv.appendChild(artistlink);
    newdiv.appendChild(document.createElement("br"));

    var artistwebsite = document.createElement("a");
    artistwebsite.setAttribute("href" , newResult[6]);
    artistwebsite.appendChild(document.createTextNode("Artist Website"));
    newdiv.appendChild(artistwebsite);
    newdiv.appendChild(document.createElement("br"));

}


