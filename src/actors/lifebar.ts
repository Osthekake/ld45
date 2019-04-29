import * as ex from 'excalibur';
import { Drop, bloodColor } from './drop';

export class LifeBar extends ex.UIActor {

    _state = {
        red: 5.5,
        blue: 0,
        green: 0,
        black: 1
    };

    set state(state) {
        this._state = state;
        this.configureDrops();
    }

    private readonly drops: Drop[] = [];

    private configureDrops() {
        let dropIndex = 0;
        const colors: bloodColor[] = ['black', 'red']
        colors.forEach(c => {
            const amount = this._state[c];
            if (!amount){
                return;
            }
            for (let index = 0; index < amount; index++) {
                const drop = this.drops[dropIndex];
                drop.bloodColor = c;
                if ((amount - index) >= 1){
                    drop.fill = 'full';
                } else {
                    drop.fill = 'half';
                }
                dropIndex += 1;
            }
        });
        for (let index = dropIndex; index < this.drops.length; index++) {
            this.drops[index].fill = 'none';
        }
    }

    onInitialize(engine) {
        for (let index = 0; index < 8; index++) {
            this.drops.push(new Drop(180 - index * 10, 180));
        }
        this.drops.forEach((d) => this.add(d));
        this.configureDrops();
    }
}