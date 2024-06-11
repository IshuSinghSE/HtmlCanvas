const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d', {
    willReadFrequently: true,
    // alpha: false,
})
canvas.width = 512
canvas.height = 512

const menu = document.getElementById('menu')
const hamburger = document.getElementById('hamburger')
const cross = document.getElementById('cross')
hamburger.addEventListener('click', () => {
    menu.classList.toggle('open')
    hamburger.style.display = 'none'
    cross.style.display = 'block'
})
cross.addEventListener('click', () => {
    menu.classList.toggle('open')
    hamburger.style.display = 'block'
    cross.style.display = 'none'
})


const label = document.getElementById('label')
const sliderInput = document.getElementById('slider-value')

const slider = document.getElementById('slider')
slider.addEventListener('change', handleSlider)

const imageFile = document.getElementById('upload')
imageFile.addEventListener('change', convert2Base64)

const download = document.getElementById('download')
download.addEventListener('click', downloadCanvasArt)

const drop = document.getElementsByClassName('dropped')
const drag = document.getElementsByClassName('dragged')


//  Drag & Drop functionality
const dropRegion = document.getElementById("drag-drop"); // where images are previewed

dropRegion.addEventListener('dragenter', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRegion.style.opacity = '1';
    dropRegion.classList.add('drop-start')
    }, false);

dropRegion.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropRegion.classList.remove('drop-start')
    }, false);
    
dropRegion.addEventListener('dragover', preventDefault, false);
dropRegion.addEventListener('drop', handleDrop, false);


// User Adjustable settings
const background = document.getElementById('background')
background.addEventListener('change', handleAttribute)

const symbolShadow = document.getElementById('symbol-shadow')
symbolShadow.addEventListener('change', handleAttribute)

const symbolColor = document.getElementById('symbol-color')
symbolColor.addEventListener('change', handleAttribute)

const fontStyle = document.getElementById('font-style')
fontStyle.addEventListener('change', handleAttribute)


//Create Image for canvas
const canvasImage = new Image();
// canvasImage.src = 'edited.png'
canvasImage.width = 512*1
canvasImage.height = 512*1

class Cell {
    constructor(x, y, symbol, color) {
        this.x = x
        this.y = y
        this.symbol = symbol
        this.color = color

    }
    draw(ctx, color = 'default', shadow = 'None') {
        
        ctx.font = parseInt(slider.value) * 1 + 'px ' + fontStyle.value

        if (shadow !== 'default') {
            ctx.fillStyle = shadow
            ctx.fillText(this.symbol, this.x + 1, this.y + 1)
        }
        if (color !== 'default') {
            ctx.fillStyle = color
            ctx.fillText(this.symbol, this.x, this.y)
        } else {
            ctx.fillStyle = this.color
            ctx.fillText(this.symbol, this.x, this.y)
        }
    }
    
}

class AsciiEffect {
    #imageCellArray = []
    #pixels = []
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height) {
        this.#ctx = ctx
        this.#width = width
        this.#height = height
        this.#ctx.drawImage(canvasImage, 0, 0, this.#width, this.#height)
        this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height)

    }

    #convertToSymbol(color) {
        if (color > 240) return '@';
        else if (color > 220) return '#'
        else if (color > 200) return '$'
        else if (color > 180) return '%'
        else if (color > 160) return '&'
        else if (color > 140) return '*'
        else if (color > 120) return '+'
        else if (color > 100) return '='
        else if (color > 80) return '^'
        else if (color > 60) return 'q'
        else if (color > 40) return ':'
        else if (color > 20) return '!'
        // else if (color < 20) return 'O'
        else return '';
    }

    #scanImage(cellSize) {
        this.#imageCellArray = []
        for (let y = 0; y < this.#pixels.height; y += cellSize) {
            for (let x = 0; x < this.#pixels.width; x += cellSize) {
                const posX = x * 4
                const posY = y * 4
                const pos = (posY * this.#pixels.width) + posX;

                if (this.#pixels.data[pos + 3] > 128) {
                    const red = this.#pixels.data[pos]
                    const green = this.#pixels.data[pos + 1]
                    const blue = this.#pixels.data[pos + 2]

                    const averageColorValue = (red + green + blue) / 3
                    const color = "rgb(" + red + ',' + green + ',' + blue + ')'
                    const symbol = this.#convertToSymbol(averageColorValue)
                    if (averageColorValue > 100) this.#imageCellArray.push(new Cell(x, y, symbol, color))

                }
            }
        }
        // console.log(this.#imageCellArray);
    }

    #drawAscii() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height)
        effect.changeBackground()
        for (let i = 0; i < this.#imageCellArray.length; i++) {
            this.#imageCellArray[i].draw(this.#ctx, symbolColor.value, symbolShadow.value)
            // console.log(symbolColor.value)
        }
        
    }

    draw(cellSize) {
        this.#scanImage(cellSize)
        this.#drawAscii()
        
    }

    changeBackground(){
        if (background.value === 'white') {
            canvas.classList.add('white')
            ctx.fillStyle = background.value
            ctx.fillRect(0, 0, canvas.width, canvas.height)

        } else if (background.value !== 'default') {
            canvas.style.backgroundColor = background.value
            ctx.fillStyle = background.value
            ctx.fillRect(0, 0, canvas.width, canvas.height)

        } else {
            canvas.classList.remove('white')
            canvas.style.backgroundColor = 'black'
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }
}

let effect;
canvasImage.onload = function initialize() {
    canvas.width = canvasImage.width
    canvas.height = canvasImage.height
    // canvas.backgroundColor = 'white'
    effect = new AsciiEffect(ctx, canvasImage.width, canvasImage.height)
    
    hideDragAndDropMenu()
    handleSlider()
    
}

function handleSlider() {
    if (slider.value == 1) {
        label.innerHTML = 'Original Image'
        sliderInput.value = slider.value
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(canvasImage, 0, 0, canvas.width, canvas.height)
    } else {
        label.innerHTML = 'resolution'
        sliderInput.value = parseInt(slider.value)
        // ctx.font = parseInt(slider.value) * 1 + 'px ' + fontStyle.value
        if (imageFile) { effect.draw(slider.value * 1) }
        
    }
}

function convert2Base64() {
    if (imageFile.files.length > 0) {
        var file = imageFile.files[0];
        var reader = new FileReader();
        reader.onloadend = () => { canvasImage.src = reader.result }
        reader.readAsDataURL(file);
        hideDragAndDropMenu()
    }
}

function hideDragAndDropMenu() {
    for (let x = 0; x < drop.length; x++) {
        drop[x].style.opacity = '0';
    }
    for (let x = 0; x < drop.length; x++) {
        drag[x].style.display = 'flex';
    }

}

function downloadCanvasArt() {
    // e.preventDefault()
    download.download = 'ascii-Art.png'
    download.href = canvas.toDataURL("image/png")

}

function handleAttribute() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (imageFile) { effect.draw(slider.value * 1) }
}


/**  Drag & Drop functionality  **/

function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();

}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    var dt = e.dataTransfer, files = dt.files;

    if (files.length) { handleFiles(files); 
        } else{ var html = dt.getData('text/html'), match = html &&
            /\bsrc="?([^"\s]+)"?\s*/.exec(html), url = match && match[1];

        if (url) { uploadImageFromURL(url); return; }
    }

    function uploadImageFromURL(url) {
        var img = new Image;
        var c = document.createElement("canvas");
        var ctx = c.getContext("2d");

        img.onload = function () {
            c.width = this.naturalWidth;     // update canvas size to match image
            c.height = this.naturalHeight;
            ctx.drawImage(this, 0, 0);       // draw in image
            c.toBlob(function (blob) {        // get content as PNG blob

                // call our main function
                handleFiles([blob]);

            }, "image/png");
        };
        img.onerror = function () {
            alert("Error in uploading");
        }
        img.crossOrigin = "";              // if from different origin
        img.src = url;
    }

}

function validateImage(image) {
    // check the type
    var validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'];
    if (validTypes.indexOf(image.type) === -1) {
        alert("Invalid File Type « only png, jpg, svg, gif supported », Try Again!");
        return false;
    }
    var maxSizeInBytes = 10e6; // check the size <= 10MB
    if (image.size > maxSizeInBytes) {
        alert("File too large, only upload image less than 10 MB!");
        return false;
    }
    return true;
}

function previewAnduploadImage(image) {
    var reader = new FileReader();
    reader.onloadend = () => { canvasImage.src = reader.result }
    reader.readAsDataURL(image);
    hideDragAndDropMenu()

}

function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
        if (validateImage(files[i]))
            previewAnduploadImage(files[i]);
    }
}


const settingsMap = [
    {'propertyName':symbolColor, 'propertyValue':['default', 'white', 'black', 'red', 'yellow', 'green', 'cyan', 'purple', 'pink', 'orange',]},
    {'propertyName':symbolShadow, 'propertyValue' :['default', 'white','red', 'black']},
    { 'propertyName': background, 'propertyValue': ['default', 'white', 'black', 'ghostwhite', 'aliceblue', 'lavender', 'DarkCyan', 'DarkBlue', 'DarkGreen' ]},
    {'propertyName':fontStyle, 'propertyValue' :['monospace', 'Helvetica', 'veranda', 'cursive']},
]

settingsMap.map((item) => {
    if (item['propertyValue'].length){

        item['propertyValue'].forEach(element => {
            let option = document.createElement('option')
            option.value = element 
            option.textContent = element
            
            item['propertyName'].appendChild(option)
        });
    }
});