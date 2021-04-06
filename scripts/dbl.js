"use strict"
var db;

window.onload = async () => {
    let request = window.indexedDB.open("films", 2);
    request.onerror = function () {
        console.log('Database failed to open');
    };
    request.onsuccess = async () => {
        console.log('Database opened successfully');
        db = request.result;
        //displayData();


        try {
            await indexinit();
        } catch { }
        if (window.location.href.includes("ShowFilm.html")) {
            await showInit();
        }
        if (window.location.href.includes("editForm.html")) {
            await editinit();
        }
    };

    request.onupgradeneeded = function (e) {
        let db = e.target.result;
        try {
            let objectStore1 = db.createObjectStore('Comments', { keyPath: 'id', autoIncrement: true });
            objectStore1.createIndex('username', 'username', { unique: false });
            objectStore1.createIndex('job', 'job', { unique: false });
            objectStore1.createIndex('text', 'text', { unique: false });
            objectStore1.createIndex('rate', 'rate', { unique: false });
        } catch { }
        try {
            console.log('Database setup complete');
            let objectStore = db.createObjectStore('films', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('name', 'name', { unique: false, });
            objectStore.createIndex('country', 'country', { unique: false });
            objectStore.createIndex('genre', 'genre', { unique: false });
            objectStore.createIndex('director', 'director', { unique: false });
            objectStore.createIndex('screenwriter', 'screenwriter', { unique: false });
            objectStore.createIndex('producer', 'producer', { unique: false });
            objectStore.createIndex('operator', 'operator', { unique: false });
            objectStore.createIndex('composer', 'composer', { unique: false });
            objectStore.createIndex('budget', 'budget', { unique: false });
            objectStore.createIndex('boxOffice', 'boxOffice', { unique: false });
            objectStore.createIndex('language', 'language', { unique: false });
            objectStore.createIndex('runningTime', 'runningTime', { unique: false });
            objectStore.createIndex('releaseDate', 'releaseDate', { unique: false });
            objectStore.createIndex('rateMPAA', 'rateMPAA', { unique: false });
            objectStore.createIndex('imgData', 'imgData', { unique: false });
            objectStore.createIndex('description', 'description', { unique: false });
        } catch { }
    };


}


function displayData() {
    var temp;
    let objectStore = db.transaction('films').objectStore('films');
    objectStore.openCursor().onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            let temp = new Film();
            temp.boxOffice = cursor.value.boxOffice;
            temp.budget = cursor.value.budget;
            temp.composer = cursor.value.composer;
            temp.country = cursor.value.country;
            temp.description = cursor.value.description;
            temp.director = cursor.value.director;
            temp.genre = cursor.value.genre;
            temp.imgData = cursor.value.imgData;
            temp.language = cursor.value.language;
            temp.name = cursor.value.name;
            temp.operator = cursor.value.operator;
            temp.producer = cursor.value.producer;
            temp.rateMPAA = cursor.value.rateMPAA;
            temp.releaseDate = cursor.value.releaseDate;
            temp.runningTime = cursor.value.runningTime;
            temp.screenwriter = cursor.value.screenwriter;
            console.log(temp);
            cursor.continue();
        }

    };
}


function deleteDataFromName(nameToDel) {
    let tr = db.transaction(['films'], 'readwrite');
    let objectStore = tr.objectStore('films');
    objectStore.openCursor().onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            if (cursor.value.name == nameToDel) {
                cursor.delete();
            }
            cursor.continue();
        }

    };
}

async function deleteDataFromID(idToDel) {
    idToDel = Number.parseInt(idToDel);
    let tr = db.transaction(['films'], 'readwrite');
    let objectStore = tr.objectStore('films');
    let curs = objectStore.openCursor();
    var isEnded = false;
    curs.onsuccess = (e) => {
        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            if (cursor.value.id == idToDel) {
                isEnded = true;
                cursor.delete();
                return;
            }
            cursor.continue();
        }

    };
    curs.onerror = (e) => {
        isEnded = true;
        console.log("deletion cursor error")
    }

    while (!isEnded) {
        await sleep(1000);
    }
    return;
}

async function getDataFromID(idTo) {
    var idToGet = idTo;
    var isEnd = false;
    var result;
    let tr = db.transaction(['films'], 'readwrite');

    let objectStore = tr.objectStore('films');
    objectStore.openCursor().onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            if (cursor.value.id == idToGet) {
                let temp = new Film();
                temp.boxOffice = cursor.value.boxOffice;
                temp.budget = cursor.value.budget;
                temp.composer = cursor.value.composer;
                temp.country = cursor.value.country;
                temp.description = cursor.value.description;
                temp.director = cursor.value.director;
                temp.genre = cursor.value.genre;
                temp.imgData = cursor.value.imgData;
                temp.language = cursor.value.language;
                temp.name = cursor.value.name;
                temp.operator = cursor.value.operator;
                temp.producer = cursor.value.producer;
                temp.rateMPAA = cursor.value.rateMPAA;
                temp.releaseDate = cursor.value.releaseDate;
                temp.runningTime = cursor.value.runningTime;
                temp.screenwriter = cursor.value.screenwriter;
                result = temp;
                isEnd = true;
                return;
            } else {
                cursor.continue();
            }
        }

    };
    while (!isEnd) {
        await sleep(500);
    }

    return result;
}

function deleteDataAll() {
    let tr = db.transaction(['films'], 'readwrite');
    let objectStore = tr.objectStore('films');
    objectStore.openCursor().onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            cursor.delete();
            cursor.continue();
        }

    };
}

function getAllData() {
    var temp;
    var result = new Array()
    let objectStore = db.transaction('films').objectStore('films');
    objectStore.openCursor().onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            temp = new Film();
            temp.boxOffice = cursor.value.boxOffice;
            temp.budget = cursor.value.budget;
            temp.composer = cursor.value.composer;
            temp.country = cursor.value.country;
            temp.description = cursor.value.description;
            temp.director = cursor.value.director;
            temp.genre = cursor.value.genre;
            temp.imgData = cursor.value.imgData;
            temp.language = cursor.value.language;
            temp.name = cursor.value.name;
            temp.operator = cursor.value.operator;
            temp.producer = cursor.value.producer;
            temp.rateMPAA = cursor.value.rateMPAA;
            temp.releaseDate = cursor.value.releaseDate;
            temp.runningTime = cursor.value.runningTime;
            temp.screenwriter = cursor.value.screenwriter;
            result.push(temp);
            cursor.continue();
        }

    };
    return result;
}

async function getShortFilms(lower, upper) {
    let needRange = false;
    if (lower < 0 || upper < 0 || lower == undefined || upper == undefined) {
        needRange = true;
    }
    var isOver = false;
    var curi = 1;
    var temp;
    var result = new Array()
    let objectStore = db.transaction('films').objectStore('films');
    objectStore.openCursor().onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;
        // If there is still another data item to iterate through, keep running this code
        if (cursor) {

            if (needRange && curi < lower) {
                cursor.continue();
            } else if (needRange && curi >= upper) {
                cursor.continue();
            } else {
                temp = new ShortFilm();
                temp.id = cursor.value.id;
                temp.country = cursor.value.country;
                temp.genre = cursor.value.genre;
                temp.imgData = cursor.value.imgData;
                temp.name = cursor.value.name;
                temp.releaseDate = cursor.value.releaseDate;
                result.push(temp);
                cursor.continue();
            }
            curi++;
        } else {
            isOver = true;
        }

    };
    while (!isOver) {
        await sleep(1000);
    }
    return result;
}

function getDataCount() {
    var res = 0;
    let objectStore = db.transaction('films').objectStore('films');
    objectStore.openCursor().onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;
        let curi = 0;
        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            res++;
            cursor.continue();
        }
    }
    return res;
}

async function updateDataFromID(object, idTo) {
    var idToGet = Number.parseInt(idTo);
    var isEnd = false;
    var result;
    let tr = db.transaction(['films'], 'readwrite');

    let objectStore = tr.objectStore('films');
    let curs = objectStore.openCursor();
    curs.onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            if (cursor.value.id == idToGet) {
                object.id = idToGet;
                isEnd = true;
                cursor.update(object);
                return;
            } else {
                cursor.continue();
            }
        }

    };
    curs.onerror = (e) => {
        isEnded = true;
        console.log("deletion cursor error")
    }
    while (!isEnd) {
        await sleep(1000);
    }
    return;
}



function displayDataC() {
    var temp;
    let objectStore = db.transaction('Comments').objectStore('Comments');
    objectStore.openCursor().onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            console.log(cursor.value);
            cursor.continue();
        }

    };
}


async function getDataCFromId(id) {
    var arr = new Array();
    var isEnded = false;
    let objectStore = db.transaction('Comments').objectStore('Comments');
    objectStore.openCursor().onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            if (cursor.value.filmId == id) {
                arr.push(cursor.value);
            }
            cursor.continue();
        } else {
            isEnded = true;
        }

    };
    while (!isEnded) {
        await sleep(1000);
    }
    return arr;
}

async function removeDataCFromRId(id) {
    var isEnded = false;
    let objectStore = db.transaction(['Comments'],'readwrite').objectStore('Comments');
    objectStore.openCursor().onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            if (cursor.value.id == id) {

                cursor.delete();
                isEnded = true;
            } else {
                cursor.continue();
            }
        } else {
            isEnded = true;
        }

    };
    while (!isEnded) {
        await sleep(1000);
    }
}

async function putDataC(rate) {
    let transaction = db.transaction(['Comments'], 'readwrite');
    transaction.oncomplete = function () {
        console.log('Transaction completed: database modification finished.');
    };
    transaction.onerror = function () {
        console.log('Transaction not opened due to error');
    };
    let objectStore = transaction.objectStore('Comments');
    var request = objectStore.add(rate);
}


async function removeDataCAll() {
    var isEnded = false;
    let objectStore = db.transaction(['Comments'],'readwrite').objectStore('Comments');
    objectStore.openCursor().onsuccess = function (e) {
        // Get a reference to the cursor
        let cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            cursor.delete();
            cursor.continue();
        }
        else {
            isEnded = true;
        }

    };
    while (!isEnded) {
        await sleep(1000);
    }
}
