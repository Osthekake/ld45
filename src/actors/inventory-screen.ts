import * as ex from 'excalibur';
import { UIActor, Vector, Label } from 'excalibur';
import { Player } from './player';
import { InventoryCursor } from './inventory-cursor';
import { Resources } from '../resources';
import { InventoryItem } from './intentory-item';
import { FONT } from '..';
import { ItemUsable } from './item-usable';

export const INVENTORY_COLS = 4
export const INVENTORY_COL_WIDTH = 50;
export const INVENTORY_ROW_HEIGHT = 30;
export const INVENTORY_TOP_LEFT = new Vector(10, 10);

export class InventoryScreen extends UIActor {
    cursor: InventoryCursor;
    isOpen: boolean = false;
    items: InventoryItem[] = [];
    description: Label;
    header: Label;
    _mode = 'view';
    target: ItemUsable;
    set mode(mode: 'view' | 'select') {
        this._mode = mode;
        switch(mode) {
            case 'select': {
                this.header.text = '<space> to place in ' + this.target.name;
                break;
            }
            case 'view': {
                this.header.text = '<space> to close inventory';
            }
        }
    }
    constructor() {
        super();
        this.addDrawing(Resources.Inventory);
        this.pos.y = 25;
        
        this.description = new Label({
            pos: new Vector(100, 100),
            color: ex.Color.Black,
            spriteFont: FONT,
            fontUnit: ex.FontUnit.Px,
            fontSize: 10,
            text: 'description',
            textAlign: ex.TextAlign.Center,
        });

        this.header =  new Label({
            pos: new Vector(100, 9),
            color: ex.Color.Black,
            bold: true,
            spriteFont: FONT,
            fontUnit: ex.FontUnit.Px,
            fontSize: 10,
            text: 'inventory',
            textAlign: ex.TextAlign.Center,
        });

        this.cursor = new InventoryCursor(this);
    }

    onInitialize() {
        super.add(this.cursor);      
        super.add(this.description);
        super.add(this.header);
    }

    add(item: InventoryItem) {
        const nr = this.items.length;
        item.pos.x = (nr % INVENTORY_COLS) * INVENTORY_COL_WIDTH;
        item.pos.y = Math.floor(nr / INVENTORY_COLS) * INVENTORY_ROW_HEIGHT;
        item.pos = item.pos.add(INVENTORY_TOP_LEFT);
        super.add(item);
        this.items.push(item);
        this.cursor.index = nr;
    }

    show(player: Player, mode) {
        if (mode) { this.mode = mode}
        player.scene.add(this);
        this.isOpen = true;
    }

    hide() {
        this.scene.remove(this);
        this.isOpen = false;
    } 

    goUp() {
        if (this.cursor.index >= INVENTORY_COLS) {
            this.cursor.index -= INVENTORY_COLS;
        }
    }

    goDown() {
        if (this.items.length > this.cursor.index + INVENTORY_COLS) {
            this.cursor.index += INVENTORY_COLS;
        }
    }

    goLeft() {
        if ((this.cursor.index % INVENTORY_COLS) > 0) {
            this.cursor.index -= 1;
        }
    }
    
    goRight() {
        if ((this.cursor.index % INVENTORY_COLS) < INVENTORY_COLS - 1 && this.cursor.index < this.items.length - 1) { 
            this.cursor.index += 1;
        }
    }

    updateDescription(item: InventoryItem) {
        if (item) {
            this.description.text = item.description;
        } else {
            this.description.text = 'No items in inventory';
        }
    }

    handleInput(engine: ex.Engine) {
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
            const item = this.cursor.getItem();
            if (this.target) {
                this.target.insert(item);
            }
            this.hide();
        }
    
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.A) || engine.input.keyboard.wasPressed(ex.Input.Keys.Left)) {
            this.goLeft();
        }
        else if (engine.input.keyboard.wasPressed(ex.Input.Keys.D) || engine.input.keyboard.wasPressed(ex.Input.Keys.Right)) {
            this.goRight();
        }
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.W) || engine.input.keyboard.wasPressed(ex.Input.Keys.Up)) {
          this.goUp();
        }
        else if (engine.input.keyboard.wasPressed(ex.Input.Keys.S) || engine.input.keyboard.wasPressed(ex.Input.Keys.Down)) {
          this.goDown();
        }
    }
}

