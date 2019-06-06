'use strict'

var canvas;
var ctx;




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



function drawText() {
    var elColor = document.querySelector('.color').value
    renderCanvas()

    if (document.querySelector('.top').value !== '') {
        writeOnCanvas(0.1, elColor, 'top')
    }
    if (document.querySelector('.bottom').value !== '') {
        writeOnCanvas(0.9, elColor, 'bottom')
    }

    ctx.restore();
}
function Clear_text() {
    myCanvas_context.clearRect(x, y, 600, 300);
}


function writeOnCanvas(location, color, line) {
    var txt = document.querySelector('.' + line).value
    var y = canvas.height * location
    var x = canvas.width * 0.1

    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.font = "40px Arial";
    ctx.fillText(txt, x, y);
    ctx.strokeText(txt, x, y);
}