class Board {
    constructor(width = 0, height = 0, minesCount = 0) {
        this.width = width
        this.height = height
        this.minesCount = minesCount
        this.minesArray
        this.fieldsArray
        this.boardDOM
        this.cellsDOM
        this.init()
    }
    init() {
        let boardArray = this.buildBoard()
        let minesArray = this.buildMinesArray()
        minesArray.forEach(mine => {
            boardArray[mine.h][mine.w] = 1
        })
        this.minesArray = minesArray;
        this.fieldsArray = boardArray
        this.render()
    }
    render() {
        const {
            width,
            height
        } = this
        this.boardDOM = document.getElementById('board')
        board.style.gridTemplateColumns = `repeat(${width}, 20px)`
        board.style.gridTemplateRows = `repeat(${height}, 20px)`
        board.style.display = 'grid'
        for (let i = 0; i < height; i++) {
            for (let ii = 0; ii < width; ii++) {
                const cell = document.createElement('div')
                cell.classList.add('cell')
                cell.id = `${i}-${ii}`
                cell.style['background-image'] = ' url(./img/klepa.PNG)';
                board.appendChild(cell)
            }
        }
        this.cellsDOM = document.querySelectorAll('.cell')
    }
    buildBoard() {
        const {
            width,
            height
        } = this
        console.log(width, height);
        let boardArray = []
        for (let i = 0; i < height; i++) {
            let smallArray = []
            for (let j = 0; j < width; j++) {
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
        return minesArray
    }
    getPosition(id) {
        return {
            w: parseInt(id[2]),
            h: parseInt(id[0])
        }
    }
    showField(guess, number) {
        const cell = document.getElementById(`${guess.h}-${guess.w}`)
        cell.style.backgroundImage = ''
        cell.classList.add('showed')
        if (number > 0) {
            cell.textContent = number
        }
    }
    showAllBombs() {
        this.minesArray.forEach(mine => {
            const id = `${mine.h}-${mine.w}`
            const el = document.getElementById(id)
            el.classList.add('showed')
            el.style.backgroundImage = 'url(./img/pbomb.png)'
        })
    }
    showClickedBomb(pos) {
        const id = `${pos.h}-${pos.w}`
        const el = document.getElementById(id)
        el.style.backgroundImage = 'url(./img/bomb.png)'
    }
    rightClick(el) {
        el.textContent = 'xD'
    }
    cover() {
        const div = document.createElement('div')
        div.classList.add('cover')
        document.getElementById('board').append(div)
    }
}