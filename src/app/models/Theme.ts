import {Color} from "./Color";
import {ColorTheory} from "./ColorTheory";

export class Theme {
    primary: Color;
    secondary: Color;
    tertiary: Color;
    neutralLight: Color;
    neutralDark: Color;

    red: Color
    green: Color;
    blue: Color;
    yellow: Color;
    purple: Color;

    constructor(primary: Color) {
        this.primary = primary;
        this.secondary = ColorTheory.LCH.analogous(this.primary, 40)[0]
        this.tertiary = ColorTheory.LCH.splitCompliment(this.primary, 25)[0]
        this.neutralLight = ColorTheory.LCH.neutralLight(this.primary)
        this.neutralDark = ColorTheory.LCH.neutralDark(this.primary)
        this.red = primary.modifyLCH((l, c, h) => [l, c, 29.23])
        this.green = primary.modifyLCH((l, c, h) => [l, c, 142.50])
        this.blue = primary.modifyLCH((l, c, h) => [l, c, 264.05])
        this.yellow = primary.modifyLCH((l, c, h) => [l, c, 109.77])
        this.purple = primary.modifyLCH((l, c, h) => [l, c, 328.36])
    }

    allColors(): Color[] {
        return [
            this.primary,
            this.secondary,
            this.tertiary,
            this.neutralLight,
            this.neutralDark,

            this.red,
            this.green,
            this.blue,
            this.yellow,
            this.purple
        ]
    }

}
