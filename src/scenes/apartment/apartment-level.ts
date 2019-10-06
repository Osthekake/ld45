import * as ex from 'excalibur';
import { TiledLevel, tiles } from '../tiled-level';
import { MailOrderBox } from '../../actors/pickups/mail-order-box';
import { ItemUsable } from '../../actors/item-usable';
import { Conversable } from '../../actors/conversable';
import { HelpText } from '../../actors/help-text';
import { Box } from '../../actors/box';
import { Resources } from '../../resources';
import { Tile } from '../../actors/tile';
import { Vector } from 'excalibur';
import { Computer } from './computer';
import { AnalyzeATron } from './analyze-a-tron';
import { BookShelf } from './bookshelf-with-book';

export type tileFactory = (x: number, y: number) => ex.Actor;
export type tileLegend = { [key: string]: tileFactory};

export const TILE_WIDTH = 25;
export const TILE_HEIGHT = 25;

export class ApartmentLevel extends TiledLevel {
  public onActivate() {
    super.onActivate();

    this.add(new MailOrderBox(100, 50));
    const computer = new Computer(100, 125);
    this.add(computer);
    this.add(new AnalyzeATron(50, 125, computer));
    this.add(new HelpText('<space> to view inventory', 225, 200, null));
    this.add(new Box(375, 200, Resources.Bed));
    this.add(new HelpText('4 days until the end of the world', 350, 150, Resources.Calendar));
    this.add(new HelpText('Books', 250, 50, Resources.Shelf));
    this.add(new BookShelf(300, 50));
  }

  myTiles = tiles`
    ###|D|
    +--+_+--------+
    |_____________|
    |_____|_______|
    +-----+_______|
    |__C__________|
    |_______+-----+-+
    |_______|_______|
    |_______________|
    +-------+_______|
    ########+-------+
  `;

  legend: tileLegend = {
      '-': (x, y) => {
        return new Box(x, y, Resources.YellowWallHorizontal);
      },
      '|': (x, y) => {
        return new Box(x, y, Resources.YellowWallVertical);
      },
      '+': (x, y) => {
        return new Box(x, y, Resources.YellowWallCorner);
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
      '#': () => {
        return null;
      }
  }

  playerSpawn = new Vector(14, 8);


}
