import * as ex from 'excalibur';
import { Vector, UIActor, Actor, Label } from 'excalibur';
import { Resources } from '../../resources';
import { Player } from '../../actors/player';
import { Computer, computerState, computerOption } from './computer';
import { InventoryItem } from '../../actors/inventory/inventory-item';

export class ComputerScreen extends UIActor {
    isOpen: boolean = false;
    pointer: Actor;
    pointerIndex: number;
    options: computerOption[];
    texts: Label[] = [];
    item: InventoryItem;
    constructor(private computer: Computer) {
        super();
        this.addDrawing(Resources.Screen);
        this.pos.y = 15;
        this.pointer = new UIActor();
        this.pointer.addDrawing(Resources.Pointer);
    }

    onInitialize() {
        this.add(this.pointer);
    }

    onClose: () => void

    load(state: computerState) {
        if (state.item) {
            state.item.pos = new Vector(20, 20);
            this.item = state.item;
            this.add(state.item)
        } 
        this.texts = state.screenText;
        state.screenText.forEach(text => this.add(text));
        this.options = state.options
        this.pointerIndex = 0;
        if (state.options.length > 0) {
            this.movePointer(0);
        }
    }

    clear() {
        this.texts.forEach(child => {
            child.kill();
            this.remove(child);
        });
        this.remove(this.item);
    }

    show(player: Player) {
        this.onClose = player.takeControl(this);
        //this.setMessage(msg);
        player.scene.add(this);
        this.isOpen = true;
    }

    hide() {
        if (this.onClose) {
            this.onClose();
            this.onClose = null;
        }
        this.scene.remove(this);
        this.isOpen = false;
    } 

    movePointer(index: number) {
        this.pointerIndex = index;
        const option = this.options[index];
        this.pointer.pos = option.pointerLocation;
    }

    click() {
        console.log('🎵 click');
        const atPointer = this.options[this.pointerIndex];
        atPointer.action();
    }

    goUp() {
        if (this.pointerIndex > 0) {
            this.movePointer(this.pointerIndex - 1);
        }
    }

    goDown() {
        if (this.pointerIndex < this.options.length - 1) {
            this.movePointer(this.pointerIndex + 1);
        }
    }


    handleInput(engine: ex.Engine) {
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
            this.click();
        }
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.W) || engine.input.keyboard.wasPressed(ex.Input.Keys.Up)) {
            this.goUp();
        }
        else if (engine.input.keyboard.wasPressed(ex.Input.Keys.S) || engine.input.keyboard.wasPressed(ex.Input.Keys.Down)) {
            this.goDown();
        }
    }
}

