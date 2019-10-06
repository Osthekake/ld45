import * as ex from 'excalibur';
import { UIActor, Vector, Label } from 'excalibur';
import { Player } from '../player';
import { InventoryCursor } from './inventory-cursor';
import { Resources } from '../../resources';
import { InventoryItem } from './inventory-item';
import { FONT } from '../..';
import { ItemUsable } from '../item-usable';
import { InventoryNothing } from './inventory-list';

export const INVENTORY_COLS = 4
export const INVENTORY_COL_WIDTH = 50;
export const INVENTORY_ROW_HEIGHT = 30;
export const INVENTORY_TOP_LEFT = new Vector(10, 10);

export class InventoryScreen extends UIActor {
    cursor: InventoryCursor;
    isOpen: boolean = false;
    items: InventoryItem[] = [];
    private description: Label[] = [];
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

    setDescription(description: string) {
        this.description.forEach(oldLine => {
            oldLine.kill();
            super.remove(oldLine);
        })
        const lines = description.split('\n');
        this.description = lines.map((line, index) => {
            return new Label({
                pos: new Vector(100, 100 + index * 8),
                color: ex.Color.Black,
                spriteFont: FONT,
                fontUnit: ex.FontUnit.Px,
                fontSize: 7,
                text: line,
                textAlign: ex.TextAlign.Center,
            });
        });
        this.description.forEach(label => {
            super.add(label);
        });
    }

    constructor(private player: Player) {
        super();
        this.addDrawing(Resources.Inventory);
        this.pos.y = 25;
        
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
        this.add(InventoryNothing);
    }

    onInitialize() {
        super.add(this.cursor);      
        super.add(this.header);
    }

    add(item: InventoryItem) {
        const nr = this.items.length;
        this.adjustPosition(item, nr);
        super.add(item);
        this.items.push(item);
        this.cursor.index = nr;
    }

    private adjustPosition(item: InventoryItem, index: number) {
        item.pos.x = (index % INVENTORY_COLS) * INVENTORY_COL_WIDTH;
        item.pos.y = Math.floor(index / INVENTORY_COLS) * INVENTORY_ROW_HEIGHT;
        item.pos = item.pos.add(INVENTORY_TOP_LEFT);
    }

    remove(item: InventoryItem) {
        super.remove(item);
        this.items = this.items.filter(i => i !== item);
        this.items.slice(this.cursor.index).forEach((item, i) => this.adjustPosition(item, this.cursor.index + i - 1));
        this.cursor.index = this.items.length - 1;
    }

    show(player: Player, mode: 'view' | 'select') {
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
            this.setDescription(item.description);
        } else {
            this.setDescription('No items in inventory');
        }
    }

    handleInput(engine: ex.Engine) {
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
            const item = this.cursor.getItem();
            if (this.target) {
                this.remove(item);
                this.target.insert(this.player, item);
                this.target = null;
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

