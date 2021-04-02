"use strict"
let fImgData = "";
let objHoler = new Film();


async function editinit() {
    let href = window.location.href;
    let id = href.substr(href.search("id=") + 3);
    let film = await getDataFromID(id);
    document.getElementById("imgPreview").src = film.imgData;
    document.getElementById("fName").value = film.name;
    document.getElementById("fCountry").value = film.country;
    document.getElementById("fGenre").value = film.genre;
    document.getElementById("fBoxOffice").value = film.boxOffice;
    document.getElementById("fBudget").value = film.budget;
    document.getElementById("fComposer").value = film.composer;
    document.getElementById("fDescription").value = film.description;
    document.getElementById("fDirector").value = film.director;
    document.getElementById("fLanguage").value = film.language;
    document.getElementById("fOperator").value = film.operator;
    document.getElementById("fProducer").value = film.producer;
    document.getElementById("fRateMPAA").value = film.rateMPAA;
    document.getElementById("fRunningTime").value = film.runningTime;
    document.getElementById("fScreenwriter").value = film.screenwriter;
    let date;
    if (isNaN(film.releaseDate)) {
        document.getElementById("fReleaseDate").value = "";
    } else {
        document.getElementById("fReleaseDate").value = date.toISOString().substr(0, 10);
    }
    
}


async function save() {
    if (document.getElementById("fName").value == "") {
        return;
    }
    //e.preventDefault();
    let objTemp = new Film();
    objTemp.name = document.getElementById("fName").value;
    objTemp.country = document.getElementById("fCountry").value;
    objTemp.boxOffice = document.getElementById("fBoxOffice").value;
    objTemp.budget = document.getElementById("fBudget").value;
    objTemp.composer = document.getElementById("fComposer").value;
    objTemp.description = document.getElementById("fDescription").value;
    objTemp.director = document.getElementById("fDirector").value;
    objTemp.genre = document.getElementById("fGenre").value;

    objTemp.imgData = fImgData;
    objTemp.language = document.getElementById("fLanguage").value;
    objTemp.operator = document.getElementById("fOperator").value;
    objTemp.producer = document.getElementById("fProducer").value;
    objTemp.rateMPAA = document.getElementById("fRateMPAA").value;
    let dt = new Date(document.getElementById("fReleaseDate").value);
    objTemp.releaseDate = dt.getTime();
    objTemp.runningTime = document.getElementById("fRunningTime").value;
    objTemp.screenwriter = document.getElementById("fScreenwriter").value;


    let href = window.location.href;
    let id = href.substr(href.search("id=") + 3);
    await updateDataFromID(objTemp,id);
    window.location.href = window.location.href.replace("editForm", "ShowFilm");
}

function cancel() {
    window.location.href = window.location.href.replace("editForm", "ShowFilm");
}

