class Saper {
    constructor() {
        this.fieldsArray = []
        this.minesArray = []
        this.width
        this.height
        this.minesCount
        this.init()
        this.startTimer()
    }
    init() {
        //get numbers from inputs
        let height = document.getElementById('height').value
        this.height = parseInt(height)
        let width = document.getElementById('width').value
        this.width = parseInt(width)
        let mines = document.getElementById('mines').value
        this.minesCount = parseInt(mines)

        //making array from data above
        let boardArray = this.buildBoard()
        let minesArray = this.buildMinesArray()
        minesArray.forEach(mine => {
            boardArray[mine.w][mine.h] = 1
        })

        this.minesArray = minesArray;
        this.fieldsArray = boardArray
        console.log(this);
    }
    render() {
        const {
            width,
            height
        } = this
        const board = document.getElementById('board')
        board.style.gridTemplateColumns = `repeat(${width}, 20px)`
        board.style.gridTemplateRows = `repeat(${height}, 20px)`
        board.style.display = 'grid'
        for (let i = 0; i < width; i++) {
            for (let ii = 0; ii < height; ii++) {
                const cell = document.createElement('div')
                cell.classList.add('cell')
                cell.id = `${i}-${ii}`
                cell.style['background-image'] = ' url(./img/klepa.PNG)';
                board.appendChild(cell)
            }
        }

        const fieldsDOMList = document.querySelectorAll('.cell')
        fieldsDOMList.forEach(cell => {
            cell.addEventListener("click", (e) => {
                let pos = this.getPosition(e.target)
                let check = this.minesArray.findIndex(mine => {
                    return mine.w === pos.w && mine.h === pos.h
                })
                if (check === -1) {
                    console.log('nie bomba');
                    this.handleField(e.target)
                } else {
                    console.log('bomba');
                    this.showAllBombs()
                }
            })
        })
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
    buildBoard() {
        const {
            width,
            height
        } = this
        let boardArray = []
        for (let i = 0; i < width; i++) {
            let smallArray = []
            for (let j = 0; j < height; j++) {
                smallArray.push(0)
            }
            boardArray.push(smallArray)
        }
        return boardArray
    }
    buildMinesArray() {
        let minesArray = []
        for (let i = 0; i < this.minesCount; i++) {
            let position

            const checkisUnique = () => {
                return (minesArray.findIndex(mine => (
                    mine.w === position.w && mine.h === position.h
                )) !== -1)
            }
            do {

                let w = Math.floor(Math.random() * this.width)
                let h = Math.floor(Math.random() * this.height)
                position = {
                    w,
                    h
                }
            } while (checkisUnique(position))
            minesArray.push(position)
        }
        console.log(minesArray);
        return minesArray
    }
    showAllBombs() {
        const {
            minesArray
        } = this
        const cells = document.querySelectorAll('.cell')
        cells.forEach(cell => {
            let pos = this.getPosition(cell)
            let check = this.minesArray.findIndex(mine => {
                return mine.w === pos.w && mine.h === pos.h
            })
            if (check !== -1) {
                cell.style.backgroundImage = 'url(./img/bomb.png)'
            }
        })
    }
    getPosition(el) {
        const id = el.id
        return {
            w: parseInt(id[2]),
            h: parseInt(id[0])
        }
    }
    handleField(el) {
        const pos = this.getPosition(el)
        el.style.backgroundImage = 'url()'
        //make list of adjacent fields
        let posibleFields = []
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (pos.w + i >= 0 && pos.w + i <= this.width - 1 + i) {
                    if (pos.h + j >= 0 && pos.h + j <= this.height - 1 + j) {
                        posibleFields.push({
                            w: pos.w + i,
                            h: pos.h + j
                        })
                    }
                }
            }
        }
        let bombsAround = 0;
        posibleFields.forEach((field) => {
            this.minesArray.forEach(mine => {
                if (mine.w === field.w && mine.h === field.h) {
                    bombsAround++
                }
            })

        })
        el.textContent = bombsAround
    }
    remove() {
        //stop the timer
        clearInterval(this.timeCounting)
        //empty board
        const board = document.getElementById('board')
        while (board.firstChild) {
            board.removeChild(board.firstChild)
        }
    }
}