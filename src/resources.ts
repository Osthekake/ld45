import * as ex from 'excalibur';

let Resources = {
    Nothing: new ex.Texture(require('./images/nothing.png')),
    Crate: new ex.Texture(require('./images/crate2.png')),
    Analyzer: new ex.Texture(require('./images/lyzer.png')),
    Computer: new ex.Texture(require('./images/puter.png')),
    Screen: new ex.Texture(require('./images/screen.png')),
    Pointer: new ex.Texture(require('./images/pointer.png')),
    Cable: new ex.Texture(require('./images/cable.png')),
    Scientist: new ex.Texture(require('./images/pixelpersonscientist.png')),
    Drop: new ex.Texture(require('./images/drop.png')),
    Tile: new ex.Texture(require('./images/stonetile.png')),
    YellowWallCorner: new ex.Texture(require('./images/yellow_wall_corner.png')),
    YellowWallVertical: new ex.Texture(require('./images/yellow_wall_vertical.png')),
    YellowWallHorizontal: new ex.Texture(require('./images/yellow_wall_horizontal.png')),
    Pillar: new ex.Texture(require('./images/pillar.png')),
    Box: new ex.Texture(require('./images/box.png')),
    FontBitmap: new ex.Texture(require('./fonts/my-font-light.png')),
    Msg: new ex.Texture(require('./images/msg.png')),
    Inventory: new ex.Texture(require('./images/inventory.png')),
    InventoryCursor: new ex.Texture(require('./images/target.png')),
    Shelf: new ex.Texture(require('./images/shelf.png')),
    Calendar: new ex.Texture(require('./images/calendar.png')),
    Bed: new ex.Texture(require('./images/bed.png')),
}

export { Resources }
