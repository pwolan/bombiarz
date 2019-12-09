render();
let Saper;
let Board;
const inputs = document.querySelectorAll(".start-values");
inputs.forEach(input => {
  input.addEventListener("input", e => {
    checkIsTextValid(e);
  });
});


const form = document.getElementById("form");
form.addEventListener("submit", e => {
  e.preventDefault();
  let canStart = checkAreInputsCorrect();
  if (canStart) {
    if (Saper) {
      Saper.remove();
      Board.remove();
    }

    const { width, height, mines } = getFormValues();
    Board = new BoardClass(width, height, mines); // manage board
    Saper = new SaperClass(Board); // saper game actions
    clearInputs();
    Board.render();

    Board.cellsDOM.forEach(cell => {
      cell.addEventListener("click", e => {
        let guess = Board.getPosition(e.target.id);
        let isBomb = Saper.checkIsBomb(guess);
        if (isBomb) {
          Board.showAllBombs();
          Board.showClickedBomb(guess);
          Board.cover();
          Saper.lost();
          Saper.remove();
        } else if (!e.target.classList.contains("showed")) {
          let number = Saper.getFieldNumber(guess);
          Board.showField(guess, number);
          if (Saper.checkWin()) {
            Saper.win();
            Board.showAllBombs();
          }
          if (number == 0) {
            const autoshow = pos => {
              let adjFields = Saper.getAdjacentFields(pos);
              adjFields.forEach(field => {
                let num = Saper.getFieldNumber(field);
                let isChanged = Board.showField(field, num);
                if (isChanged) {
                  if (Saper.checkWin()) {
                    Saper.win();
                    Board.showAllBombs();
                  }
                }
                if (num == 0) {
                  return autoshow(field);
                }
              });
            };
            autoshow(guess);
          }
        }
      });
      cell.addEventListener("contextmenu", e => {
        e.preventDefault();
        if (!e.target.classList.contains("showed")) {
          Board.rightClick(e.target);
        }
      });
    });
    console.log(Board);
    console.table(Board.fieldsArray);
  }
});
