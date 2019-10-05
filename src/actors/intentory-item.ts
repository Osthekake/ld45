import * as ex from 'excalibur';
import { Texture, UIActor } from 'excalibur';

export class InventoryItem extends UIActor {
    constructor(public name: string, public description:string, texture: Texture) {
        super();
        this.addDrawing(texture);
        this.width = 25;
        this.height = 25;
    }

}
