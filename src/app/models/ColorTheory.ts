import {Color} from "./Color";
import ColorJS, {Range} from "colorjs.io/types/index";

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

export class ColorTheory {
  static LCH = new LCH()

}



