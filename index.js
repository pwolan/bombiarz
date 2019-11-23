render();
let Game;

const inputs = document.querySelectorAll(".start-values");
inputs.forEach(input => {
  input.addEventListener("input", e => {
    checkIsTextValid(e)
  })
});


const generate = document.querySelector("button");
generate.addEventListener("click", () => {
  let canStart = checkAreInputsFull()
  if (canStart) {
    if (Game) {
      Game.remove()
    }
    let height = document.getElementById('height').value
    height = parseInt(height)
    let width = document.getElementById('width').value
    width = parseInt(width)
    let mines = document.getElementById('mines').value
    minesCount = parseInt(mines)

    Board = new Board(width, height, minesCount) // manage board
    Saper = new Saper(Board.fieldsArray) // saper game actions
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
          if (number == 0) {
            const autoshow = (pos) => {
              let adjFields = Saper.getAdjacentFields(pos)
              adjFields.forEach(field => {
                let num = Saper.getFieldNumber(field)
                Board.showField(field, num)
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
        Board.rightClick(e.target)
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