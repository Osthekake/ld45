import { InventoryItem } from './inventory-item';
import { Resources } from '../../resources';

export const InventoryNothing =  new InventoryItem(
    'Nothing', 
    'no thing; not anything; naught', 
    Resources.Nothing, 
    () => ['Could not analyze Nothing', 'Surface area too small']
)
export const InventoryJunk =  new InventoryItem('Junk', 'Nothing of value', Resources.Nothing)
export const InventoryBook =  new InventoryItem('Book', 'A book titled "Nothing"', Resources.Book)
export const InventoryMailOrderBox =  new InventoryItem(
    'Box', 
    description`
    A strange box you received in the mail
    Who knows what it contains?
    `, 
    Resources.Box,
    (tron) => {
        tron.inserted = InventoryVacuumBox;
        return ['This is a vacuum in a box', 'It fluctuates', 'You could probably do science with this'];
    }
)
export const InventoryVacuumBox =  new InventoryItem(
    'Vacuum in a box', 
    description`
    A vacuum in a box.
    You are carrying nothing.
    -in a box!
    `, 
    Resources.Box,
    () => {
        return ['This is a vacuum in a box', 'It fluctuates', 'You could probably do science with this'];
    }
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