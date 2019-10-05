import * as ex from 'excalibur';
import { Texture } from 'excalibur';

export class Tile extends ex.Actor {
    constructor(x: number, y: number, texture: Texture) {
        super({
            anchor: new ex.Vector(0.5, 0.5),
            pos: new ex.Vector(x, y),
            // z: y
        });
        this.body.collider.type = ex.CollisionType.Passive;
        this.addDrawing(texture);
        this.width = 25;
        this.height = 25;
    }

    onInitialize() {
        this.setZIndex(-Infinity);
    }

}
