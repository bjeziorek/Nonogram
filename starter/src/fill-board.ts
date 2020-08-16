export class FillBoard {
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
        this.fill();
    }
    getGameArray(): boolean[][] {
        return this.gameArray;
    }
    fill(): void {
        let result = false;
        let resultSum = 0;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const r = Math.floor(Math.random() * 10);
                result = r > 5;
                this.gameArray[i][j] = result;
                if (result) {
                    resultSum++;
                }
                document.getElementById('field' + i + j).style.backgroundColor = result ? 'white' : 'white'; //pierwsze white zaniemic np na green i sa cheatynpi
                document.getElementById('field' + i + j).dataset.f = result ? 'p' : 'f';
            }
        }
        document.getElementById('field00').dataset.sum = resultSum.toString();
        document.getElementById('field00').dataset.progress = '0';
        // this.setTips();
    }// fillboard
}


