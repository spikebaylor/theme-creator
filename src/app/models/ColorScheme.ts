import {Color} from "./Color";
import {ColorTheory} from "./ColorTheory";
import _default from "chart.js/dist/core/core.interaction";

export class ColorScheme {

    public static PRIMARY = "primary"
    public static SECONDARY = "secondary"
    public static TERTIARY = "tertiary"
    public static NEUTRAL_LIGHT = "nlight"
    public static NEUTRAL_DARK = "ndark"
    public static SUCCESS = "success"
    public static WARN = "warn"
    public static DANGER = "danger"

    private tonalMap: Map<string, Map<number, Color>> = new Map()
    public static numbers = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    public static names = [
        ColorScheme.PRIMARY,
        ColorScheme.SECONDARY,
        ColorScheme.TERTIARY,
        ColorScheme.NEUTRAL_LIGHT,
        ColorScheme.NEUTRAL_DARK,
        ColorScheme.SUCCESS,
        ColorScheme.WARN,
        ColorScheme.DANGER
    ]
    private mainMap: Map<string, Color> = new Map()

    constructor(
        primary: Color,
        secondary: Color,
        tertiary : Color,
        neutralLight : Color,
        neutralDark : Color,
        danger : Color,
        success : Color,
        warn : Color) {

        this.setColor(ColorScheme.PRIMARY, primary)
        this.setColor(ColorScheme.SECONDARY, secondary)
        this.setColor(ColorScheme.TERTIARY, tertiary)
        this.setColor(ColorScheme.NEUTRAL_LIGHT, neutralLight)
        this.setColor(ColorScheme.NEUTRAL_DARK, neutralDark)
        this.setColor(ColorScheme.SUCCESS, success)
        this.setColor(ColorScheme.WARN, warn)
        this.setColor(ColorScheme.DANGER, danger)
    }

    private makeTonalPalette(root: Color): Map<number, Color> {
        const colors = ColorTheory.generateTones(root);
        const map: Map<number, Color> = new Map()
        ColorScheme.numbers.forEach((value, index) => {
            const c = colors[index]
            map.set(value, c)
        })
        return map
    }

    public getColor(name: string, tone: number): Color {
        return this.tonalMap.get(name)!.get(tone)!
    }

    private updateTonalMap(colorName: string, color: Color) {
        this.tonalMap.set(colorName, this.makeTonalPalette(color))
    }

    setColor(colorName: string, color: Color) {
        this.mainMap.set(colorName, color)
        this.updateTonalMap(colorName, color)
    }
}
