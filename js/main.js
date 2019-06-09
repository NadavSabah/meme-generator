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
        var locationX = gLoctaion[0].top.locationX
        var locationY = gLoctaion[0].top.locationY
        writeOnCanvas(locationY, locationX, elColor, 'top', gCurrFont, gFontSize)
    }
    if (document.querySelector('.bottom').value !== '') {
        var locationX = gLoctaion[0].bottom.locationX
        var locationY = gLoctaion[0].bottom.locationY
        writeOnCanvas(locationY, locationX, elColor, 'bottom', gCurrFont, gFontSize)
    }

    ctx.restore();
}


function writeOnCanvas(locationY, gLocationX, color, line, gCurrFont, gFontSize) {
    var txt = document.querySelector('.' + line).value
    var y = canvas.height * locationY
    var x = canvas.width * gLocationX

    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.font = gFontSize + 'px ' + gCurrFont

    ctx.fillText(txt, x, y);
    ctx.strokeText(txt, x, y);
}

// i need to know top or bottom
// locatuin x and y
var gMeme = { selectedImgId: 1,
     txts: [{ line: { top: 'top line', bottom: 'bottom line' }, size: 40, color: 'white' }] }
var gLoctaion = [{
    top: { locationY: 0.1, locationX: 0.1 },
    bottom: { locationY: 0.9, locationX: 0.1 }
}]
// console.log(gMeme.txts[0].locationX,'gMeme.txts.locationXg')
// console.log('suppose to write top line and got:',gMeme.txts[0].line.top)
console.log('location y top suppose to print 0.99 ',gLoctaion[0].top.locationX)

function onMoveTxtLeft(elBtn){
    if(elBtn.classList[0] === 'top')gLoctaion[0].top.locationX -= 0.05 
    else gLoctaion[0].bottom.locationX -= 0.05
    onDrawText()
}
function onMoveTxtRight(elBtn){
    console.log('elBtn',elBtn)
    if(elBtn.classList[0] === 'top')gLoctaion[0].top.locationX += 0.05   
    else gLoctaion[0].bottom.locationX += 0.05 
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function onDownloadImg(elLink) {
    console.log('elLink', elLink)
    var imgContent = canvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}

function onToggleLine(elInt){
    console.log('elInt.value',elInt.value)
    var elLine = document.querySelector('.' + elInt.value)
    console.log('elLine',elLine)
    
    if (elLine.style.visibility  === 'visible') elLine.style.visibility  = 'hidden'
    else elLine.style.visibility  = 'visible'
    // elLine.forEach(function(el){el.style.display = 'block'})
    // else elLine.style.display = 'none'
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
