import * as ex from 'excalibur';
import { Box } from '../actors/box';
import { Resources } from '../resources';
import { Tile } from '../actors/tile';
import { Pickup as Pickup } from '../actors/pickup';
import { ItemUsable } from '../actors/item-usable';
import { Conversable } from '../actors/conversable';

export type tileFactory = (x: number, y: number) => ex.Actor;
export type tileLegend = { [key: string]: tileFactory};

export const TILE_WIDTH = 25;
export const TILE_HEIGHT = 25;

export class TiledLevel extends ex.Scene {
  public onInitialize(engine: ex.Engine) {}
  public onActivate() {
    this.load(this.myTiles, this.legend);
    this.add(new Pickup('Box', 75, 75, Resources.Box));
    this.add(new ItemUsable('Analyze-a-tron', 50, 125, Resources.Analyzer));
    this.add(new Conversable('Computer', '<space> use Computer', 100, 125, Resources.Computer));
  }
  public onDeactivate() {}

  load(tiles: string[][], legend: tileLegend) {
    for (let y = 0; y < tiles.length; y++) {
        const row = tiles[y];
        for (let x = 0; x < row.length; x++) {
            const key = row[x];
            const factory = legend[key];
            if (!factory) {
                console.log(`Missing legend entry for key '${key}', at coords ${x}, ${y} in tilemap.`)
            } else {
                const tile = factory(x * TILE_WIDTH, y * TILE_HEIGHT);
                this.add(tile);
            }
            
        }
    }
  }

  myTiles = tiles`
    ###XDX
    XXXX_XXXX
    X_______X
    X___XXX_X
    X_______XXXXXXX
    X__C__________X
    X_______XXXXX_XXX
    X_______X_______X
    X___P___X_______X
    XXXXXXXXX_______X
    ########XXXXXXXXX
  `;

  legend: tileLegend = {
      X: (x, y) => {
        return new Box(x, y, Resources.Crate);
      },
      '_': (x, y) => {
        return new Tile(x, y, Resources.Tile);
      },
      D: (x, y) => {
        // todo: this should be a door
        return new Box(x, y, Resources.Pillar);
      },
      C: (x, y) => {
        return new Tile(x, y, Resources.Cable);
      },
      P: (x, y) => {
        return new Box(x, y, Resources.Pillar);
      },
      '#': () => {
        return null;
      }
  }
}
 
function tiles(raw:TemplateStringsArray) {
    return raw[0].split('\n')
        .map((line) => line.trim())
        .map((line) => Array.from(line))
        .filter((arrays) => arrays.length > 0);
}