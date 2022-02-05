const toolBar = document.querySelector('.tool-bar')
const colorWell = document.querySelector('input[type=color]');
const colorButtons = document.querySelectorAll('.tool-bar > button')
const board = document.querySelector('.board');
const pixels = document.querySelectorAll('.pixel');
const resolutionPicker = document.querySelector('input[type=range]');
const resolutionDisplay = document.querySelectorAll('.res');
const message = document.querySelector('.message');
const closeButton = document.querySelector('.close');

let colorMode = 'color';
let count = 12;

function getRandom() {
    return Math.floor(Math.random() * 256);
}

function createPixel(parent, pixelCount = 12) {
    let boardDimension = 590;
    parent.style.width = boardDimension + 'px';
    parent.style.height = boardDimension + 'px';
    parent.style.maxHeight = boardDimension + 'px';
    let pixelDimension = boardDimension / pixelCount;
    

    for(let i = 1; i <= pixelCount * pixelCount; i += 1) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        parent.appendChild(pixel);
        pixel.style.width = pixelDimension + 'px';
        pixel.style.height = pixelDimension + 'px';
    }
}

function clearBoard(element) {
    element.innerHTML = '';
}


function randomColor(random) {
    const red = random()
    const green = random()
    const blue = random()
    return `rgb(${red}, ${green}, ${blue})`;
}

createPixel(board)

toolBar.addEventListener('click', event => {
    let button = event.target;
    if(button.tagName === 'BUTTON') {
        switch(button.textContent) {
            case 'Rainbow Mode':
                colorMode = 'rainbow';
                break;
            case 'Monochrome':
                colorMode = 'monochrome';
                break;
            case 'Eraser':
                colorMode = 'eraser';
                break;
            default:
                colorMode = 'color';
        }
    }
})

function shading(color) {
    color = parseInt(color.substr(4, color.indexOf(',') - 4));
    if (color === 225) {
        color = 100;
    }
    else if(color > 0) {
        color -= 10;
    }

    return `rgb(${color}, ${color}, ${color})`;
}

resolutionPicker.addEventListener('input', () => {
    resolutionDisplay.forEach(resolutionDis => {
        resolutionDis.textContent = resolutionPicker.value;
    })
    clearBoard(board);
    count = resolutionPicker.value;
    createPixel(board, count);
})

colorButtons[3].addEventListener('dblclick', ()=> {
    let pixels = board.children;
    for(let i = 0; i < pixels.length; i += 1) {
        pixels[i].style.backgroundColor = '#ffffff';
    }
})

colorButtons[3].addEventListener('click', () => {
    message.style.display = 'block';
    setTimeout(function() {
        message.style.display = 'none';
    }, 5000)
})

closeButton.addEventListener('click', () => {
    message.style.display = 'none';
})


board.addEventListener('mouseover', (event) => {
    const pixel = event.target;
    if(pixel.className !== 'board') {
        if(colorMode === 'color') {
                pixel.style.backgroundColor = colorWell.value;
            }
        else if(colorMode === 'rainbow') {
            pixel.style.backgroundColor = randomColor(getRandom);
        }
        else if(colorMode === 'monochrome') {
            let pxl = getComputedStyle(pixel).getPropertyValue('background-color');
            pixel.style.backgroundColor = shading(pxl);
            
        }
        else if(colorMode === 'eraser') {
            pixel.style.backgroundColor = 'rgb(255, 255, 255)';
        }
    }
})



