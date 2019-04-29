import * as ex from 'excalibur';
import { Resources } from '../resources';

export type bloodColor = 'red' | 'blue' | 'green' | 'black';
export type fill = 'full' | 'half' | 'none';

export class Drop extends ex.UIActor {

    public bloodColor: bloodColor = 'red';
    public fill: fill = 'none';

    constructor(x: number, y: number) {
        super({
            x, 
            y
        });
    }

    onInitialize(engine){
        const facingSprites = new ex.SpriteSheet(Resources.Drop, 4, 2, 10, 10);
        this.addDrawing('red.half', facingSprites.getSprite(0));
        this.addDrawing('blue.half', facingSprites.getSprite(1));
        this.addDrawing('green.half', facingSprites.getSprite(2));
        this.addDrawing('black.half', facingSprites.getSprite(3));
        this.addDrawing('red.full', facingSprites.getSprite(4));
        this.addDrawing('blue.full', facingSprites.getSprite(5));
        this.addDrawing('green.full', facingSprites.getSprite(6));
        this.addDrawing('black.full', facingSprites.getSprite(7));
    }

    onPreDraw(ctx, delta) {
        if (this.fill === 'none'){
            this.visible = false;
        } else {
            this.setDrawing(`${this.bloodColor}.${this.fill}`);
        }
    }
}