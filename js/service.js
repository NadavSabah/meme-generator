'use strict'
var gCanvas;
var gCtx;
// var gImg;
var gLoctaion = {
    top: { locationY: 0.1, locationX: 0.1 },
    bottom: { locationY: 0.9, locationX: 0.1 }
}
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
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);

}
function setFont(font) {
    gMeme.txts[0].fontType = font
}
function increaseFont() {
    gMeme.txts[0].fontSize += 5
}
function decreaseFont() {
    gMeme.txts[0].fontSize -= 5
}




