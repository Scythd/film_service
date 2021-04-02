function getLongestString(strArr) {
    let result;
    if (strArr == null)
        throw new Error("Аргумент не должен быть null");
    if (!Array.isArray(strArr))
        throw new Error("Аргумент должен быть МАССИВОМ строк");
    if (strArr.length == 0)
        return null;
    if (strArr[0] === strArr[0].toString()) {
        let maxlength = strArr[0].length;
        result = strArr[0];
        for (let i = 1; i < strArr.length; i++) {
            if (maxlength < strArr[i].length) {
                maxlength = strArr[i].length
                result = strArr[i];
            }
        }
        return result;
    }
    else
        throw new Error("Аргумент должен быть массиовм СТРОК");
}
function getFashion(str) {
    if (str == null)
        throw new Error("Аргумент не должен быть null");
    if (!(str.toString() === str))
        throw new Error("Аргумент должен быть строкой");
    if (str.length == 0) return null;
    let temp = new Map();
    let t = new Set();
    for (let i = 0; i < str.length; i++) {
        if (temp.get(str[i]) == undefined) {
            temp.set(str[i], 1);

        }
        else {
            temp.set(str[i], temp.get(str[i]) + 1);
        }
        t.add(str[i]);
    }

    let tit = t.values();
    let res = (tit.next()).value;
    let max = temp.get(res);
    for (let i = 1; i < t.size; i++) {
        let ttemp = (tit.next()).value;
        //alert(ttemp);
        //alert(temp.get(ttemp));
        if (temp.get(ttemp) > max) {
            max = temp.get(ttemp);
            res = ttemp;
        }
    }
    return res;
}


function changeFashionIn(str, new1) {
    let old1 = getFashion(str);
    let res = "";
    for (let c of str) {
        if (c === old1) {
            res += new1;
        } else {
            res += c;

        }
    }
    return res;
}

function isAnagramm(str1, str2) {
    if (str1 == str2)
        return false;
    if (str1 == null || str2 == null)
        return false;
    if (str1.length != str2.length)
        return false;
    let map1 = new Map(), map2 = new Map();
    let t = new Set();
    for (let i = 0; i < str1.length; i++) {
        if (map1.get(str1[i]) == undefined) {
            map1.set(str1[i], 1);
        }
        else {
            map1.set(str1[i], map1.get(str1[i]) + 1);
        }
        if (map2.get(str2[i]) == undefined) {
            map2.set(str2[i], 1);
        }
        else {
            map2.set(str2[i], map2.get(str2[i]) + 1);
        }
        t.add(str1[i]);
    }
    let tIter = t.values();
    for (let i = 0; i < t.size; i++) {
        let tIr = tIter.next().value;
        if (map1.get(tIr) != map2.get(tIr)) {
            return false;
        }
    }
    return true;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function base64FromFile(file) {
    let reader = new FileReader();
    let isOver = false;
    reader.onload = function (e) {
        document.getElementById("img1").setAttribute("src", e.target.result);
        isOver = true;
    }
    reader.readAsDataURL(file);
    if (!isOver) {
        await sleep(1000);
    }
    return document.getElementById("img1").getAttribute("src");
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function resizeImg(tWidth, tHeight, imgData) {
    let isEnded = false;
    var img = document.createElement("img");
    let res;
    
    
    img.onload = function (imageEvent) {
        let MAX_WIDTH = tWidth;
        let MAX_HEIGHT = tHeight;
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        //resize the image if it higher than MAX_WIDTH or MAX_HEIGHT
        if ((width > MAX_WIDTH) || (height > MAX_HEIGHT)) {
            if ((width / height) > (MAX_WIDTH / MAX_HEIGHT)) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
            else {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
            let canvas = document.createElement("canvas");
            canvas.width = POSTER_WIDTH;
            canvas.height = POSTER_HEIGHT;
            let ctx = canvas.getContext("2d");
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,POSTER_WIDTH,POSTER_HEIGHT);
            ctx.fill;
            ctx.drawImage(img, (POSTER_WIDTH - width) / 2, (POSTER_HEIGHT - height) / 2, width, height);
            img.setAttribute("src",canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
            isEnded = true;
        }
    };
    img.src = imgData;
    while (!isEnded){
        await sleep(200);
    }
    return img.src;
}
function generateFilmCard(id, imageData, title, genre, country, date) {
    if (date.includes("NaN")){
        date = "дата выходе не указана";
    }
    if (imageData === ""){
        // paste another pic
    }
    if (genre === ""){
        genre = "жанр не указан";
    }
    if (country === ""){
        country = "страна производства не указана";
    }

    let holder = document.createElement("div");
    holder.classList.add("filmCard");
    
    let ctitle = document.createElement("h3");
    ctitle.classList.add("filmCardTitle");
    ctitle.innerHTML = title;
    holder.appendChild(ctitle);

    let img = document.createElement("img");
    img.src = imageData;
    img.alt = "Постер отсутствует";
    img.classList.add("filmCardImg");
    holder.appendChild(img);

    let cdate = document.createElement("p");
    cdate.innerHTML = "Дата выхода: " + date;
    cdate.classList.add("filmCardRD");
    cdate.classList.add("filmCardText");
    holder.appendChild(cdate);

    let cgenre = document.createElement("p");
    cgenre.innerHTML = "Жанр: " + genre;
    cgenre.classList.add("filmCardGenre");
    cgenre.classList.add("filmCardText");
    holder.appendChild(cgenre);

    let ccountry = document.createElement("p");
    ccountry.innerHTML = "Страна производства: " + country;
    ccountry.classList.add("filmCardCountry");
    ccountry.classList.add("filmCardText");
    holder.appendChild(ccountry);

    holder.id = id;
    holder.onclick = function (e) {
        sessionStorage.setItem["filmID"] = this.id;
        window.location.href = "ShowFilm.html?id="+this.id;
    }
    document.getElementById("FilmsHolder").appendChild(holder);
}