import * as ex from 'excalibur';
import { InventoryItem } from '../inventory/inventory-item';
import { Pickup } from './pickup';
import { Resources } from '../../resources';
import { InventoryMailOrderBox } from '../inventory/inventory-list';

export class MailOrderBox extends Pickup {

    constructor(x: number, y: number) {
        super('Box', x, y, Resources.Box);
    }
    
    asInventoryItem(): InventoryItem {
        return InventoryMailOrderBox;  
    }
}
