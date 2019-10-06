import * as ex from 'excalibur';
import { Texture, Label } from 'excalibur';
import { Box } from './box';
import { Player } from './player';
import { HelpText } from './help-text';

export class Conversable extends HelpText {
    box: Box;
    label: Label;
    name: string;
    constructor(name: string, prompt: string, x: number, y: number, texture: Texture) {
        super(prompt, x, y, texture);
        this.name = name;
    }

    onPreKill() {
        this.label.kill();
        this.box.kill();
    }

    interact(player: Player) { 
        console.log('Spoke to' + this.name);
    }
}
