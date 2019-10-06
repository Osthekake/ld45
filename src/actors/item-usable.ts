import * as ex from 'excalibur';
import { Texture, Label } from 'excalibur';
import { Box } from './box';
import { Player } from './player';
import { InventoryItem } from './inventory/inventory-item';
import { HelpText } from './help-text';

export class ItemUsable extends HelpText {
    box: Box;
    label: Label;
    name: string;
    inserted: InventoryItem;
    constructor(name: string, x: number, y: number, texture: Texture) {
        super(`<space> to place item in ${name}`, x, y, texture);
        this.name = name;
    }
    
    interact(player: Player) { 
        if (this.inserted) {
            player.showMsg('Retrieved ' + this.inserted.name + ' from ' + this.name);
            player.inventory.add(this.inserted);
            this.inserted = null;
        } else {
            player.selectItem(this);
            player.inventory.show(player, 'select');
        }
    }
    insert(player: Player, item: InventoryItem) {
        this.inserted = item;
        if (item) {
            player.showMsg('Inserted ' + item.name + ' into ' + this.name);   
            //todo: stuff here?
        }
    }
}
