class SaperClass {
    constructor(Board) {
        this.fieldsArray = Board.fieldsArray
        this.Board = Board
        this.init()
        this.fieldsToWin
    }
    init() {
        const {
            Board
        } = this
        this.fieldsToWin = Board.width * Board.height - Board.minesCount
        this.startTimer()
        console.log(this);
    }
    checkIsBomb(pos) {
        return this.fieldsArray[pos.h][pos.w] == 1
    }
    getAdjacentFields(pos) {
        let posibleFields = []
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (pos.h + i >= 0 && pos.h + i < this.fieldsArray.length) { //hgth
                    if (pos.w + j >= 0 && pos.w + j < this.fieldsArray[0].length) { //wdth
                        const el = document.getElementById(`${pos.h+i}-${pos.w+j}`)
                        let isShowed = el.classList.contains('showed') || (j == 0 && i == 0)
                        if (!isShowed) {
                            posibleFields.push({
                                w: pos.w + j,
                                h: pos.h + i
                            })
                        }
                    }
                }
            }
        }
        return posibleFields
    }
    getFieldNumber(pos) {
        let posibleFields = this.getAdjacentFields(pos)
        let bombs = 0
        posibleFields.forEach(field => {
            if (this.fieldsArray[field.h][field.w] == 1) {
                bombs++
            }
        })
        return bombs

    }

    checkWin() {
        this.fieldsToWin--
        if (this.fieldsToWin == 0) {
            clearInterval(this.timeCounting)
            return true
        }
        return false
    }
    win() {
        let msg = document.getElementById('msg')
        msg.style.color = 'green'
        msg.textContent = 'Bomb has been defused!'
        let username = prompt('Wygrałeś! Podaj swój nick.')
        const {
            height,
            width
        } = this.Board
        // document.cookie = `username=${username};time=${this.timer};mode=${height}-${width};`
        document.cookie = `${username}=${this.timer}/${height}-${width};`
    }
    lost() {
        let msg = document.getElementById('msg')
        msg.style.color = 'red'
        msg.textContent = 'Kabooom! Terrorist win!'
    }

    // timeCounting
    startTimer() {
        const timeDiv = document.querySelector('#time-div')
        this.timer = 0;
        this.timeCounting = setInterval(() => {
            this.timer++;
            timeDiv.textContent = this.timer + " [s]";
        }, 1000);
    }

    remove() {
        //stop the timer
        clearInterval(this.timeCounting)
    }
}