class Saper {
    constructor(fieldsArray = []) {
        this.fieldsArray = fieldsArray
        this.init()
    }
    init() {
        //get numbers from inputs
        // this.Board = new Board()
        // this.fieldsArray = this.Board.fieldsArray
        // this.setListeners()
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
                        let isShowed = el.classList.contains('showed')
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
        console.log(posibleFields);
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

    // setListeners() {
    //     const fieldsDOMList = document.querySelectorAll('.cell')
    //     fieldsDOMList.forEach(cell => {
    //         cell.addEventListener("click", (e) => {
    //             //checking if field is bomb
    //             console.log(this.isElementBomb(e.target));
    //             if (this.isElementBomb(e.target)) {
    //                 this.handleBombClick(e.target)
    //             } else {
    //                 this.handleFieldClick(e.target)
    //             }
    //         })
    //         cell.addEventListener("contextmenu", function (e) {
    //             //flaga!
    //         })
    //     })
    // }
    // isElementBomb(el) {
    //     let pos = this.Board.getPosition(el)
    //     console.log(pos);
    //     return this.fieldsArray[pos.w][pos.h] == 1
    //         // let check = this.minesArray.findIndex(mine => {
    //         //     return mine.w === pos.w && mine.h === pos.h
    //         // })
    // }

    // handleFieldClick(el){
    //     const val = this.Board.handleFieldClick(el)
    //     if(val == 0){

    //     }

    // }

    // handleBombClick(el) {
    //     this.Board.showAllBombs()
    //     el.style.backgroundImage = 'url(./img/bomb.png)'
    //     clearInterval(this.timeCounting)
    //     this.Board.cover() // disable onclicks

    // }
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