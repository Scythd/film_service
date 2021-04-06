"use strict"
async function indexinit() {
    let films;
    films = await getShortFilms(1, 60);
    /// filtration from session !!!!!
    films.forEach(x => {
        let td = new Date(x.releaseDate);
        let d, m;
        d = td.getDate() < 10 ? "0" + td.getDate() : td.getDate();
        m = (td.getMonth()+1) < 10 ? "0" + (td.getMonth()+1) : (td.getMonth()+1);
        let date = d + "." + m + "." + td.getFullYear();
        generateFilmCard(x.id, x.imgData, x.name, x.genre, x.country, date);
    })
}
async function filtrate() {
    ////validation
    let dateb, datea, ctry, genre;
    dateb = (new Date(document.getElementById("beforeDateFilter").value)).getTime();
    datea = (new Date(document.getElementById("afterDateFilter").value)).getTime();
    ctry = document.getElementById("countryFilter").value;
    genre = document.getElementById("genreFilter").value;
    if (isContainsDigits(ctry)) {
        alert("Страна не может содержать число число!");
        return;
    }
    if (isContainsDigits(genre)) {
        alert("Жанр не может содержать число!");
        return;
    }
    filtration(dateb, datea, ctry, genre);
}

///// filtration
async function filtration(dateb, datea, ctry, genre) {
    let films = new Array();
    films = await getShortFilms();

    console.log(datea, dateb , films);
    if (!isNaN(datea)) {
        films = films.filter(x => {
            return (dateCompare(x.releaseDate, datea) >= 0);
        });
    }

    if (!isNaN(dateb))
        films = films.filter(x => {
            return (dateCompare(x.releaseDate, dateb) < 0);
        });
    if (ctry != "")
        films = films.filter(x => x.country.toLowerCase().includes(ctry.toLowerCase()));
    if (genre != "")
        films = films.filter(x => x.genre.toLowerCase().includes(genre.toLowerCase()));
    document.getElementById("FilmsHolder").innerHTML = "";
    films.forEach(x => {
        let td = new Date(x.releaseDate);
        let d, m;
        d = td.getDate() < 10 ? "0" + td.getDate() : td.getDate();
        m = (td.getMonth()+1) < 10 ? "0" + (td.getMonth()+1) : (td.getMonth()+1);
        let date = d + "." + m + "." + td.getFullYear();
        
        
        generateFilmCard(x.id, x.imgData, x.name, x.genre, x.country, date);
        
    });
}

function isContainsDigits(string) {
    return string.includes("0") ||
        string.includes("1") ||
        string.includes("2") ||
        string.includes("3") ||
        string.includes("4") ||
        string.includes("5") ||
        string.includes("6") ||
        string.includes("7") ||
        string.includes("8") ||
        string.includes("9");
}

function dateCompare(date1, date2) {
    let date11 = new Date(date1);
    let date22 = new Date(date2);
    let t1 = date11.getFullYear() - date22.getFullYear();
    t1 = t1 * 100;
    let t2 = date11.getMonth() - date22.getMonth();
    t2 = t2 * 10;
    let t3 = date11.getDay() - date22.getDay();
    return t1 + t2 + t3;
}

function toAddForm(){
    window.location.href = "addForm.html";
}

