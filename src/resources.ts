import * as ex from 'excalibur';

let Resources = {
    Nothing: new ex.Texture(require('./images/nothing.png')),
    Crate: new ex.Texture(require('./images/crate2.png')),
    Analyzer: new ex.Texture(require('./images/lyzer.png')),
    Computer: new ex.Texture(require('./images/puter.png')),
    Cable: new ex.Texture(require('./images/cable.png')),
    Vampire: new ex.Texture(require('./images/vampire.png')),
    Drop: new ex.Texture(require('./images/drop.png')),
    Tile: new ex.Texture(require('./images/stonetile.png')),
    YellowWall: new ex.Texture(require('./images/yellow_wall.png')),
    Pillar: new ex.Texture(require('./images/pillar.png')),
    Box: new ex.Texture(require('./images/box.png')),
    Font: new ex.Texture(require('./fonts/my-font-light.png')),
    Msg: new ex.Texture(require('./images/msg.png')),
    Inventory: new ex.Texture(require('./images/inventory.png')),
    InventoryCursor: new ex.Texture(require('./images/target.png')),
    Shelf: new ex.Texture(require('./images/shelf.png')),
    Calendar: new ex.Texture(require('./images/calendar.png')),
    Bed: new ex.Texture(require('./images/bed.png')),
}

export { Resources }
