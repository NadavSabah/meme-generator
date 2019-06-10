'use strict'

function init() {
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');

    renderCanvas()
}

function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("img/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
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
    handleImageFromInput(ev, renderCanvas)
}

function renderCanvas(img = document.querySelector('.img')) {

    gCanvas.width = img.width;
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
        var locationX = gLoctaion.top.locationX
        var locationY = gLoctaion.top.locationY
        writeOnCanvas(locationY, locationX, elColor, 'top', fontType, fontSize)
    }
    if (document.querySelector('.bottom').value !== '') {
        var locationX = gLoctaion.bottom.locationX
        var locationY = gLoctaion.bottom.locationY
        writeOnCanvas(locationY, locationX, elColor, 'bottom', fontType, fontSize)
    }

    gCtx.restore();
}


function writeOnCanvas(locationY, locationX, color, line, fontType, fontSize) {
    var txt = document.querySelector('.' + line).value
    if (line === 'top') gMeme.txts[0].top = txt
    else gMeme.txts[0].bottom = txt

    var y = gCanvas.height * locationY
    var x = gCanvas.width * locationX

    gCtx.fillStyle = color
    gCtx.strokeStyle = color
    gCtx.font = fontSize + 'px ' + fontType

    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onMoveTxtLeft(elBtn) {
    if (elBtn.classList[0] === 'top') gLoctaion.top.locationX -= 0.05
    else gLoctaion.bottom.locationX -= 0.05
    onDrawText()

}
function onMoveTxtRight(elBtn) {
    if (elBtn.classList[0] === 'top') gLoctaion.top.locationX += 0.05
    else gLoctaion.bottom.locationX += 0.05
    onDrawText()
}
function onMoveTxtUp(elBtn) {
    if (elBtn.classList[0] === 'top') gLoctaion.top.locationY -= 0.05
    else gLoctaion.bottom.locationY -= 0.05
    onDrawText()
}
function onMoveTxtDown(elBtn) {
    if (elBtn.classList[0] === 'top') gLoctaion.top.locationY += 0.05
    else gLoctaion.bottom.locationY += 0.05
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
    var imgContent = gCanvas.toDataURL('imag/jpeg');
    elLink.href = imgContent
}

function resizeCanvas() {
    // checking size of the screen
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
