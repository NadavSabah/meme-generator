'use strict'
var gCanvas;
var gCtx;
// var gImg;
var gLoctaion = [{
    top: { locationY: 0.1, locationX: 0.1 },
    bottom: { locationY: 0.9, locationX: 0.1 }
}]
var gMeme = {
    selectedImgId: 1,
    txts: [{ top: '', bottom: '', color: 'white', fontSize: 40, fontType: 'Arial' }]
}


function handleImageFromInput(ev, onImageReady) {
    
    document.querySelector('#myCanvas').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img = document.querySelector('.img')
        // gImg = img
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);

}
function setFont(font) {
    // gCurrFont = font
    gMeme.txts[0].fontType = font
    console.log(' gMeme.txts[0].fontType', gMeme.txts[0].fontType)
    console.log(gMeme)
}
function increaseFont() {
    gMeme.txts[0].fontSize += 1
}
function decreaseFont() {
    gMeme.txts[0].fontSize -= 1
}




// function doUploadImg(elForm, onSuccess) {
//     var formData = new FormData(elForm);

//     fetch('http://ca-upload.com/here/upload.php', {
//         method: 'POST',
//         body: formData
//     })
//     .then(function (response) {
//         return response.text()
//     })
//     .then(onSuccess)
//     .catch(function (error) {
//         console.error(error)
//     })
// }