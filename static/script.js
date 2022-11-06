

// Adding the Search By Genre request

async function SearchByGenre(genre){
    fetch("http://localhost:5000/Genre/" + genre)
    .then((res) => res.json())
    .then((data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        console.log(data[i]);
        }
    })
}

// Adding the Search By Artist request

async function SearchByArtist(artist){
    fetch("http://localhost:5000/Artist/" + artist)
    .then((res) => res.json())
    .then((data) => {
        var i = Object.keys(data).length;
        for(var i = 0 ; i < Object.keys(data).length ; i++ ){
        console.log(data[i]);
        }
    })
}
