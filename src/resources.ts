import * as ex from 'excalibur';

let Resources = {
    Crate: new ex.Texture(require('./images/crate2.png')),
    Vampire: new ex.Texture(require('./images/vampire.png')),
    Drop: new ex.Texture(require('./images/drop.png')),
    Tile: new ex.Texture(require('./images/stonetile.png')),
    Pillar: new ex.Texture(require('./images/pillar.png')),
    Box: new ex.Texture(require('./images/box.png')),
    Font: new ex.Texture(require('./fonts/my-font-light.png')),
    Inventory: new ex.Texture(require('./images/inventory.png')),
    InventoryCursor: new ex.Texture(require('./images/target.png')),
}

export { Resources }
