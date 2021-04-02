"use strict"
let fImgData = "";
let objHoler = new Film();


function add() {
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
    let transaction = db.transaction(['films'], 'readwrite');
    transaction.oncomplete = function () {
        console.log('Transaction completed: database modification finished.');
        window.location.href = ("index.html");
    };
    transaction.onerror = function () {
        console.log('Transaction not opened due to error');
    };

    let objectStore = transaction.objectStore('films');
    var request = objectStore.add(objTemp);
}

