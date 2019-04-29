import * as ex from 'excalibur';
import { Texture } from 'excalibur';

export class Box extends ex.Actor {
    boxOpacity: number;

    constructor(x: number, y: number, texture: Texture) {
        const ypos = (texture.height - 12.5) / texture.height;
        super({
            collisionType: ex.CollisionType.Fixed,
            anchor: new ex.Vector(0.5, ypos),
            x,
            y,
            // z: y
        });
        this.addDrawing(texture);
        this.setWidth(25);
        this.setHeight(25);
    }

    onInitialize() {
        this.setZIndex(this.y);
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
