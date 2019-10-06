import * as ex from 'excalibur';
import { Vector, UIActor } from 'excalibur';
import { Resources } from '../../resources';
import { INVENTORY_COLS, INVENTORY_COL_WIDTH, INVENTORY_ROW_HEIGHT, InventoryScreen } from './inventory-screen';
import { InventoryItem } from './inventory-item';

export class InventoryCursor extends UIActor {
    _index: number = 0;
    get index() {
        return this._index;
    }
    set index(i: number) {
        this._index = i;
        this.calculatePos();
    }
    cursorOffset = new Vector(8, 8);
    constructor(private screen: InventoryScreen) {
        super();
        this.addDrawing(Resources.InventoryCursor);
        this.calculatePos();
    }  

    calculatePos() {
        const x = (this._index % INVENTORY_COLS) * INVENTORY_COL_WIDTH;
        const y = Math.floor(this._index / INVENTORY_COLS) * INVENTORY_ROW_HEIGHT;
        this.pos = new Vector(x, y).add(this.cursorOffset);
        this.screen.updateDescription(this.getItem());
    }

    getItem(): InventoryItem {
        return this.screen.items[this._index];
    }
}