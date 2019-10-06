import * as ex from 'excalibur';
import { Texture } from 'excalibur';

export class Box extends ex.Actor {
    boxOpacity: number;

    constructor(x: number, y: number, texture: Texture) {
        const ypos = (texture.height - 12.5) / texture.height;
        super({
            anchor: new ex.Vector(0.5, ypos),
            pos: new ex.Vector(x, y),
        });
        this.body.collider.type = ex.CollisionType.Fixed;
        this.addDrawing(texture);
        this.width = 25;
        this.height = 25;
    }

    onInitialize() {
        this.setZIndex(this.pos.y);
    }

}
