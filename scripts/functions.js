const checkAreInputsCorrect = () => {
    let inputs = document.querySelectorAll('.start-values')
    inputs = Array.from(inputs)
    let isInvalid = inputs.find(input => {
        return input.value === "";
    });
    if (isInvalid) {
        alert("niewypełnione pola!");
    }
    const {
        width,
        height,
        mines
    } = getFormValues()
    if (mines >= width * height) {
        isInvalid = true
        alert('Tyle min sie nie zmieści!')
        document.getElementById('mines').style.borderColor = 'red'
    } else {
        document.getElementById('mines').style.borderColor = 'black'
    }
    return !isInvalid
}

// remove letters from inputs
let timeOut = {
    w: null,
    h: null,
    m: null
};
const checkIsTextValid = (e) => {
    let {
        value
    } = e.target;
    switch (e.target.id) {
        case 'height':
            if (timeOut.h) {
                clearTimeout(timeOut.h)
            }
            break;
        case 'width':
            if (timeOut.w) {
                clearTimeout(timeOut.w)
            }
            break;
        case 'mines':
            if (timeOut.m) {
                clearTimeout(timeOut.m)
            }
            break;
    }
    timeOut = setTimeout(() => {
        if (isNaN(value)) {
            e.target.value = "";
        }
    }, 1000);
    return timeOut
}

const clearInputs = () => {
    let inputs = document.querySelectorAll('.start-values') 
    inputs.forEach(input => {
        input.value = ''
    });
}

const getFormValues = () => {
    let height = document.getElementById('height').value
    height = parseInt(height)
    let width = document.getElementById('width').value
    width = parseInt(width)
    let mines = document.getElementById('mines').value
    mines = parseInt(mines)
    return {
        height,
        width,
        mines
    }
}