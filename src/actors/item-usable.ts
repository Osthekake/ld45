import * as ex from 'excalibur';
import { Texture, Actor, Label, Vector } from 'excalibur';
import { Box } from './box';
import { FONT } from '..';
import { Player } from './player';
import { InventoryItem } from './intentory-item';

export class ItemUsable extends Actor {
    box: Box;
    label: Label;
    name: string;
    constructor(name: string, x: number, y: number, texture: Texture) {
        super({
            pos: new Vector(x, y)
        });
        this.name = name;
        this.body.useCircleCollider(20)
        this.body.collider.type = ex.CollisionType.Passive;
        this.box = new Box(x, y, texture);
        this.label = new Label({
            pos: new Vector(x, y - 10),
            color: ex.Color.White,
            spriteFont: FONT,
            fontSize: 7,
            visible: false,
            text: `<space> to place item in ${name}`,
            textAlign: ex.TextAlign.Center,
        });
    }

    onInitialize() {
        this.setZIndex(this.anchor.y);
        this.scene.add(this.box);
        this.scene.add(this.label);
        this.on('collisionstart', (event) => {
            if (event.other instanceof Player) {
                // enable interaction and show label
                this.label.setZIndex(Infinity);
                this.label.visible = true;
                event.other.interactable = this;
            }
        });
        this.on('collisionend', (event) => {
            if (event.other instanceof Player) {
                // disable interaction and hide label
                this.label.visible = false;
                event.other.interactable = null;
            }
        });
    }

    onPreKill() {
        this.label.kill();
        this.box.kill();
    }

    insert(item: InventoryItem) {
        console.log('inserted ' + item.name + ' into ' + this.name);
        //todo: stuff here?
    }
}
