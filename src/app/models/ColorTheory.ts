import {Color} from "./Color";
import ColorJS, {Range} from "colorjs.io/types/index";
import {Theme} from "./Theme";
import {ColorScheme} from "./ColorScheme";

export class LCH {
    compliment(root: Color): Color {
        return root.modifyHueLCH(h => (h + 180) % 360)
    }

    analogous(root: Color, phi: number): Color[] {
        const c1 = root.modifyHueLCH(h => h - phi)
        const c2 = root.modifyHueLCH(h => h + phi)
        return [c1, c2]
    }

    splitCompliment(root: Color, phi: number): Color[] {
        const compliment = this.compliment(root)
        const c1 = compliment.modifyHueLCH(h => h - phi)
        const c2 = compliment.modifyHueLCH(h => h + phi)
        return [c1, c2]
    }

    triadic(root: Color): Color[] {
        return this.analogous(root, 120);
    }

    tetradic(root: Color): Color[] {
        const comp = this.compliment(root);
        const tetra = this.analogous(root, 90)
        tetra.splice(1, 0, comp)
        return tetra
    }

    neutralDark(root: Color): Color {
        return Color.lch(.32, .02, root.hueLCH())
    }

    neutralLight(root: Color): Color {
        return Color.lch(.97, .005, root.hueLCH())
    }

    textColorShouldBeLight(bg: Color): boolean {
        // this is not the same as LCH Luminance i think
        const perceivedLuminance = (0.299 * bg.red() + 0.587 * bg.green() + 0.114 * bg.blue());
        return perceivedLuminance < .5;
    }

    public rangeOverLuminance(color: Color, steps: number = 20): Color[] {
        return this.rangeOverFunc(color, (c, v) => c.modifyLuminanceLCH(_ => v), 1, 0, steps)
    }

    public rangeOverHue(color: Color, steps: number = 20): Color[] {
        return this.rangeOverFunc(color, (c, v) => c.modifyHueLCH(_ => v), 360, 0, steps)
    }

    public rangeOverChroma(color: Color, steps: number = 20): Color[] {
        return this.rangeOverFunc(color, (c, v) => c.modifyChromaLCH(_ => v), .5, 0, steps)
    }

    private rangeOverFunc(color: Color, func: (c: Color, v: number) => Color, max: number , min: number = 0, steps: number = 20): Color[]  {
        const stepSize = (max - min) / steps
        const colors = []
        for (let i = 0; i < steps; i++) {
            const value = i * stepSize
            const c = func(color, value)
            colors.push(c)
        }
        return colors;
    }

}

export class HSL {
    public rangeOverLightness(color: Color, steps: number = 20): Color[] {
        return this.rangeOverFunc(color, (c, v) => c.modifyLightnessHSL(_ => v), 100, 0, steps)
    }

    public rangeOverHue(color: Color, steps: number = 20): Color[] {
        return this.rangeOverFunc(color, (c, v) => c.modifyHueHSL(_ => v), 360, 0, steps)
    }

    public rangeOverSaturation(color: Color, steps: number = 20): Color[] {
        return this.rangeOverFunc(color, (c, v) => c.modifySaturationHSL(_ => v), 100, 0, steps)
    }

    private rangeOverFunc(color: Color, func: (c: Color, v: number) => Color, max: number , min: number = 0, steps: number = 20): Color[]  {
        const stepSize = (max - min) / steps
        const colors = []
        for (let i = 0; i < steps; i++) {
            const value = i * stepSize
            const c = func(color, value)
            colors.push(c)
        }
        return colors;
    }
}

export class ColorTheory {
  static LCH = new LCH()
  static HSL = new HSL()

   static testTonalPalette(color: Color): Color[] {
        const c500 = color;
        const l500 = color.lightnessHSL()
        const colors = []
        colors.push(c500.modifyLightnessHSL(v => v * 1.84))
        colors.push(c500.modifyLightnessHSL(v => v * 1.62))
        colors.push(c500.modifyLightnessHSL(v => v * 1.5))
        colors.push(c500.modifyLightnessHSL(v => v * 1.35))
        colors.push(c500.modifyLightnessHSL(v => v * 1.2))
        colors.push(c500)
        colors.push(c500.modifyLightnessHSL(v => v * 0.9))
        colors.push(c500.modifyLightnessHSL(v => v * 0.7))
        colors.push(c500.modifyLightnessHSL(v => v * 0.5))
        colors.push(c500.modifyLightnessHSL(v => v * 0.4))


        colors.forEach(c => {
            console.log(c.toHSLString())
        })
        return colors;
    }

    static generateTheme(primary: Color): Theme {
        return new Theme(
            primary,
            ColorTheory.LCH.analogous(primary, 40)[0],
            ColorTheory.LCH.splitCompliment(primary, 25)[0],
            ColorTheory.LCH.neutralLight(primary),
            ColorTheory.LCH.neutralDark(primary),
            primary.modifyHueLCH(_ => 29.23),
            primary.modifyHueLCH(_ => 142.50),
            primary.modifyHueLCH(_ => 109.77)
        );
    }

    static generateSceme(primary: Color): ColorScheme {
        return new ColorScheme(
            primary,
            ColorTheory.LCH.analogous(primary, 40)[0],
            ColorTheory.LCH.splitCompliment(primary, 25)[0],
            ColorTheory.LCH.neutralLight(primary),
            ColorTheory.LCH.neutralDark(primary),
            primary.modifyHueLCH(_ => 29.23),
            primary.modifyHueLCH(_ => 142.50),
            primary.modifyHueLCH(_ => 109.77)
        );
    }
}



