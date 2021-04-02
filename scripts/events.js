async function fileOnLoad(e) {
    let file = document.getElementById("img0").files[0];
    let base64img = await base64FromFile(file);
    //sessionStorage.setItem("img",base64img);
    //document.getElementById("img2").setAttribute("src",base64img);
    //console.log(base64img);
}


//document.getElementById("img0").onload = function () {
//    
//document.getElementById("img1").setAttribute("src", sessionStorage.getItem("imgStoreTest"));
//}
try {
    document.getElementById("fName").onchange = function nameValid(e) {
        let t = (this.nextSibling.nextSibling.nextSibling);
        if (this.value == null || this.value.replace(/\s/g, '') == ""){
            t.style.display = "inline";
        } else {
            t.style.display = "none";
        }
    }

    document.getElementById("fImgData").onchange = async function preview(e) {
        //
        
        let ext;
        try {
            ext = this.value.match(/\.([^\.]+)$/)[1];
        }
        catch{ }
        let isAccepted = false;
        switch (ext) {
            case 'jpg':
            case 'bmp':
            case 'png':
            case 'jpeg':
                isAccepted = true;
                this.nextSibling.nextSibling.style.display = "none";
                break;
            default:
                this.nextSibling.nextSibling.style.display = "inline";
                isAccepted = false;
                this.value = '';
        }
        //////////////////////
        if (e.target.files && e.target.files[0] && isAccepted) {
            let file = e.target.files[0];
            let URL = window.URL || window.webkitURL;
            let imgURL = URL.createObjectURL(file);
            imgURL = await resizeImg(POSTER_WIDTH, POSTER_HEIGHT, imgURL);
            fImgData = imgURL;
            document.getElementById("imgPreview").src = fImgData;
        } else {
            document.getElementById("imgPreview").src = "";
        }
    }
} catch { }