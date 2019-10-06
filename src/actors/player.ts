import * as ex from 'excalibur';
import { Resources } from '../resources';
import { SpriteSheet } from 'excalibur';
import { Pickup } from './pickups/pickup';
import { InventoryScreen } from './inventory/inventory-screen';
import { ItemUsable } from './item-usable';
import { Interactable } from './interactable';
import { InfoScreen } from './info-screen';

type direction = 'north' | 'south' | 'east' | 'west';

export class Player extends ex.Actor {
  constructor() {
    super( );
    this.width = 25;
    this.height = 25;
    this.pos.x = 50;
    this.pos.y = 50;
    this.color = new ex.Color(255, 255, 255);
    this.body.useCircleCollider(7)
    this.body.collider.type = ex.CollisionType.Active;
    this.inventory = new InventoryScreen(this);
    this.info = new InfoScreen(this);
  }

  speed = 100;
  facing: direction = 'south';
  facingSprites: SpriteSheet;
  inventory: InventoryScreen;
  info: InfoScreen;
  control: boolean = true;

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
  
  onPreUpdate(engine: ex.Engine, delta) {
    if (this.inventory.isOpen) {
      this.vel.x = 0;
      this.vel.y = 0;
      this.inventory.handleInput(engine);
    } else if(this.info.isOpen) {
      this.info.handleInput(engine);
    } else if(this.control) {
      this.handleInput(engine);
    }
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
  private standingOn: Interactable[] = []; 

  standOn(actor: Interactable) {
    this.standingOn.push(actor);
  }
  standOff(actor: Interactable) {
      this.standingOn = this.standingOn.filter(on => on !== actor);
  }

  pickup(pickupable: Pickup) {
    this.inventory.add(pickupable.asInventoryItem());
    this.inventory.show(this, 'view');
    pickupable.kill();
  }

  selectItem(usable: ItemUsable) {
    this.inventory.target = usable;
    this.inventory.show(this, 'select');
  }

  showMsg(msg: string) {
    this.info.show(this, msg);
  }

  private handleInput(engine: ex.Engine) {
    if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
      if (this.standingOn.length > 0) {
        this.standingOn[0].interact(this);
      } else {
        this.inventory.show(this, 'view');
      }
    }

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
