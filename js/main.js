'use strict'
function init() {
    console.log('init')
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');
    renderCanvas()

    var gImgs = [{ id: 1, url: '../img/1.jpg', keywords: ['happy'] }];
    var gMeme = { selectedImgId: 5, txts: [{ line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }] }
    var gKeywords = { 'happy': 12, 'funny puk': 1 }

}

function onFileInputChange(ev) {
    console.log(ev)
    handleImageFromInput(ev, renderCanvas)
    // drawText('hello world',10,10)
    console.log('draw')
}

function renderCanvas(img=document.querySelector('.img')) {
    
    canvas.width = img.width;
    canvas.height = img.height;
    var ratioX = canvas.width / img.naturalWidth;
var ratioY = canvas.height / img.naturalHeight;
var ratio = Math.min(ratioX, ratioY);

ctx.drawImage(img, 0, 0,);
    // ctx.drawImage(img, 0, 0);
    
    
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
