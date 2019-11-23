render();

const inputs = document.querySelectorAll(".start-values");
inputs.forEach(input => {
  input.addEventListener("input", e => {
    checkIsTextValid(e)
  })
});


const generate = document.querySelector("button");
generate.addEventListener("click", () => {
  let canStart = checkAreInputsCorrect()
  if (canStart) {
    // if (Game) {
    //   Game.remove()
    // }

    const {
      width,
      height,
      mines
    } = getFormValues()
    Board = new BoardClass(width, height, mines) // manage board
    Saper = new SaperClass(Board) // saper game actions
    clearInputs()
    Board.cellsDOM.forEach(cell => {
      cell.addEventListener("click", (e) => {
        let guess = Board.getPosition(e.target.id)
        let isBomb = Saper.checkIsBomb(guess)
        if (isBomb) {
          Board.showAllBombs()
          Board.showClickedBomb(guess)
          Board.cover()
          Saper.remove()
          // alert('looser')
        } else {
          let number = Saper.getFieldNumber(guess)
          Board.showField(guess, number)
          Saper.checkWin()
          if (number == 0) {
            const autoshow = (pos) => {
              let adjFields = Saper.getAdjacentFields(pos)
              adjFields.forEach(field => {
                let num = Saper.getFieldNumber(field)
                let x = Board.showField(field, num)
                if (x) {
                  Saper.checkWin()
                }
                if (num == 0) {
                  return autoshow(field)
                }
              })
            }
            autoshow(guess)
          }
        }
      })
      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        if (!e.target.classList.contains('showed')) {
          Board.rightClick(e.target)
        }
      })
    })
    console.log(Board);
    console.table(Board.fieldsArray)
  }

});

const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
  e.preventDefault();
})