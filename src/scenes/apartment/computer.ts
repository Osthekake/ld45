import * as ex from 'excalibur';
import { Conversable } from '../../actors/conversable';
import { Resources } from '../../resources';
import { Player } from '../../actors/player';
import { ComputerScreen } from './computer-screen';
import { InventoryItem } from '../../actors/inventory/inventory-item';
import { Label, Vector } from 'excalibur';
import { FONT } from '../..';
import { AnalyzeATron } from './analyze-a-tron';

export type computerOption = {
    pointerLocation: Vector,
    action: () => void
}

export type computerState = {
    item?: InventoryItem,
    options: computerOption[],
    screenText: Label[],
}

export class Computer extends Conversable {
    
    screen: ComputerScreen;
    constructor(x: number, y: number) {
        super('Computer', '<space> to use computer', x, y, Resources.Computer);
        this.screen = new ComputerScreen(this);
    }

    onInitialize() {
        super.onInitialize();
        this.setReadyState(null, null);
    }

    interact(player: Player) { 
        this.screen.show(player);
    }
    private screenText(text: string, x: number, y: number): Label {
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

    setReadyState(item: InventoryItem, analyzer: AnalyzeATron) {
        this.screen.clear();
        if (!item) {
            this.screen.load({
                item,
                options: [this.exitOption],
                screenText: [
                    this.screenText('Ready to analyze', 100, 25),
                    this.screenText('Analyze-a-tron is empty', 100, 50),
                    this.exitText
                ]
            });
        } else {
            this.screen.load({
                item,
                options: [
                    {
                        pointerLocation: new Vector(95, 51),
                        action: () => this.setAnalyzedState(item, analyzer)
                    },
                    this.exitOption
                ],
                screenText: [
                    this.screenText('Ready to analyze', 100, 25),
                    this.screenText('Analyze ' + item.name, 100, 50),
                    this.exitText
                ]
            });
        }
    }

    setAnalyzedState(item: InventoryItem, analyzer: AnalyzeATron) {
        this.screen.clear();
        if (item.analysis) {
            const lines = item.analysis(analyzer).map((line, i) => {
                return this.screenText(line, 100, 60 + i*10);
            });
            this.screen.load({
                item,
                options: [this.exitOption],
                screenText: [
                    this.screenText('Analysis results', 100, 25),
                    this.exitText,
                    ...lines,
                ]
            });
        } else {
            this.screen.load({
                item,
                options: [this.exitOption],
                screenText: [
                    this.screenText('Analysis failed', 100, 25),
                    this.screenText('Unable to analyze ' + item.name, 100, 50),
                    this.exitText
                ]
            });
        }
    }
    exitOption = {
        pointerLocation: new Vector(170, 125),
        action: () => this.screen.hide()
    };
    exitText = this.screenText('Exit', 175, 125);
}
