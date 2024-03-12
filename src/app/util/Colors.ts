import ColorJS from "colorjs.io";
import {Color} from "../models/Color";

export class LCH {

    static getComplimentTest(root: Color): Color {
        return root.modifyHueLCH(h => (h + 180) % 360)
    }

    static getCompliment(root: ColorJS): ColorJS {
        const lch = root.to("lch")
        return new ColorJS("lch", [lch.l, lch.c, (lch.h + 180) % 360])
    }

    static getAnalogous(root: ColorJS, phi: number): ColorJS[] {
        const lch = root.to("lch")

        const adj1 = new ColorJS("lch", [lch.l, lch.c, (lch.h - phi) % 360])
        const adj2 = new ColorJS("lch", [lch.l, lch.c, (lch.h + phi) % 360])
        return [adj1, adj2]
    }

    static getComplimentAdjacents(root: ColorJS, phi: number): ColorJS[] {
        const lch = root.to("lch")
        const complimentHue = (lch.h + 180) % 360;

        const c1 = new ColorJS("lch", [lch.l, lch.c, (complimentHue - phi) % 360])
        const c2 = new ColorJS("lch", [lch.l, lch.c, (complimentHue + phi) % 360])
        return [c1, c2]
    }

    static getTradics(root: ColorJS): ColorJS[] {
        return this.getAnalogous(root, 120);
    }

    static getTetradics(root: ColorJS): ColorJS[] {
        const comp = this.getCompliment(root);
        const tetra = this.getAnalogous(root, 90)
        tetra.splice(1, 0, comp)
        return tetra
    }

    static getNeutralDark(root: ColorJS): ColorJS {
        const lch = root.to("lch")
        return new ColorJS("lch", [20, 1, lch.h])
    }

    static getNeutralLight(root: ColorJS): ColorJS {
        const lch = root.to("lch")
        return new ColorJS("lch", [95, 1, lch.h])
    }

}

export class HSL {
    static getCompliment(root: ColorJS): ColorJS {
        const hsl = root.to("hsl")
        return new ColorJS("hsl", [(hsl.h + 180) % 360, hsl.s, hsl.l])
    }

    static getAnalogous(root: ColorJS, phi: number): ColorJS[] {
        const hsl = root.to("hsl")

        const c1 =  new ColorJS("hsl", [(hsl.h - phi) % 360, hsl.s, hsl.l])
        const c2 =  new ColorJS("hsl", [(hsl.h + phi) % 360, hsl.s, hsl.l])
        return [c1, c2]
    }

    static getComplimentAdjacents(root: ColorJS, phi: number): ColorJS[] {
        const hsl = root.to("hsl")
        const complimentHue = (hsl.h + 180) % 360;

        const c1 =  new ColorJS("hsl", [(complimentHue - phi) % 360, hsl.s, hsl.l])
        const c2 =  new ColorJS("hsl", [(complimentHue + phi) % 360, hsl.s, hsl.l])
        return [c1, c2]
    }

    static getTradics(root: ColorJS): ColorJS[] {
        return this.getAnalogous(root, 120);
    }

    static getTetradics(root: ColorJS): ColorJS[] {
        const comp = this.getCompliment(root);
        const tetra = this.getAnalogous(root, 90)
        tetra.splice(1, 0, comp)
        return tetra
    }
}
