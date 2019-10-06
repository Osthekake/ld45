import { ItemUsable } from '../../actors/item-usable';
import { Resources } from '../../resources';
import { Computer } from './computer';
import { Player } from '../../actors/player';
import { InventoryItem } from '../../actors/inventory/inventory-item';

export class AnalyzeATron extends ItemUsable {
    constructor(x, y, private computer: Computer) {
        super('Analyze-a-tron', x, y, Resources.Analyzer);
    }

    insert(player: Player, item: InventoryItem) {
        super.insert(player, item);
        this.computer.setReadyState(item, this);
    }
    removeItem() {
        super.removeItem();
        this.computer.setReadyState(null, this);
    }
}