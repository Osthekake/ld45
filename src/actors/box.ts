import * as ex from 'excalibur';
import { Texture } from 'excalibur';

export class Box extends ex.Actor {
    boxOpacity: number;

    constructor(x: number, y: number, texture: Texture) {
        const ypos = (texture.height - 12.5) / texture.height;
        super({
            anchor: new ex.Vector(0.5, ypos),
            pos: new ex.Vector(x, y),
            // z: y
        });
        this.body.collider.type = ex.CollisionType.Fixed;
        this.addDrawing(texture);
        this.width = 25;
        this.height = 25;
    }

    onInitialize() {
        this.setZIndex(this.pos.y);
    }

    onPreUpdate(engine: ex.Engine, delta) {
        // const camX = engine.currentScene.camera.x;
        // const camY = engine.currentScene.camera.y;
        // const xDist = Math.abs(camX - this.x);
        // const yDist = Math.abs(camY - this.y);
        // const behind = camY < this.y;
        // if(! behind) {
        //     this
        //     this.opacity = 1;
        // } else if ( xDist < 30 && yDist < 30 ) {
        //     const dist = Math.sqrt(xDist*xDist + yDist*yDist);
        //     this.opacity = dist / 30; 
        // } else {
        //     this.opacity = 1;
        // }
        // console.log('box opacity', this.opacity);
    }

}
