import * as ex from 'excalibur';
import { Texture, Vector, Label, Actor } from 'excalibur';
import { FONT } from '..';
import { Player } from './player';
import { InventoryItem } from './intentory-item';

export class Pickup extends Actor {
    label: Label;
    name: string;
    texture: Texture;
    constructor(name: string, x: number, y: number, texture: Texture) {
        const ypos = (texture.height - 12.5) / texture.height;
        super({
            anchor: new Vector(0.5, ypos),
            pos: new Vector(x, y)
        });
        this.name = name;
        this.texture = texture;
        this.body.collider.type = ex.CollisionType.Passive;
        this.body.useCircleCollider(10)
        this.addDrawing(texture);
        this.width = 25;
        this.height = 25;
        this.label = new Label({
            pos: new Vector(x, y - 10),
            color: ex.Color.White,
            spriteFont: FONT,
            fontSize: 7,
            visible: false,
            text: `<space> to pick up ${name}`,
            textAlign: ex.TextAlign.Center,
        });
        this.label.setTextShadow(1, 1, ex.Color.Black);
    }

    onInitialize() {
        this.setZIndex(this.anchor.y);
        this.scene.add(this.label);
        this.on('collisionstart', (event) => {
            if (event.other instanceof Player) {
                // enable pickup and show label
                this.label.setZIndex(Infinity);
                this.label.visible = true;
                event.other.pickupable = this;
            }
        });
        this.on('collisionend', (event) => {
            if (event.other instanceof Player) {
                // disable pickup and hide label
                this.label.visible = false;
                event.other.pickupable = null;
            }
        });
    }
    
    asInventoryItem(): InventoryItem {
        return new InventoryItem(this.name, this.name, this.texture)        
    }

    onPreKill() {
        this.label.kill();
    }
}
