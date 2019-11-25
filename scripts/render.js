const renderLadder = () => {
  let data = [{
      name: 'piter',
      time: 100
    },
    {
      name: 'mmm',
      time: 10
    }
  ] //data z cookies

  const laderBoard = document.createElement('table')
  const th = document.createElement('th')
  th.textContent = 'Nick - time'
  const tr = document.createElement('tr')
  tr.appendChild(th)
  laderBoard.appendChild(tr)
  data.sort((a, b) => (
    a.time - b.time
  ))
  data.forEach(user => {
    const td = document.createElement('td')
    td.textContent = `${user.name} - ${user.time}`
    const tr = document.createElement('tr')
    tr.appendChild(td)
    laderBoard.append(tr)
  })
  console.log(data);
  console.log(laderBoard);
  document.body.appendChild(laderBoard)
}



const render = () => {
  const form = document.createElement('form')
  form.id = 'form'
  const fields = ["Height", "Width", "Mines"];
  fields.forEach(field => {
    const div = document.createElement("div");
    div.classList.add('form-row')
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.id = field.toLowerCase()
    input.classList.add("start-values");
    label.textContent = field;
    label.appendChild(input);
    div.appendChild(label);
    form.appendChild(div);
  });

  const timeDiv = document.createElement("div");
  timeDiv.textContent = "0 [s]";
  timeDiv.id = 'time-div'
  form.appendChild(timeDiv);

  const generate = document.createElement("button");
  generate.textContent = "generuj";
  generate.id = 'generate'
  form.appendChild(generate);
  document.body.appendChild(form)

  const minesLeft = document.createElement('div')
  minesLeft.id = 'mines-left'
  document.body.appendChild(minesLeft)

  const board = document.createElement('div')
  board.id = 'board'
  document.body.appendChild(board)

  renderLadder()

};