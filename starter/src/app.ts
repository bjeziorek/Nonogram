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
        upperTipsDiv.classList.add('board');
        upperTipsDiv.classList.add('upperTip');
        rightTipsDiv.classList.add('board');
        rightTipsDiv.classList.add('rightTip');
        boardDiv.classList.add('board');
        boardDiv.classList.add('mainBoard');
        up.classList.add('flex');
        down.classList.add('flex');

        const boardRow1 = document.createElement('div');
        const field0 = document.createElement('div');
        const field1 = document.createElement('div');
        const field2 = document.createElement('div');
        const field3 = document.createElement('div');
        const field4 = document.createElement('div');
        const field5 = document.createElement('div');
        const field6 = document.createElement('div');
        const field7 = document.createElement('div');
        const field8 = document.createElement('div');
        const field9 = document.createElement('div');
        field0.classList.add('field');
        field1.classList.add('field');
        field2.classList.add('field');
        field3.classList.add('field');
        field4.classList.add('field');
        field5.classList.add('field');
        field6.classList.add('field');
        field7.classList.add('field');
        field8.classList.add('field');
        field9.classList.add('field');

        boardRow1.classList.add('flex');
        boardRow1.classList.add('boardRow');

        boardRow1.appendChild(field0);
        boardRow1.appendChild(field1);
        boardRow1.appendChild(field2);
        boardRow1.appendChild(field3);
        boardRow1.appendChild(field4);
        boardRow1.appendChild(field5);
        boardRow1.appendChild(field6);
        boardRow1.appendChild(field7);
        boardRow1.appendChild(field8);
        boardRow1.appendChild(field9);
        const boardRow2 = boardRow1.cloneNode(true);
        const boardRow3 = boardRow1.cloneNode(true);
        const boardRow4 = boardRow1.cloneNode(true);
        const boardRow5 = boardRow1.cloneNode(true);
        const boardRow6 = boardRow1.cloneNode(true);
        const boardRow7 = boardRow1.cloneNode(true);
        const boardRow8 = boardRow1.cloneNode(true);
        const boardRow9 = boardRow1.cloneNode(true);
        const boardRow10 = boardRow1.cloneNode(true);

        boardDiv.appendChild(boardRow1);
        boardDiv.appendChild(boardRow2);
        boardDiv.appendChild(boardRow3);
        boardDiv.appendChild(boardRow4);
        boardDiv.appendChild(boardRow5);
        boardDiv.appendChild(boardRow6);
        boardDiv.appendChild(boardRow7);
        boardDiv.appendChild(boardRow8);
        boardDiv.appendChild(boardRow9);
        boardDiv.appendChild(boardRow10);

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
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
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
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ];
        /*    
             tipIndex = 0;
             FlagTF = false;
             for (let row = 0; row < 10; row++) {
                 tipIndex = 0;
                 for (let i = 9; i >= 0; i--) {
                     console.log('mam warość:', this.gameArray[i][row], "w this.gameArray[", i, '][', row, "]");
                     if (this.gameArray[i][row]) {
                         console.log('jest prawdziwa, flaga true');
                         FlagTF = true;
                         // jesli jest true (niewaznle czy t byl pierwszy element czy nie
                         // ) wiec nie wiemy na ktorym indeksie pracujemy
                         if (upperTips[row][tipIndex] === '') {
                             console.log('inicjalizuje indeks, bo byl niezainicjalizowany');
                             // jesli obecnego indeksu nie uzyto, to zainicjalizuj zerem
                             upperTips[row][tipIndex] = (0).toString();
                         }
                         // dodajemy do obecnego indeksu +1
                         let x = (Number(upperTips[row][tipIndex]) + 1).toString();
                         upperTips[row][tipIndex] = x;
                         console.log('w rightTips[', row, '][', tipIndex, '] wpisuje zinkrementowana wartosc:', x);
     
                     } else {// jesliz bylo false, i niewazne czy pierwsze false czy kolejne
                         // to trzeba sprawdzic czy nalezy przelaczyc indeks, bo jak mamy kilka false pod rzad
                         // to poprzeskakujemy sobie indeksy
                         // sprawdzic to mozeny if poprzedni element byl true
                         // a co jesli sprobujemy dostac sie do i==-1?
                         if (FlagTF) {
                             tipIndex++;
                         }
                         console.log('wartosc nie jest prawdziwa');
                         FlagTF = false;
     
                     }
                 }// for wew
             }// for zew
             console.log(upperTips);
     
     
     */


        /////////////////////////////////

        //fill tips right
        for (let i = 0; i < 10; i++) {

            for (let j = 0; j < 5; j++) {
                document.getElementById('r' + i + Number(j + 1)).innerText = rightTips[i][j];
            }
        }
        //fill tips upper
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 5; j++) {

                document.getElementById('u' + i + Number(j + 1)).innerText = upperTips[i][j];
            }
        }

    }// setTips

}
