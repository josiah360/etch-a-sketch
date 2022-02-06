const toolBar = document.querySelector('.tool-bar')
const colorWell = document.querySelector('input[type=color]');
const colorModeButtons = document.querySelectorAll('.tool-bar > button')
const board = document.querySelector('.board');
const resolutionPicker = document.querySelector('input[type=range]');
const resolutionDisplay = document.querySelectorAll('.res');
const message = document.querySelector('.message');
const closeButton = document.querySelector('.close');

let colorMode = 'color';
let count;


function createBoard(parent, pixelCount = 12) {
    let boardSize = 590;
    parent.style.width = boardSize + 'px';
    parent.style.height = boardSize + 'px';
    let pixelSize = boardSize / pixelCount;

    for(let i = 1; i <= pixelCount * pixelCount; i += 1) {
        const pixel = document.createElement('div');
        pixel.className = 'pixel';
        parent.appendChild(pixel);
        pixel.style.width = pixelSize + 'px';
        pixel.style.height = pixelSize + 'px';
    }
}

function clearBoard(element) {
    element.innerHTML = '';
}

function getRandom() {
    return Math.floor(Math.random() * 256);
}

function randomColor(random) {
    const red = random()
    const green = random()
    const blue = random()
    return `rgb(${red}, ${green}, ${blue})`;
}

createBoard(board);

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
    createBoard(board, count);
})

colorModeButtons.forEach(button => {
    button.addEventListener('click', () => {
        for(let i = 0; i < colorModeButtons.length; i += 1) {
            colorModeButtons[i].style.backgroundColor = '#555555';
        }

        colorMode = button.id
        button.style.backgroundColor = '#4A96DC';
    })
})

colorModeButtons[3].addEventListener('dblclick', ()=> {
    let pixels = board.children;
    for(let i = 0; i < pixels.length; i += 1) {
        pixels[i].style.backgroundColor = '#ffffff';
    }
})

colorModeButtons[3].addEventListener('click', () => {
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
        else if(colorMode === 'grayscale') {
            let pxl = getComputedStyle(pixel).getPropertyValue('background-color');
            pixel.style.backgroundColor = shading(pxl);
            
        }
        else if(colorMode === 'eraser') {
            pixel.style.backgroundColor = 'rgb(255, 255, 255)';
        }
    }
})



