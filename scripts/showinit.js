async function showInit() {
    let href = window.location.href;
    let film = await getDataFromID(href.substr(href.search("id=") + 3));

    film.imgData == null ? film.imgData = "" : film.imgData = film.imgData;
    film.country == null ? film.country = "" : film.country = film.country;
    film.genre == null ? film.genre = "" : film.genre = film.genre;
    film.director == null ? film.director = "" : film.director = film.director;
    film.screenwriter == null ? film.screenwriter = "" : film.screenwriter = film.screenwriter;
    film.producer == null ? film.producer = "" : film.producer = film.producer;
    film.operator == null ? film.operator = "" : film.operator = film.operator;
    film.composer == null ? film.composer = "" : film.composer = film.composer;
    film.budget == null ? film.budget = "" : film.budget = film.budget;
    film.boxOffice == null ? film.boxOffice = "" : film.boxOffice = film.boxOffice;
    film.language == null ? film.language = "" : film.language = film.language;
    film.runningTime == null ? film.runningTime = "" : film.runningTime = film.runningTime;
    film.releaseDate == null ? film.releaseDate = "" : film.releaseDate = film.releaseDate;
    film.rateMPAA == null ? film.rateMPAA = "" : film.rateMPAA = film.rateMPAA;
    film.description == null ? film.description = "" : film.description = film.description;

    document.getElementById("ftitle").innerText = film.name;
    if (film.imgData == "") {
        film.imgData = "NoPoster.jpg";
    }
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
    m = (td.getMonth() + 1) < 10 ? "0" + (td.getMonth() + 1) : (td.getMonth() + 1);
    let date = d + "." + m + "." + td.getFullYear();
    document.getElementById("fdate").innerText = date.includes("NaN") ? "" : date;
    document.getElementById("frate").innerText = film.rateMPAA;
    document.getElementById("fdesc").innerText = film.description;

    document.getElementById("fimg").style.setProperty("heigth", POSTER_HEIGHT.toString());
    document.getElementById("fimg").style.setProperty("width", POSTER_WIDTH.toString());
}

async function deleteThis() {
    let href = window.location.href;
    let id = href.substr(href.search("id=") + 3);
    await deleteDataFromID(id);
    window.location.href = "index.html";
}

function editOn() {
    window.location.href = window.location.href.replace("ShowFilm", "editForm");
}

async function showComments() {
    let href = window.location.href;
    let id = await href.substr(href.search("id=") + 3);
    document.getElementById("addRate").style.setProperty("display", "block");
    let holder = document.getElementById("rateHolder");
    holder.innerHTML = "";
    let rates = await getDataCFromId(id);

    rates.forEach((x, i, arr) => {
        let child = constructRateDiv(x.username, x.job, x.text, x.rate, x.id);
        holder.appendChild(child);
    });
}

function constructRateDiv(username, job, text, rate, id) {
    let div = document.createElement("div");
    div.classList.add("rateDiv");
    div.id = "rate" + id;
    let h3, h4, p, span;
    h3 = document.createElement("h3");
    h4 = document.createElement("h4");
    p = document.createElement("p");
    span = document.createElement("span");
    h3.classList.add("rUN");
    h4.classList.add("rJ");
    p.classList.add("rT");
    span.classList.add("rR");
    h3.innerHTML = username;
    h4.innerHTML = job;
    p.innerHTML = text;
    span.innerHTML = rate;
    let button = document.createElement("button");
    button.id = id;
    button.innerHTML = "Удалить комментарий";
    button.style.setProperty("margin-left","10px");
    button.onclick = (e) => {
        removeDataCFromRId(e.target.id);
        showComments();
    }
    div.appendChild(h3);
    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(span);
    div.appendChild(button);
    return div;
}

function addRate() {
    document.getElementById("rateAddForm").style.setProperty("display", "block");
}

function closeRate(){
    document.getElementById('rAFUN').value = '';
    document.getElementById('rAFJ').value = '';
    document.getElementById('rAFT').value = '';
    document.getElementById('rAFR').value = '';
    document.getElementById('rateAddForm').style.setProperty('display','none');
}

function addRateFromForm() {
    let un, j, t, r;
    un = document.getElementById('rAFUN').value;
    j = document.getElementById('rAFJ').value;
    t = document.getElementById('rAFT').value;
    r = document.getElementById('rAFR').value;
    r = new Number(r);
    console.log(r);
    if (un == "") {
        alert("Пожалуйста, введите никнейм. Поле не должно быть пустым");
        return;
    }
    if (!isNaN(r)) {
        if (r >= 0 && r <= 10){
        } else {
            alert("Оценка ведётся по 10-ти бальной шкале. Введите число от 0 до 10 включительно.");
            return;
        }
    } else {
        alert("Проверьте правильность ввода оценки.");
        return;
    }
    let href = window.location.href;
    let fid = href.substr(href.search("id=")+3);
    let rate = new Comment();
    rate.init(un, j, t, r, fid);
    putDataC(rate);
    showComments();
    closeRate();
}