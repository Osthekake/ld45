import * as ex from 'excalibur';
import { Conversable } from './conversable';
import { Resources } from '../resources';
import { Player } from './player';
import { ComputerScreen } from './computer-screen';
import { InventoryItem } from './inventory/inventory-item';
import { Label, Vector } from 'excalibur';
import { FONT } from '..';

type computerOption = {
    pointerLocation: Vector,
    action: () => void
}

type computerState = {
    item?: InventoryItem,
    options: computerOption[],
    screenText: Label[],
}

export class Computer extends Conversable {
    
    screen: ComputerScreen;
    constructor(x: number, y: number) {
        super('Computer', '<enter> to use computer', x, y, Resources.Computer);
        this.screen = new ComputerScreen(this);
    }

    interact(player: Player) { 
        this.screen.show(player);
        console.log('Spoke to' + this.name);
    }

    computerState: computerState;

    setReadyState(item: InventoryItem) {
        this.computerState = {
            item,
            options: [
                {
                    pointerLocation: new Vector(100, 100),
                    action: () => this.screen.hide()
                },
                this.exitOption
            ],
            screenText: [
                this.screenText('Ready to analyze', 100, 25),
                this.screenText('Analyze ' + item.name, 100, 50),
                this.exitText
            ]
        }
    }

    screenText(text: string, x: number, y: number): Label {
        return new Label({
            pos: new Vector(x, y),
            color: ex.Color.Black,
            spriteFont: FONT,
            fontUnit: ex.FontUnit.Px,
            fontSize: 7,
            text,
            textAlign: ex.TextAlign.Center,
        });
    }

    setAnalyzedState(item: InventoryItem) {
        if (item.analysis) {
            this.computerState = {
                item,
                options: [this.exitOption],
                screenText: [
                    this.screenText('Analysis results', 100, 25),
                    this.screenText(item.analysis(), 100, 50),
                    this.exitText
                ]
            }
        } else {
            this.computerState = {
                item,
                options: [this.exitOption],
                screenText: [
                    this.screenText('Analysis failed', 100, 25),
                    this.screenText('Unable to analyze ' + item.name, 100, 50),
                    this.exitText
                ]
            }
        }
    }
    exitOption = {
        pointerLocation: new Vector(100, 100),
        action: () => this.screen.hide()
    };
    exitText = this.screenText('Exit', 175, 150);
}
