class SaperClass {
  constructor(Board) {
    this.fieldsArray = Board.fieldsArray;
    this.Board = Board;
    this.init();
    this.fieldsToWin;
  }
  init() {
    const { Board } = this;
    this.fieldsToWin = Board.width * Board.height - Board.minesCount;
    this.startTimer();
    console.log(this);
  }
  checkIsBomb(pos) {
    return this.fieldsArray[pos.h][pos.w] == 1;
  }
  getAdjacentFields(pos) {
    let posibleFields = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (pos.h + i >= 0 && pos.h + i < this.fieldsArray.length) {
          //hgth
          if (pos.w + j >= 0 && pos.w + j < this.fieldsArray[0].length) {
            //wdth
            const el = document.getElementById(`${pos.h + i}-${pos.w + j}`);
            let isShowed =
              el.classList.contains("showed") || (j == 0 && i == 0);
            if (!isShowed) {
              posibleFields.push({
                w: pos.w + j,
                h: pos.h + i
              });
            }
          }
        }
      }
    }
    return posibleFields;
  }
  getFieldNumber(pos) {
    let posibleFields = this.getAdjacentFields(pos);
    let bombs = 0;
    posibleFields.forEach(field => {
      if (this.fieldsArray[field.h][field.w] == 1) {
        bombs++;
      }
    });
    return bombs;
  }

  checkWin() {
    this.fieldsToWin--;
    if (this.fieldsToWin == 0) {
      clearInterval(this.timeCounting);
      return true;
    }
    return false;
  }
  win() {
    let msg = document.getElementById("msg");
    msg.style.color = "green";
    msg.textContent = "Bomb has been defused!";
    let username = prompt("Wygrałeś! Podaj swój nick.");
    const { height, width, minesCount } = this.Board;

    let cookies = document.cookie;

    cookies = cookies.split("; ");
    let data = cookies.filter(
      cookie => cookie.split("=")[0] === `${height}|${width}|${minesCount}`
    );
    // let data = parseCookies(height,width,minesCount)
    if (data.length > 0) {
      console.log(data);
      data = data[0].split("=")[1];
      data = data.trim().split("@");
      data.pop();
      console.log(data);
      let d = data.map(user => ({
        username: user.split("#")[0].split(":")[1],
        time: user.split("#")[1].split(":")[1]
      }));
      console.log(d);
      let isUnique = true;
      d.forEach(user => {
        if (user.username === username && user.time > this.timer) {
          user.time = this.timer;
          isUnique = false;
        }
      });
      if (isUnique) {
        d.push({
          username: username,
          time: this.timer
        });
      }

      let output = `${height}|${width}|${minesCount}=`;
      d.forEach(user => {
        output += `username:${user.username}#time:${user.time}@`;
      });
      document.cookie = output;
    } else {
      //when cookie of height|width|mines is not defined yet
      let output = `${height}|${width}|${minesCount}=username:${username}#time:${this.timer}@`;
      document.cookie = output;
    }

    renderLadder({ width, height });
  }
  lost() {
    let msg = document.getElementById("msg");
    msg.style.color = "red";
    msg.textContent = "Kabooom! Terrorist win!";
  }

  // timeCounting
  startTimer() {
    const timeDiv = document.querySelector("#time-div");
    this.timer = 0;
    this.timeCounting = setInterval(() => {
      this.timer++;
      timeDiv.textContent = this.timer + " [s]";
    }, 1000);
  }

  remove() {
    //stop the timer
    clearInterval(this.timeCounting);
  }
}
