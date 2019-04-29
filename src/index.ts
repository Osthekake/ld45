import * as ex from 'excalibur';
import { LevelOne } from './scenes/level-one/level-one';
import { Player } from './actors/player';
import { Resources } from './resources';
import { Box } from './actors/box';
import { LifeBar } from './actors/lifebar';
import { Tile } from './actors/tile';

class Game extends ex.Engine {
  constructor() {
    super({ 
      width: 200, 
      height: 200, 
      // displayMode: ex.DisplayMode.FullScreen,
    });
    this.canvas.style.width = '800px';
    this.canvas.style.height = '800px';
    this.ctx.imageSmoothingEnabled = false
    // console.log(this.canvasHeight);
  }

  public start(loader: ex.Loader) {
    return super.start(loader);
  }
}

const game = new Game();
const levelOne = new LevelOne(game);
const player = new Player();
const lifebar = new LifeBar();

levelOne.add(player);
Resources.Crate.height = 45;
Resources.Pillar.height = 55;
for (let index = 0; index < 25; index++) {
  const x = Math.floor(10 * Math.random() -5) * 25;
  const y = Math.floor(10 * Math.random() -5) * 25;
  const box = new Box(x, y, Resources.Crate);
  levelOne.add(box);  
}
for (let index = 0; index < 25; index++) {
  const x = Math.floor(10 * Math.random() -5) * 25;
  const y = Math.floor(10 * Math.random() -5) * 25;
  const box = new Tile(x, y, Resources.Tile);
  levelOne.add(box);  
}
for (let index = 0; index < 5; index++) {
  const x = Math.floor(10 * Math.random() -5) * 25;
  const y = Math.floor(10 * Math.random() -5) * 25;
  const box = new Box(x, y, Resources.Pillar);
  levelOne.add(box);  
}

levelOne.add(lifebar);
game.add('levelOne', levelOne);

let loader = new ex.Loader();
for (let key in Resources) {
  loader.addResource(Resources[key]);
}

game.start(loader).then(() => {
  game.goToScene('levelOne');
  game.currentScene.camera.strategy.elasticToActor(player, 0.7, 0.2);
});
