import * as ex from 'excalibur';
import { Box } from '../actors/box';
import { Resources } from '../resources';
import { Tile } from '../actors/tile';

export type tileFactory = (x: number, y: number) => ex.Actor;
export type tileLegend = { [key: string]: tileFactory};

export const TILE_WIDTH = 25;
export const TILE_HEIGHT = 25;

export class TiledLevel extends ex.Scene {
  public onInitialize(engine: ex.Engine) {}
  public onActivate() {
    this.load(this.myTiles, this.legend);
  }
  public onDeactivate() {}

  load(tiles: string[][], legend: tileLegend) {
    for (let y = 0; y < tiles.length; y++) {
        const row = tiles[y];
        for (let x = 0; x < row.length; x++) {
            const key = row[x];
            const factory = legend[key];
            if (!factory) {
                console.log(`missing legend entry for key ${key}, at coords ${x}, ${y} in tilemap.`)
            } else {
                const tile = factory(x * TILE_WIDTH, y * TILE_HEIGHT);
                this.add(tile);
            }
            
        }
    }
  }

  myTiles = tiles`
    XXXXDXXXX
    X_______X
    X___XXX_X
    X_______X
    X_______D
    X___XP__X
    X_______X
    X___P___X
    XXXXXXXXX
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
      P: (x, y) => {
        return new Box(x, y, Resources.Pillar);
      },
  }
}
 
function tiles(raw:TemplateStringsArray) {
    return raw[0].split('\n')
        .map((line) => line.trim())
        .map((line) => Array.from(line))
        .filter((arrays) => arrays.length > 0);
}