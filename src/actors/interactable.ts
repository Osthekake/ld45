import { Player } from './player';

export interface Interactable {
    interact(player: Player);
}
