import * as ex from 'excalibur';
import { Texture } from 'excalibur';

export class Tile extends ex.Actor {
    constructor(x: number, y: number, texture: Texture) {
        super({
            collisionType: ex.CollisionType.Passive,
            anchor: new ex.Vector(0.5, 0.5),
            x,
            y,
            // z: y
        });
        this.addDrawing(texture);
        this.setWidth(25);
        this.setHeight(25);
    }

    onInitialize() {
        this.setZIndex(-Infinity);
    }

}
