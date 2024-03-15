import {Color} from "./Color";
import {ColorTheory} from "./ColorTheory";

export class Theme {

    constructor(
        public primary: Color,
        public secondary: Color,
        public tertiary : Color,
        public neutralLight : Color,
        public neutralDark : Color,
        public red : Color,
        public green : Color,
        public yellow : Color) {}

    allColors(): Color[] {
        return [
            this.primary,
            this.secondary,
            this.tertiary,
            this.neutralLight,
            this.neutralDark,

            this.red,
            this.green,
            this.yellow,
        ]
    }

}
