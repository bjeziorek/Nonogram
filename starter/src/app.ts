export class App {
    gameArray: boolean[][] = [
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false]
    ];

    constructor() {
        this.start();
    }
    start(): void {
        this.generateBoard();
        this.fillBoard();
        this.setTips();
    }

    generateBoard(): void {
        const root = document.getElementById('root');
        const cornerDiv = document.createElement('div');
        const upperTipsDiv = document.createElement('div');
        const rightTipsDiv = document.createElement('div');
        const boardDiv = document.createElement('div');
        const up = document.createElement('div');
        const down = document.createElement('div');

        cornerDiv.classList.add('board');
        cornerDiv.classList.add('corner');
        // upperTipsDiv.classList.add('board');
        upperTipsDiv.classList.add('upperTip');
        // rightTipsDiv.classList.add('board');
        rightTipsDiv.classList.add('rightTip');
        // boardDiv.classList.add('board');
        boardDiv.classList.add('mainBoard');
        up.classList.add('flex');
        down.classList.add('flex');

        const arrayOfChildren = [];
        const arrayOfRows = [];
        for (let j = 0; j < 10; j++) {
            arrayOfRows[j] = document.createElement('div');
            arrayOfRows[j].classList.add('flex');
            arrayOfRows[j].classList.add('boardRow');
            for (let i = 0; i < 10; i++) {
                arrayOfChildren[i] = document.createElement('div');
                arrayOfChildren[i].classList.add('field');
                arrayOfChildren[i].addEventListener('click', this.fieldEvent);
                arrayOfRows[j].appendChild(arrayOfChildren[i]);
            }
            boardDiv.appendChild(arrayOfRows[j]);
        }

        const tipLineV = document.createElement('div');
        const tipLineH = document.createElement('div');
        tipLineH.classList.add('flex');

        const maxI = 10;
        const maxJ = 5;

        for (let i = 0; i < 10; i++) {
            const container = document.createElement('div');
            container.classList.add('flex');
            for (let j = 0; j < 5; j++) {
                const field = document.createElement('div');
                field.classList.add('fieldTip');
                field.innerText = (maxJ - j).toString();
                field.id = 'r' + (i).toString() + (maxJ - j).toString();

                container.appendChild(field);
            }
            tipLineV.appendChild(container);
        }
        rightTipsDiv.appendChild(tipLineV);

        for (let i = 0; i < maxI; i++) {
            const container = document.createElement('div');
            for (let j = 0; j < maxJ; j++) {
                const field = document.createElement('div');
                field.classList.add('fieldTip');
                field.innerText = (maxJ - j).toString();
                field.id = 'u' + (i).toString() + (maxJ - j).toString();
                container.appendChild(field);
            }
            tipLineH.appendChild(container);

        }
        upperTipsDiv.appendChild(tipLineH);

        // console.log(children);
        //  up.appendChild(cornerDiv);
        up.appendChild(upperTipsDiv);

        down.appendChild(rightTipsDiv);
        down.appendChild(boardDiv);

        root.appendChild(up);
        root.appendChild(down);

        const boardRows = boardDiv.getElementsByClassName('boardRow');
        for (let i = 0; i < 10; i++) {

            for (let j = 0; j < 10; j++) {
                boardRows[i].children[j].id = 'field' + i.toString() + j.toString();
            }

        }
    }

    fillBoard(): void {
        let result = false;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const r = Math.floor(Math.random() * 10);
                result = r > 5;
                this.gameArray[i][j] = result;

                document.getElementById('field' + i + j).style.backgroundColor = result ? 'black' : 'white';
            }
        }
        console.log(this.gameArray);

        this.setTips();
    }// fillboard

    setTips(): void {

        const rightTips = [
            ['', '', '', '', '', ''],//jest po 6, bo mam gdzies buga i nie zaczyna od 0 tylko od 1, ale potem wszystko przesuwam i dziala
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

        let incIndex = false;
        let tipIndex = 0;
        let flagTF = false;
        for (let column = 0; column < 10; column++) {
            tipIndex = 0;
            for (let i = 9; i >= 0; i--) {
                console.log('mam warość:', this.gameArray[column][i], "w this.gameArray[", column, '][', i, "]");
                if (this.gameArray[column][i]) {
                    console.log('jest prawdziwa, flaga true');
                    flagTF = true;
                    // jesli jest true (niewaznle czy t byl pierwszy element czy nie
                    // ) wiec nie wiemy na ktorym indeksie pracujemy
                    if (incIndex) {
                        console.log('incIndex true');
                        tipIndex++;
                        incIndex = false;
                    }
                    if (rightTips[column][tipIndex] === '') {
                        console.log('inicjalizuje indeks, bo byl niezainicjalizowany');
                        // jesli obecnego indeksu nie uzyto, to zainicjalizuj zerem
                        rightTips[column][tipIndex] = (0).toString();
                    }
                    // dodajemy do obecnego indeksu +1
                    let x = (Number(rightTips[column][tipIndex]) + 1).toString();
                    rightTips[column][tipIndex] = x;
                    console.log('w rightTips[', column, '][', tipIndex, '] wpisuje zinkrementowana wartosc:', x);

                } else {
                    if (flagTF) {
                        console.log('flagTF true');
                        incIndex = true;
                    }
                    console.log('wartosc nie jest prawdziwa');
                    flagTF = false;
                }
            }// for wew
        }// for zew
        ///////////////////////////



        const upperTips = [
            ['', '', '', '', '', ''],//jest po 6, bo mam gdzies buga i nie zaczyna od 0 tylko od 1, ale potem wszystko przesuwam i dziala
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

        /////////////////////////////

        incIndex = false;
        tipIndex = 0;
        flagTF = false;
        for (let row = 0; row < 10; row++) {
            tipIndex = 0;
            for (let i = 9; i >= 0; i--) {
                console.log('mam warość:', this.gameArray[i][row], "w this.gameArray[", i, '][', row, "]");
                if (this.gameArray[i][row]) {
                    console.log('jest prawdziwa, flaga true');
                    flagTF = true;
                    // jesli jest true (niewaznle czy t byl pierwszy element czy nie
                    // ) wiec nie wiemy na ktorym indeksie pracujemy
                    if (incIndex) {
                        console.log('incIndex true');
                        tipIndex++;
                        incIndex = false;
                    }
                    if (upperTips[row][tipIndex] === '') {
                        console.log('inicjalizuje indeks, bo byl niezainicjalizowany');
                        // jesli obecnego indeksu nie uzyto, to zainicjalizuj zerem
                        upperTips[row][tipIndex] = (0).toString();
                    }
                    // dodajemy do obecnego indeksu +1
                    let x = (Number(upperTips[row][tipIndex]) + 1).toString();
                    upperTips[row][tipIndex] = x;
                    console.log('w upperTips[', row, '][', tipIndex, '] wpisuje zinkrementowana wartosc:', x);

                } else {
                    if (flagTF) {
                        console.log('flagTF true');
                        incIndex = true;
                    }
                    console.log('wartosc nie jest prawdziwa');
                    flagTF = false;
                }
            }// for wew
        }// for zew


        /////////////////////////////////



        //poprawianie tablic jesli sa na poczatku puste miejsca
        for (let i = 0; i < 10; i++) {
            if (rightTips[i][0] === '') {
                rightTips[i].shift();
                rightTips[i].push('');
            }

            if (upperTips[i][0] === '') {
                upperTips[i].shift();
                upperTips[i].push('');
                // upperTips[i] = upperTips[i].slice(0, 4);
            }
        }

        console.log(upperTips);
        console.log(rightTips);


        //fill tips right
        for (let i = 0; i < 10; i++) {

            for (let j = 0; j < 5; j++) {
                document.getElementById('r' + i + Number(j + 1)).innerText = rightTips[i][j];
            }
        }
        //fill tips upper
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 5; j++) {
                //  if(upperTips[i][j]!=undefined){
                document.getElementById('u' + i + Number(j + 1)).innerText = upperTips[i][j];
                //  }
            }
        }




    }// setTips



    fieldEvent() {
        console.log('kliknieto pole, this:', this);
    }

}
