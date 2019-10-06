import { InventoryItem } from './inventory-item';
import { Resources } from '../../resources';

export const InventoryNothing =  new InventoryItem('Nothing', 'no thing; not anything; naught', Resources.Nothing)
export const InventoryJunk =  new InventoryItem('Junk', 'Some junk from the junkyard', Resources.Nothing)
export const InventoryMailOrderBox =  new InventoryItem(
    'Box', 
    description`
    A strange box you received in the mail
    Who knows what it contains?
    `, 
    Resources.Box
)

export function description(raw: TemplateStringsArray, ...args: any[]) {
    const unmargined = raw.map(part => part.split('\n').map(line => line.trim()).filter(line => line.length > 0).join('\n'));
    let builder = '';
    unmargined.forEach((part, index) => {
        builder += part;
        if (args.length > index) {
            builder += args[index];
        }
    });
    return builder;
}