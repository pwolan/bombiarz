const renderLadder = ({ width, height, minesCount }) => {
  if (document.getElementById("table")) {
    document.getElementById("table").innerHTML = "";
  }

  // let data = getCookies();
  let data = parseCookies(height, width, minesCount);

  console.log(data);

  const laderBoard = document.getElementById("laderBoard");
  laderBoard.innerHTML = "";
  const th = document.createElement("th");
  th.textContent = `Nick - time - ${height}/${width}/${minesCount}`;
  th.colSpan = 3;
  const tr = document.createElement("tr");
  tr.appendChild(th);
  laderBoard.appendChild(tr);

  const trr = document.createElement("tr");
  const headers = ["l.p", "username", "time"];
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    trr.appendChild(th);
  });
  laderBoard.appendChild(trr);


  data.forEach((user, index) => {
    const td1 = document.createElement("td");
    td1.textContent = index + 1;
    const td2 = document.createElement("td");
    td2.textContent = user.username;
    const td3 = document.createElement("td");
    let mins = parseInt(user.time / 60);
    if (mins < 10) {
      mins = "0" + mins;
    }
    let sec = user.time % 60;
    if (sec < 10) {
      sec = "0" + sec;
    }
    td3.textContent = `${mins}:${sec}`;
    const tr = document.createElement("tr");
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    laderBoard.append(tr);
  });
  document.body.appendChild(laderBoard);
};

const render = () => {
  const form = document.createElement("form");
  form.id = "form";
  const fields = ["Height", "Width", "Mines"];
  fields.forEach(field => {
    const div = document.createElement("div");
    div.classList.add("form-row");
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.id = field.toLowerCase();
    input.classList.add("start-values");
    label.textContent = field;
    label.appendChild(input);
    div.appendChild(label);
    form.appendChild(div);
  });

  const timeDiv = document.createElement("div");
  timeDiv.textContent = "0 [s]";
  timeDiv.id = "time-div";
  form.appendChild(timeDiv);

  const generate = document.createElement("button");
  generate.textContent = "generuj";
  generate.id = "generate";
  form.appendChild(generate);
  document.body.appendChild(form);

  const minesLeft = document.createElement("div");
  minesLeft.id = "mines-left";
  document.body.appendChild(minesLeft);

  const board = document.createElement("div");
  board.id = "board";
  document.body.appendChild(board);

  const laderBoard = document.createElement("table");
  laderBoard.id = "laderBoard";
  document.body.appendChild(laderBoard);
};
