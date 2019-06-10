'use strict'

function init() {
    console.log('init')
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');

    renderCanvas()


    // var gImgs = [{ id: 1, url: '../img/1.jpg', keywords: ['happy'] }];
    // var gMeme = { selectedImgId: 5, txts: [{ line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }] }
    // var gKeywords = { 'happy': 12, 'funny puk': 1 }


    // console.log('window.innerWidth', window.innerWidth)
    // console.log(' gCanvas.width', gCtx.width)}
    // gCanvas.width = window.innerWidth;
    // gCanvas.height = window.innerHeight;
}

function uploadImg(elForm, ev) {
    ev.preventDefault();

    console.log(' document.getElementById(imgData)', document.getElementById('imgData'))
    console.log('canvas.toDataURL("img/jpeg");', gCanvas.toDataURL("img/jpeg"))
    document.getElementById('imgData').value = gCanvas.toDataURL("img/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        console.log('uploadedImgUrl', uploadedImgUrl);

        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`);
    } doUploadImg

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
    console.log('ev',ev)
    handleImageFromInput(ev, renderCanvas)
}

function renderCanvas(img = document.querySelector('.img')) {

    gCanvas.width = img.width;
    // img.width = gCanvas.width;
    // img.height = gCanvas.height;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    resizeCanvas()



}


function onDrawText() {
    var elColor = document.querySelector('.color').value
    gMeme.txts[0].color = elColor
    var fontType = gMeme.txts[0].fontType
    var fontSize = gMeme.txts[0].fontSize


    renderCanvas()

    if (document.querySelector('.top').value !== '') {
        var locationX = gLoctaion[0].top.locationX
        var locationY = gLoctaion[0].top.locationY
        writeOnCanvas(locationY, locationX, elColor, 'top', fontType, fontSize)
    }
    if (document.querySelector('.bottom').value !== '') {
        var locationX = gLoctaion[0].bottom.locationX
        var locationY = gLoctaion[0].bottom.locationY
        writeOnCanvas(locationY, locationX, elColor, 'bottom', fontType, fontSize)
    }

    gCtx.restore();

}


function writeOnCanvas(locationY, gLocationX, color, line, gCurrFont, gFontSize) {
    var txt = document.querySelector('.' + line).value
    if (line === 'top') gMeme.txts[0].top = txt
    else gMeme.txts[0].bottom = txt

    var y = gCanvas.height * locationY
    var x = gCanvas.width * gLocationX

    gCtx.fillStyle = color
    gCtx.strokeStyle = color
    gCtx.font = gFontSize + 'px ' + gCurrFont

    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onMoveTxtLeft(elBtn) {
    if (elBtn.classList[0] === 'top') gLoctaion[0].top.locationX -= 0.05
    else gLoctaion[0].bottom.locationX -= 0.05
    onDrawText()
}
function onMoveTxtRight(elBtn) {
    console.log('elBtn', elBtn)
    console.log('elBtn.classList[0]',elBtn.classList[0])
    if (elBtn.classList[0] === 'top') gLoctaion[0].top.locationX += 0.05
    else gLoctaion[0].bottom.locationX += 0.05
    onDrawText()
}
function onMoveTxtUp(elBtn) {
    if (elBtn.classList[0] === 'top') gLoctaion[0].top.locationY -= 0.05
    else gLoctaion[0].bottom.locationY -= 0.05
    onDrawText()
}
function onMoveTxtDown(elBtn) {
    if (elBtn.classList[0] === 'top') gLoctaion[0].top.locationY += 0.05
    else gLoctaion[0].bottom.locationY += 0.05
    onDrawText()
}

function onSetFont(font) {
    setFont(font)
    onDrawText()
}

function onDecreaseFontSize() {
    decreaseFont()
    onDrawText()
}
function onIncreaseFontSize() {
    increaseFont()
    onDrawText()
}

function onClearText() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function onDownloadImg(elLink) {
    console.log('elLink', elLink)
    var imgContent = gCanvas.toDataURL('imag/jpeg');
    elLink.href = imgContent
}

function onToggleLine(elInt) {
    var elLine = document.querySelector('.' + elInt.value)
    if (elLine.style.visibility === 'visible') elLine.style.visibility = 'hidden'
    else elLine.style.visibility = 'visible'

}

function resizeCanvas() {
    if (window.innerWidth < 700 && window.innerWidth > 600) {
        gCanvas.width = window.innerWidth * 0.85
        gCanvas.height = window.innerHeight * 0.75

        var width = gCanvas.width
        var height = gCanvas.height

        drawImg(width, height)
    }
    else if (window.innerWidth <= 600) {
        gCanvas.width = window.innerWidth * 0.85
        gCanvas.height = window.innerHeight * 0.55

        var width = gCanvas.width
        var height = gCanvas.height

        drawImg(width, height)
    }

}


function drawImg(width, height) {
    let img = document.querySelector('.img');
    gCtx.drawImage(img, 0, 0, width, height)

}
