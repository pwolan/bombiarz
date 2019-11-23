class SaperClass {
    constructor(Board) {
        this.fieldsArray = Board.fieldsArray
        this.Board = Board
        this.init()
        this.fieldsToWin
    }
    init() {
        //get numbers from inputs
        // this.Board = new Board()
        // this.fieldsArray = this.Board.fieldsArray
        // this.setListeners()
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
            setTimeout(() => {
                alert('win!')
            }, 0)
        }
        // debugger
        console.log(this.fieldsToWin);
        clearInterval(this.timeCounting)
    }

    // timeCounting
    startTimer() {
        const timeDiv = document.querySelector('#time-div')
        let timer = 0;
        this.timeCounting = setInterval(() => {
            timer++;
            timeDiv.textContent = timer + " [s]";
        }, 1000);
    }

    remove() {
        //stop the timer
        clearInterval(this.timeCounting)
        //empty board
        // const board = document.getElementById('board')
        // while (board.firstChild) {
        //     board.removeChild(board.firstChild)
        // }
    }
}