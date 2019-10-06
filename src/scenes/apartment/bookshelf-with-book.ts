import { HelpText } from '../../actors/help-text';
import { Player } from '../../actors/player';
import { Resources } from '../../resources';
import { InventoryBook } from '../../actors/inventory/inventory-list';

export class BookShelf extends HelpText {
    constructor(x, y) {
        super('More books', x, y, Resources.Shelf);
    }

    interact(player: Player) { 
        if (this.active) {
            player.pickupItem(InventoryBook);
        }
        this.active = false;
    }
}