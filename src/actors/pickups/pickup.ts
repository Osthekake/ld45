import * as ex from 'excalibur';
import { Texture, Label } from 'excalibur';
import { Player } from '../player';
import { InventoryItem } from '../inventory/inventory-item';
import { HelpText } from '../help-text';

export class Pickup extends HelpText {
    label: Label;
    constructor(readonly name: string, x: number, y: number, readonly texture: Texture) {
        super(`<space> to pick up ${name}`, x, y, null);
        this.texture = texture;
        this.addDrawing(texture);
        this.width = 25;
        this.height = 25;
    }
    
    asInventoryItem(): InventoryItem {
        return new InventoryItem(this.name, this.name, this.texture)        
    }

    interact(player: Player) { 
        player.pickup(this);
    }
}

