import { FillBoard } from './fill-board';
export class SetTips {

    rightTips = [
        ['', '', '', '', '', ''], // jest po 6, bo mam gdzies buga i nie zaczyna od 0 tylko od 1, ale potem wszystko przesuwam i dziala
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
    ];

    incIndex = false;
    tipIndex = 0;
    flagTF = false;
    gameArray: boolean[][] = [];
    constructor(array: boolean[][]) {
        this.gameArray = array;
        this.setTips();
    }
    setTips(): void {
        for (let column = 0; column < 10; column++) {
            this.tipIndex = 0;
            for (let i = 9; i >= 0; i--) {
                if (this.gameArray[column][i]) {
                    this.flagTF = true;
                    // jesli jest true (niewaznle czy t byl pierwszy element czy nie
                    // ) wiec nie wiemy na ktorym indeksie pracujemy
                    if (this.incIndex) {
                        this.tipIndex++;
                        this.incIndex = false;
                    }
                    if (this.rightTips[column][this.tipIndex] === '') {
                        // jesli obecnego indeksu nie uzyto, to zainicjalizuj zerem
                        this.rightTips[column][this.tipIndex] = (0).toString();
                    }
                    // dodajemy do obecnego indeksu +1
                    let x = (Number(this.rightTips[column][this.tipIndex]) + 1).toString();
                    this.rightTips[column][this.tipIndex] = x;
                } else {
                    if (this.flagTF) {
                        this.incIndex = true;
                    }
                    this.flagTF = false;
                }
            }// for wew
        }// for zew

        const upperTips = [
            ['', '', '', '', '', ''],// jest po 6, bo mam gdzies buga i nie zaczyna od 0 tylko od 1, ale potem wszystko przesuwam i dziala
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', '']
        ];

        this.incIndex = false;
        this.tipIndex = 0;
        this.flagTF = false;
        for (let row = 0; row < 10; row++) {
            this.tipIndex = 0;
            for (let i = 9; i >= 0; i--) {
                if (this.gameArray[i][row]) {
                    this.flagTF = true;
                    // jesli jest true (niewaznle czy t byl pierwszy element czy nie
                    // ) wiec nie wiemy na ktorym indeksie pracujemy
                    if (this.incIndex) {
                        this.tipIndex++;
                        this.incIndex = false;
                    }
                    if (upperTips[row][this.tipIndex] === '') {
                        // jesli obecnego indeksu nie uzyto, to zainicjalizuj zerem
                        upperTips[row][this.tipIndex] = (0).toString();
                    }
                    // dodajemy do obecnego indeksu +1
                    const x = (Number(upperTips[row][this.tipIndex]) + 1).toString();
                    upperTips[row][this.tipIndex] = x;
                } else {
                    if (this.flagTF) {
                        this.incIndex = true;
                    }
                    this.flagTF = false;
                }
            }// for wew
        }// for zew

        // poprawianie tablic jesli sa na poczatku puste miejsca
        for (let i = 0; i < 10; i++) {
            if (this.rightTips[i][0] === '') {
                this.rightTips[i].shift();
                this.rightTips[i].push('');
            }

            if (upperTips[i][0] === '') {
                upperTips[i].shift();
                upperTips[i].push('');
                // upperTips[i] = upperTips[i].slice(0, 4);
            }
        }

        // fill tips right
        for (let i = 0; i < 10; i++) {

            for (let j = 0; j < 5; j++) {
                document.getElementById('r' + i + Number(j + 1)).innerText = this.rightTips[i][j];
            }
        }
        // fill tips upper
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 5; j++) {
                document.getElementById('u' + i + Number(j + 1)).innerText = upperTips[i][j];
            }
        }
    }//init
}//class SetTips