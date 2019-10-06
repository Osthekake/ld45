import * as ex from 'excalibur';
import { Texture, UIActor } from 'excalibur';
import { AnalyzeATron } from '../../scenes/apartment/analyze-a-tron';

export class InventoryItem extends UIActor {
    constructor(public name: string, public description:string, texture: Texture, readonly analysis?: (tron: AnalyzeATron) => string[]) {
        super();
        this.addDrawing(texture);
        this.width = 25;
        this.height = 25;
    }
}
