import * as ex from 'excalibur';
import { Texture, Actor, Label, Vector } from 'excalibur';
import { Box } from './box';
import { FONT } from '..';
import { Player } from './player';
import { Interactable } from './interactable';

export class HelpText extends Actor implements Interactable {
    box?: Box;
    label: Label;
    constructor(prompt: string, x: number, y: number, texture?: Texture) {
        super({
            pos: new Vector(x, y)
        });
        this.body.useCircleCollider(19)
        this.body.collider.type = ex.CollisionType.Passive;
        if (texture) {
            this.box = new Box(x, y, texture);
        }
        this.label = new Label({
            pos: new Vector(x, y - 10),
            color: ex.Color.White,
            spriteFont: FONT,
            fontSize: 7,
            visible: false,
            text: prompt,
            textAlign: ex.TextAlign.Center,
        });
    }

    onInitialize() {
        this.setZIndex(this.anchor.y);
        if (this.box) {
            this.scene.add(this.box);
        }
        this.scene.add(this.label);
        this.on('collisionstart', (event) => {
            if (event.other instanceof Player) {
                // enable interaction and show label
                this.label.setZIndex(Infinity);
                this.label.visible = true;
                event.other.standOn(this);
            }
        });
        this.on('collisionend', (event) => {
            if (event.other instanceof Player) {
                // disable interaction and hide label
                this.label.visible = false;
                event.other.standOff(this);
            }
        });
    }

    onPreKill() {
        this.label.kill();
        if (this.box) {
            this.box.kill();
        }
    }

    interact(player: Player) { 
        player.inventory.show(player, 'view');
    }

}
