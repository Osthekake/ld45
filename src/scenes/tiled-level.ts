import * as ex from 'excalibur';
import { Box } from '../actors/box';
import { Resources } from '../resources';
import { Tile } from '../actors/tile';
import { Pickup as Pickup } from '../actors/pickups/pickup';
import { ItemUsable } from '../actors/item-usable';
import { Conversable } from '../actors/conversable';
import { Vector } from 'excalibur';
import { Player } from '../actors/player';
import { HelpText } from '../actors/help-text';
import { MailOrderBox } from '../actors/pickups/mail-order-box';

export type tileFactory = (x: number, y: number) => ex.Actor;
export type tileLegend = { [key: string]: tileFactory};

export const TILE_WIDTH = 25;
export const TILE_HEIGHT = 25;

export abstract class TiledLevel extends ex.Scene {
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
                console.log(`Missing legend entry for key '${key}', at coords ${x}, ${y} in tilemap.`)
            } else {
                const tile = factory(x * TILE_WIDTH, y * TILE_HEIGHT);
                this.add(tile);
            }
            
        }
    }
  }

  abstract myTiles: string[][];
  abstract legend: tileLegend;
  abstract playerSpawn: ex.Vector;

  spawn(player: Player) {
    player.pos = new Vector(
      this.playerSpawn.x * TILE_WIDTH,
      this.playerSpawn.y * TILE_HEIGHT
    );
    this.add(player)
  }
}
 
export function tiles(raw: TemplateStringsArray) {
    return raw[0].split('\n')
        .map((line) => line.trim())
        .map((line) => Array.from(line))
        .filter((arrays) => arrays.length > 0);
}