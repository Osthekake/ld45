import * as ex from 'excalibur';
import { Texture, Vector } from 'excalibur';

export class Item extends ex.Actor {
    constructor(x: number, y: number, texture: Texture) {
        const ypos = (texture.height - 12.5) / texture.height;
        super({
            anchor: new ex.Vector(0.5, ypos),
            pos: new Vector(x, y)
        });
        this.body.collider.type = ex.CollisionType.Passive;
        this.addDrawing(texture);
        this.width = 25;
        this.height = 25;
    }

    onInitialize() {
        this.setZIndex(this.anchor.y);
    }
}
