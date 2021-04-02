let POSTER_HEIGHT = 600;
let POSTER_WIDTH = 400;

class Film {

    constructor() {
        this.name = "";
        this.country = "";
        this.genre = "";
        this.director = ""; // режиссёр 
        this.screenwriter = "";
        this.producer = "";
        this.operator = "";
        this.composer = "";
        this.budget = "";
        this.boxOffice = ""; // сборы
        this.language = "";
        this.runningTime = "";
        this.releaseDate = "";
        this.rateMPAA = "";
        this.imgData = "";
        this.description = "";
    }
    toString() {
        let res = "{\"name\": \"" + this.name + "\"," +
            "\"country\": \"" + this.country + "\"," +
            "\"genre\": \"" + this.genre + "\"," +
            "\"director\": \"" + this.director.toString() + "\"," +
            "\"screenwriter\": \"" + this.screenwriter + "\"," +
            "\"producer\": \"" + this.producer + "\"," +
            "\"operator\": \"" + this.operator + "\"," +
            "\"composer\": \"" + this.composer + "\"," +
            "\"budget\": \"" + this.budget + "\"," +
            "\"boxOffice\": \"" + this.boxOffice + "\"," +
            "\"language\": \"" + this.language + "\"," +
            "\"runningTime\": \"" + this.runningTime + "\"," +
            "\"releaseDate\": \"" + this.releaseDate + "\"," +
            "\"rateMPAA\": \"" + this.rateMPAA + "\"," +
            "\"imgData\": \"" + this.imgData + "\"," +
            "\"description\": \"" + this.description + "\"\n}";
        return res;
    }
}

class ShortFilm {
    constructor() {
        this.id = "";
        this.name = "";
        this.country = "";
        this.releaseDate = "";
        this.imgData = "";
        this.genre = "";

    }
}

class Comment {
    constructor() {
        this.username = "";
        this.job = "";
        this.text = "";
        this.rate = "";
    }
    init(un, j, t, r) {
        this.username = un;
        this.job = j;
        this.text = t;
        this.rate = r;
        return this;
    }
}