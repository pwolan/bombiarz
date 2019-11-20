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
    Game = new Saper()
    clearInputs()
  }
  Game.render()

});

const form = document.getElementById('form')
form.addEventListener('submit', (e) => {
  e.preventDefault();
})