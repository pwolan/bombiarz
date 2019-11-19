const checkAreInputsFull = () => {
    let inputs = document.querySelectorAll('.start-values')
    inputs = Array.from(inputs)
    const isValid = inputs.find(input => {
        return input.value === "";
    });
    if (isValid) {
        alert("niewypełnione pola!");
    }
    return !isValid
}

// remove letters from inputs
let timeOut;
const checkIsTextValid = (e) => {
    let {
        value
    } = e.target;
    if (timeOut) {
        clearTimeout(timeOut) 
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
    inputs = Array.from(inputs)
    inputs.forEach(input => {
        input.value = ''
    });
}

