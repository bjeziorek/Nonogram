import { SetTips } from './set-tips';
import { FillBoard } from './fill-board';
import { CreateBoard } from './create-board';
export class App {
    constructor() {
        this.start();
    }
    start(): void {
        const cb = new CreateBoard(this.start);
        const fb = new FillBoard();
        const st = new SetTips( fb.getGameArray());
    }
}
