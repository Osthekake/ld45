import * as ex from 'excalibur';
import { Resources } from '../resources';
import { SpriteSheet } from 'excalibur';

type direction = 'north' | 'south' | 'east' | 'west';

export class Player extends ex.Actor {
  constructor() {
    super( );
    this.body.collider.type = ex.CollisionType.Active;
    this.width = 25;
    this.height = 25;
    this.pos.x = 50;
    this.pos.y = 50;
    this.color = new ex.Color(255, 255, 255);
    this.body.useCircleCollider(7)
    // this.body.useBoxCollision();
  }

  speed = 100;
  facing: direction = 'south';
  facingSprites: SpriteSheet;

  onInitialize(engine) {
    const facingSprites = new ex.SpriteSheet(Resources.Vampire, 5, 4, 25, 25);
    this.addDrawing('south.stand', facingSprites.getSprite(0));
    this.addDrawing('west.stand', facingSprites.getSprite(5));
    this.addDrawing('north.stand', facingSprites.getSprite(10));
    this.addDrawing('east.stand', facingSprites.getSprite(15));
    this.addDrawing('south.walk', facingSprites.getAnimationBetween(engine, 1, 5, 125));
    this.addDrawing('west.walk', facingSprites.getAnimationBetween(engine, 6, 10, 125));
    this.addDrawing('north.walk', facingSprites.getAnimationBetween(engine, 11, 15, 125));
    this.addDrawing('east.walk', facingSprites.getAnimationBetween(engine, 16, 20, 125));
  } 
  
  onPreUpdate(engine, delta) {
    this.handleInput(engine);
  }

  onPostUpdate(engine, delta) {
    this.setZIndex(this.pos.y);
  }
  
  onPreDraw(ctx, delta) {
    if (this.vel.magnitude() > 0) {
      this.setDrawing(this.facing + '.walk');
    } else {
      this.setDrawing(this.facing + '.stand');
    }
  }

  private handleInput(engine: any) {
    if (engine.input.keyboard.isHeld(ex.Input.Keys.A) || engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      this.vel.x = -this.speed;
      this.facing = 'west';
    }
    else if (engine.input.keyboard.isHeld(ex.Input.Keys.D) || engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      this.vel.x = this.speed;
      this.facing = 'east';
    }
    else {
      this.vel.x = 0;
    }
    if (engine.input.keyboard.isHeld(ex.Input.Keys.W) || engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
      this.vel.y = -this.speed;
      this.facing = 'north';
    }
    else if (engine.input.keyboard.isHeld(ex.Input.Keys.S) || engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
      this.vel.y = this.speed;
      this.facing = 'south';
    }
    else {
      this.vel.y = 0;
    }
  }
}
