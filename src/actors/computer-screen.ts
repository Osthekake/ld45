import * as ex from 'excalibur';
import { Vector, UIActor, Label, Actor } from 'excalibur';
import { Resources } from '../resources';
import { Player } from './player';
import { FONT } from '..';
import { Computer } from './computer';

export class ComputerScreen extends UIActor {
    isOpen: boolean = false;
    message: Label[] = [];
    cursor: Actor;
    constructor(private computer: Computer) {
        super();
        this.addDrawing(Resources.Msg);
        this.pos.y = 25;
    }

    setMessage(message: string) {
        this.message.forEach(oldLine => {
            super.remove(oldLine);
        })
        const lines = message.split('\n');
        this.message = lines.map((line, index) => {
            return new Label({
                pos: new Vector(100, 50 + index * 8),
                color: ex.Color.Black,
                spriteFont: FONT,
                fontUnit: ex.FontUnit.Px,
                fontSize: 7,
                text: line,
                textAlign: ex.TextAlign.Center,
            });
        });
        this.message.forEach(label => {
            super.add(label);
        });
    }

    onClose: () => void

    show(player: Player) {
        player.control = false;
        this.onClose = () => player.control = true;
        //this.setMessage(msg);
        player.scene.add(this);
        this.isOpen = true;
    }

    hide() {
        this.scene.remove(this);
        this.isOpen = false;
        if (this.onClose) {
            this.onClose();
        }
    } 

    handleInput(engine: ex.Engine) {
        if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
            this.hide();
        }
    }
}

