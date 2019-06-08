'use strict'

var canvas;
var ctx;
var gCurrFont = 'Arial'
var gFontSize = 40
var gImg;


function handleImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        gImg = img
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);

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

function setFont(font){
    gCurrFont = font
    console.log('font',gCurrFont)
}

function increaseFont(){
    ++gFontSize
}

function decreaseFont(){
    --gFontSize
}

