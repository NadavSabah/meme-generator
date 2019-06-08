'use strict'

function init() {
    console.log('init')
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    renderCanvas()

    // var gImgs = [{ id: 1, url: '../img/1.jpg', keywords: ['happy'] }];
    // var gMeme = { selectedImgId: 5, txts: [{ line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }] }
    // var gKeywords = { 'happy': 12, 'funny puk': 1 }

}

function uploadImg(elForm, ev) {
    console.log('elForm', elForm)
    console.log('ev', ev)
    ev.preventDefault();

    console.log(' document.getElementById(imgData)', document.getElementById('imgData'))
    console.log('canvas.toDataURL("img/jpeg");', canvas.toDataURL("img/jpeg"))
    document.getElementById('imgData').value = canvas.toDataURL("img/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl', uploadedImgUrl);

        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="w-inline-block social-share-btn fb" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }doUploadImg

    (elForm, onSuccess);
}
function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(function (response) {
        return response.text()
    })
    .then(onSuccess)
    .catch(function (error) {
        console.error(error)
    })
}

function onFileInputChange(ev) {
    console.log('ev', ev)
    handleImageFromInput(ev, renderCanvas)
}
// img=document.querySelector('.img')
function renderCanvas(img = document.querySelector('.img')) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

function onDrawText() {
    var elColor = document.querySelector('.color').value
    renderCanvas(gImg)

    if (document.querySelector('.top').value !== '') {
        writeOnCanvas(0.1, elColor, 'top', gCurrFont, gFontSize)
    }
    if (document.querySelector('.bottom').value !== '') {
        writeOnCanvas(0.9, elColor, 'bottom', gCurrFont, gFontSize)
    }

    ctx.restore();
}

function writeOnCanvas(location, color, line, gCurrFont, gFontSize) {

    var txt = document.querySelector('.' + line).value
    var y = canvas.height * location
    var x = canvas.width * 0.1

    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.font = gFontSize + 'px ' + gCurrFont
    
    ctx.fillText(txt, x, y);
    ctx.strokeText(txt, x, y);
}
function onSetFont(font) {
    setFont(font)
    onDrawText()
}

function onDecreaseFontSize() {
    console.log('in the func')
    decreaseFont()
    onDrawText()
}
function onIncreaseFontSize() {
    increaseFont()
    onDrawText()
}

function onClearText() {
    console.log('in the func')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function onDownloadImg(elLink) {
    console.log('elLink',elLink)
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}




// function resizeCanvas() {
//     var elContainer = document.querySelector('.share-container');
//     // var elContainer = document.querySelector('body');
//     canvas.width = elContainer.offsetWidth
//     canvas.height = elContainer.offsetHeight
//     }



    // function KeyCheck(event)
    // {

    //    var KeyID = event.keyCode;
    //    switch(KeyID)
    //    {
    //       case 8:
    //       drawText()
    //       break; 
    //       case 46:
    //       alert("delete");
    //       break;
    //       default:
    //       break;
    //    }
    // }
