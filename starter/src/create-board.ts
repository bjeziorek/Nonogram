export class CreateBoard {
    yesNoMarker = false;
    startFunction: () => void;
    constructor(startF: () => void) {
        this.startFunction = startF;
        this.generateBoard();
    }
    generateBoard(): void {
        const containerToRemove = document.getElementById('container');
        if (containerToRemove !== null) {
            containerToRemove.remove();
        }

        const root = document.getElementById('root');

        const container = document.createElement('div');
        const livesDiv = document.createElement('div');
        const cornerDiv = document.createElement('div');
        const upperTipsDiv = document.createElement('div');
        const rightTipsDiv = document.createElement('div');
        const boardDiv = document.createElement('div');
        const up = document.createElement('div');
        const down = document.createElement('div');
        const yesNoMarker = document.createElement('div');
        const yesMarkerBtn = document.createElement('button');
        const noMarkerBtn = document.createElement('button');
        const newGameBtn = document.createElement('button');
        const tryBtn = document.createElement('button');

        container.id = 'container';
        livesDiv.id = 'lives';
        yesNoMarker.id = 'yesNoMarkerLabel';
        yesMarkerBtn.id = 'yesBtn';
        noMarkerBtn.id = 'noBtn';
        tryBtn.id = 'try';
        livesDiv.innerText = 'Życia: 9';
        yesMarkerBtn.innerText = 'v';
        noMarkerBtn.innerText = 'x';
        newGameBtn.innerText = 'Nowa gra';
        tryBtn.innerText = '?';

        yesMarkerBtn.addEventListener('click', this.buttonMarkYes);
        noMarkerBtn.addEventListener('click', this.buttonMarkNo);
        tryBtn.addEventListener('click', this.buttonMarkTry);
        newGameBtn.addEventListener('click', () => { this.startFunction(); });

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
                arrayOfChildren[i].addEventListener('click', function clickFunction(): void {   // dlaczego dla ()=>{} this.is jest niewidoczne, a dla function(){} jest?
                    // e.target - tu div
                    if (document.getElementById('yesNoMarkerLabel').dataset.switch === 'on') {
                        if (this.dataset.f === 'p') {
                            this.style.backgroundColor = 'black';
                            const fieled00 = document.getElementById('field00');
                            let progress = Number(fieled00.dataset.progress) + 1;
                            console.log('progress', progress);
                            fieled00.dataset.progress = (progress).toString();
                            if (fieled00.dataset.progress === fieled00.dataset.sum) {
                                document.getElementById('yesNoMarkerLabel').innerHTML = 'Koniec gry! Gratulacje!';
                            }
                            this.removeEventListener('click', clickFunction);
                        } else {// czyli f
                            this.style.backgroundColor = 'red';
                            if (document.getElementById('lives').innerText === 'Życia: 0') {
                                document.getElementById('yesNoMarkerLabel').innerHTML = 'Koniec gry! :( Spróbuj jeszcze raz :)';
                                for (let ii = 0; ii < 10; ii++) {
                                    for (let jj = 0; jj < 10; jj++) {
                                        // usun event listenery
                                        // pokaz na zielono V rozwiazania i czerwono X
                                        if (document.getElementById('field' + ii + jj).dataset.f === 'p' && document.getElementById('field' + ii + jj).style.backgroundColor != 'black') {
                                            document.getElementById('field' + ii + jj).style.backgroundColor = 'blue';
                                        }
                                        document.getElementById('field' + ii + jj).removeEventListener('click', clickFunction);// to nie dziala, bo jest funkcja wew, jakby byla zew, to by dzialala
                                    }
                                }

                                console.log('koniec gry');
                            } else {
                                let currentLives = document.getElementById('lives').innerText.substr(document.getElementById('lives').innerText.length - 1, 1); // biore ostani znak czyli liczbe zyc
                                console.log('x:', currentLives);
                                currentLives = (Number(currentLives) - 1).toString();
                                document.getElementById('lives').innerText = 'Życia: ' + currentLives;
                                this.removeEventListener('click', clickFunction);
                            }
                        }
                    } else {
                        if (document.getElementById('yesNoMarkerLabel').dataset.switch === '?') {
                            if (this.innerText === '?') {
                                this.innerText = '';
                            } else {
                                this.innerText = '?';
                            }
                        } else {


                            if (this.innerText === 'X') {
                                this.innerText = '';
                            } else {
                                this.innerText = 'X';
                            }
                        }// else wew do pytajnika

                    }
                });

                /// this.fieldEvent);
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

        container.appendChild(livesDiv);

        container.appendChild(up);
        container.appendChild(down);

        container.appendChild(yesNoMarker);
        container.appendChild(yesMarkerBtn);
        container.appendChild(noMarkerBtn);
        container.appendChild(newGameBtn);
        container.appendChild(tryBtn);


        root.appendChild(container);

        const boardRows = boardDiv.getElementsByClassName('boardRow');
        for (let i = 0; i < 10; i++) {

            for (let j = 0; j < 10; j++) {
                boardRows[i].children[j].id = 'field' + i.toString() + j.toString();
            }

        }
    }// generateBoard
    buttonMarkYes(): void {
        this.yesNoMarker = true;
        const elem = document.getElementById('yesNoMarkerLabel');
        elem.innerText = 'Tryb: zaznaczenie pól właściwych';
        elem.dataset.switch = 'on';
    }

    buttonMarkNo(): void {
        this.yesNoMarker = false;
        const elem = document.getElementById('yesNoMarkerLabel');
        elem.innerText = 'Tryb: blokowanie pól podejrzewanych o puste';
        elem.dataset.switch = 'off';
    }
    buttonMarkTry(): void {
        this.yesNoMarker = false;
        const elem = document.getElementById('yesNoMarkerLabel');
        elem.innerText = 'Tryb: blokowanie pól podejrzewanych o pełne';
        elem.dataset.switch = '?';
    }


}
