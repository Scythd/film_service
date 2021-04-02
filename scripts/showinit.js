async function showInit() {
    let href = window.location.href;
    let film = await getDataFromID(href.substr(href.search("id=") + 3));
    
    film.imgData==null?film.imgData = "":film.imgData=film.imgData;
    film.country==null?film.country = "":film.country=film.country;
    film.genre==null?film.genre = "":film.genre=film.genre;
    film.director==null?film.director = "":film.director=film.director;
    film.screenwriter==null?film.screenwriter = "":film.screenwriter=film.screenwriter;
    film.producer==null?film.producer = "":film.producer=film.producer;
    film.operator==null?film.operator = "":film.operator=film.operator;
    film.composer==null?film.composer = "":film.composer=film.composer;
    film.budget==null?film.budget = "":film.budget=film.budget;
    film.boxOffice==null?film.boxOffice = "":film.boxOffice=film.boxOffice;
    film.language==null?film.language = "":film.language=film.language;
    film.runningTime==null?film.runningTime = "":film.runningTime=film.runningTime;
    film.releaseDate==null?film.releaseDate = "":film.releaseDate=film.releaseDate;
    film.rateMPAA==null?film.rateMPAA = "":film.rateMPAA=film.rateMPAA;
    film.description==null?film.description = "":film.description=film.description;

    document.getElementById("ftitle").innerText = film.name;
    document.getElementById("fimg").src = film.imgData;
    document.getElementById("fcountry").innerText = film.country;
    document.getElementById("fgenre").innerText = film.genre;
    document.getElementById("fdir").innerText = film.director;
    document.getElementById("fscen").innerText = film.screenwriter;
    document.getElementById("fprod").innerText = film.producer;
    document.getElementById("fop").innerText = film.operator;
    document.getElementById("fcomp").innerText = film.composer;
    document.getElementById("fbudg").innerText = film.budget;
    document.getElementById("fbo").innerText = film.boxOffice;
    document.getElementById("flang").innerText = film.language;
    document.getElementById("flen").innerText = film.runningTime;
    let td = new Date(film.releaseDate);
    let d, m;
    d = td.getDate() < 10 ? "0" + td.getDate() : td.getDate();
    m = (td.getMonth()+1) < 10 ? "0" + (td.getMonth()+1) : (td.getMonth()+1);
    let date = d + "." + m + "." + td.getFullYear();
    document.getElementById("fdate").innerText = date.includes("NaN")?"":date;
    document.getElementById("frate").innerText = film.rateMPAA;
    document.getElementById("fdesc").innerText = film.description;
    
    document.getElementById("fimg").style.setProperty("heigth", POSTER_HEIGHT.toString());
    document.getElementById("fimg").style.setProperty("width", POSTER_WIDTH.toString());    
}

async function deleteThis(){
    let href = window.location.href;
    let id = href.substr(href.search("id=")+3);
    await deleteDataFromID(id);
    window.location.href = "index.html";
}

function editOn(){
    window.location.href = window.location.href.replace("ShowFilm","editForm");
}
