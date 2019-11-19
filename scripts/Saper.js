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
    remove() {
        clearInterval(this.timeCounting)
    }
}