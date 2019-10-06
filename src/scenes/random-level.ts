import * as ex from 'excalibur';
import { Box } from '../actors/box';
import { Resources } from '../resources';
import { Tile } from '../actors/tile';
import { Pickup } from '../actors/pickups/pickup';

export class RandomLevel extends ex.Scene {
  public onInitialize(engine: ex.Engine) {}
  public onActivate() {
    // Resources.Crate.height = 45;
    // Resources.Pillar.height = 55;
    for (let index = 0; index < 25; index++) {
        const x = Math.floor(10 * Math.random() -5) * 25;
        const y = Math.floor(10 * Math.random() -5) * 25;
        const box = new Box(x, y, Resources.Crate);
        this.add(box);  
    }
    for (let index = 0; index < 25; index++) {
        const x = Math.floor(10 * Math.random() -5) * 25;
        const y = Math.floor(10 * Math.random() -5) * 25;
        const box = new Tile(x, y, Resources.Tile);
        this.add(box);  
    }
    for (let index = 0; index < 5; index++) {
        const x = Math.floor(10 * Math.random() -5) * 25;
        const y = Math.floor(10 * Math.random() -5) * 25;
        const box = new Box(x, y, Resources.Pillar);
        this.add(box);  
    }
    const item = new Pickup('Box', 25, 0, Resources.Box);
    this.add(item);
  }
  public onDeactivate() {}
}
