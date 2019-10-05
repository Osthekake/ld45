import * as ex from 'excalibur';
import { Player } from './actors/player';
import { Resources } from './resources';
import { Color } from 'excalibur';
import { TiledLevel } from './scenes/tiled-level';

class Game extends ex.Engine {
  constructor() {
    super({ 
      width: 200, 
      height: 200, 
      backgroundColor: Color.Black
      // displayMode: ex.DisplayMode.FullScreen,
    });
    this.canvas.style.width = '800px';
    this.canvas.style.height = '800px';
    this.canvas.style['image-rendering'] = '-moz-crisp-edges';
    this.canvas.style['image-rendering'] = '-webkit-crisp-edges';
    this.canvas.style['image-rendering'] = 'pixelated';
    this.canvas.style['image-rendering'] = 'crisp-edges';
    this.ctx.imageSmoothingEnabled = false;
  }

  public start(loader: ex.Loader) {
    return super.start(loader);
  }
}

const game = new Game();
const levelOne = new TiledLevel(game);
const player = new Player();

levelOne.add(player);
game.add('levelOne', levelOne);

let loader = new ex.Loader();
for (let key in Resources) {
  loader.addResource(Resources[key]);
}

export let FONT: ex.SpriteFont;

game.start(loader).then(() => {
  FONT = new ex.SpriteFont(
    Resources.Font,
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_\' "\\/<>()@',
    false,
    8,
    10,
    4,
    7
  );
  game.goToScene('levelOne');
  game.currentScene.camera.strategy.elasticToActor(player, 0.7, 0.2);
});
