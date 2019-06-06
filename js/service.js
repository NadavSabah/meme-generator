'use strict'

var canvas;
var ctx;

function init() {
    console.log('init')
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    renderCanvas()

    var gImgs = [{ id: 1, url: '../img/1.jpg', keywords: ['happy'] }];
    var gMeme = { selectedImgId: 5, txts: [{ line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }] }
    var gKeywords = { 'happy': 12, 'funny puk': 1 }

}


function handleImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);

}



function drawText(elTxt,ev, x, y) {
    
    renderCanvas()

    var txt = elTxt.value
    // console.log(txt)
    // console.log(ev.keyCode)
    // if(ev.keyCode === 8) {
    //     console.log('txt',txt)
    //     txt  = txt.subsring(1,txt.length-1)
    // }
    // console.log('txt',txt)
    // console.log(ev)
    y = canvas.height * 0.1
    x = canvas.width * 
    0.1
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'white'
    ctx.font = "40px Arial";
    ctx.fillText(txt, x, y);
    // ctx.fillText("Zibri", (canvas.width / 2) - 17, (canvas.height / 2) + 8);
    ctx.strokeText(txt, x, y);
    // ctx.save()
ctx.setTransform(1, 0, 0, 1, 0, 0);
// Will always clear the right space
// ctx.clearRect(x, y, canvas.width, canvas.height);
 
ctx.restore();
// Still have my old transforms

}
function Clear_text() {
    myCanvas_context.clearRect(x, y, 600, 300);
}

