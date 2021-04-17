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

function fill(btn) {
    let URLinput = document.getElementById("apiTarget");
    let url = (new String(URLinput.value)).trim();
    //////////////////'https://www.themoviedb.org/movie/64690-drive'
    let from = url.lastIndexOf('movie/') + 6;
    let length = url.indexOf('-', from) - from;
    let id = Number.parseInt(url.substr(from, length));
    if (isNaN(id)) {
        alert("Что-то пошло не так, проверьте правильность ввода. Помните что принимаются только ссылки только на фильмы только с сайта themoviedb.org");
    } else {
        getObj(id, fillInputs);
    }
}

async function getObj(id, callback) {
    let res;
    id = Number.parseInt(id);
    if (isNaN(id)) {
        throw new Error("id arg is not a number");
    } else {
        let url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=0305aa2210ea0cdd75fad421e2f2a265&language=ru-RU';
        let request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.onreadystatechange = (e) => {

            if (e.target.readyState == 4) {
                console.log(e.target.response);
                let answer = JSON.parse(e.target.response);
                try {
                    callback(answer);
                } finally {
                    return answer;
                }
            }
        }
        request.onerror = () => {
            alert("Что-то пошло не так, не удалось подключиться к сайту themoviedb.org. " +
                " Попробуйте повторить попытку позже." +
                " Так же убедитесь, что AdBlock выключен." +
                " Так же возможно в вашей стране запрешено подключение к данному ресурсу или ваш провайдер ограничил подключение.");
        }
        request.send();
    }
}

var themoviedbPics = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
function fillInputs(obj) {
    if (obj == null || obj == undefined) {
        throw new Error("Object is empty");
    }
    document.getElementById("fName").value = obj.title;
    document.getElementById("fCountry").value = obj.production_companies[0].origin_country;
    //document.getElementById("fBoxOffice").value = obj. ;
    document.getElementById("fBudget").value = obj.budget + '$';
    document.getElementById("fDescription").value = obj.overview;
    let genres = obj.genres;
    genres = genres.map((obj, index, arr) => { return obj.name })
    document.getElementById("fGenre").value = genres.toString().replaceAll(",", ", ");
    let languages = obj.spoken_languages;
    languages = languages.map((obj, index, array) => { return obj.name; });
    document.getElementById("fLanguage").value = languages.toString().replaceAll(",", ", ");
    document.getElementById("fReleaseDate").value = obj.release_date;
    document.getElementById("fRunningTime").value = obj.runtime + "мин.";
    fImgData = themoviedbPics + obj.poster_path;
    document.getElementById("imgPreview").src = fImgData;
    console.log(obj)
    if (obj.adult) {
        document.getElementById("fRateMPAA").value = 'R';
    }
    else {
        document.getElementById("fRateMPAA").value = 'NC-17';
    }
    /*
        document.getElementById("fScreenwriter").value = obj.;
        document.getElementById("fOperator").value = obj.;
        document.getElementById("fProducer").value = obj.;
        
        document.getElementById("fComposer").value = obj.;
        document.getElementById("fDirector").value = obj.;
    */
}