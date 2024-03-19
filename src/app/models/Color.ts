import ColorJS, {Range} from "colorjs.io"
export class Color {

    private color: ColorJS
    private lchColor: ColorJS | undefined
    private rgbColor: ColorJS | undefined
    private rgbColorInGamut: ColorJS | undefined
    private hslColor: ColorJS | undefined
    private hslColorInGamut: ColorJS | undefined

    public static lch(luminance: number, chroma: number, hue: number): Color {
        return new Color(new ColorJS("oklch", [luminance, chroma as number, hue]))
    }

    public static fromString(color: string): Color {
        return new Color(new ColorJS(color))
    }

    public static rgb(red: number, green: number, blue: number): Color {
        return new Color(new ColorJS("srgb", [red, green, blue]))
    }

    public static hsl(hue: number, saturation: number, lightness: number): Color {
        return new Color(new ColorJS("hsl", [hue, saturation, lightness]))
    }

    private constructor(color: ColorJS) {
        this.color = color
    }

    public red(forceGamut: boolean = false): number {
        return this.rgb(forceGamut).r;
    }

    public green(forceGamut: boolean = false): number {
        return this.rgb(forceGamut).g
    }

    public blue(forceGamut: boolean = false): number {
        return this.rgb(forceGamut).b;
    }

    public hueLCH(): number {
        return this.lch().h
    }

    public luminanceLCH(): number {
        return this.lch().l;
    }

    public chromaLCH():number {
        return this.lch().c;
    }

    public hueHSL(forceGamut: boolean = false): number {
        return this.hsl(forceGamut).h
    }

    public saturationHSL(forceGamut: boolean = false): number {
        return this.hsl(forceGamut).s
    }

    public lightnessHSL(forceGamut: boolean = false): number {
        return this.hsl(forceGamut).l
    }

    public modifyLCH(block: (l: number, c: number, h:number) => number[]): Color {
        const lch = this.lch()
        const res = block(lch.l, lch.c, lch.h)
        return Color.lch(res[0], res[1], res[2])
    }

    public modifyRGB(block: (r: number, g: number, b:number) => number[]): Color {
        const rgb = this.rgb()
        const res = block(rgb.r, rgb.g, rgb.b)
        return Color.rgb(res[0], res[1], res[2])
    }

    public modifyHSL(block: (h: number, s: number, l:number) => number[]): Color {
        const hsl = this.hsl()
        const res = block(hsl.h, hsl.s, hsl.l)
        return Color.hsl(res[0], res[1], res[2])
    }

    public modifyLightnessHSL(block: (v: number) => number): Color {
        return this.modifyHSL((h,s,l) => [h, s, block(l)])
    }

    public modifySaturationHSL(block: (v: number) => number): Color {
        return this.modifyHSL((h,s,l) => [h, block(s), l])
    }

    public modifyHueHSL(block: (v: number) => number): Color {
        return this.modifyHSL((h,s,l) => [block(h), s, l])
    }

    public modifyHueLCH(block: (h: number) => number): Color {
        return this.modifyLCH((l,c,h) => [l, c, block(h) % 360])
    }

    public modifyLuminanceLCH(block: (h: number) => number): Color {
        return this.modifyLCH((l,c,h) => [block(l), c, h])
    }

    public modifyChromaLCH(block: (h: number) => number): Color {
        return this.modifyLCH((l,c,h) => [l, block(c), h])
    }

    private lch(): ColorJS {
        if (!this.lchColor) {
            this.lchColor = this.color.to("oklch")
        }
        return this.lchColor;
    }

    private rgb(forceGamut: boolean = false): ColorJS {
        if (!forceGamut) {
            if (!this.rgbColor) {
                this.rgbColor = this.color.to("srgb")
            }
            return this.rgbColor;
        } else {
            if (!this.rgbColorInGamut) {
                this.rgbColorInGamut = this.color.to("srgb").toGamut()
            }
            return this.rgbColorInGamut
        }
    }

    public forceRGBGamut(): Color {
        return new Color(this.rgb(true));
    }

    public inRGBGamut(): boolean {
        return this.rgb().inGamut();
    }

    private hsl(forceGamut: boolean = false): ColorJS {
        if (!forceGamut) {
            if (!this.hslColor) {
                this.hslColor = this.color.to("hsl")
            }
            return this.hslColor;
        } else {
            if (!this.hslColorInGamut) {
                this.hslColorInGamut = this.color.to("hsl").toGamut()
            }
            return this.hslColorInGamut;
        }
    }

    public forceHSLGamut(): Color {
        return new Color(this.hsl(true));
    }

    public inHSLGamut(): boolean {
        return this.hsl().inGamut();
    }

    public toString() {
        return this.color.toString()
    }


    private lchString: string | undefined
    public toLCHString(): string {
        if (!this.lchString) {
            const l = (this.luminanceLCH() * 100).toFixed(2)
            const c = this.chromaLCH().toFixed(3)
            const h = this.hueLCH().toFixed(2)
            this.lchString = `(${l}%, ${c}, ${h})`
        }
        return this.lchString
    }

    private rgbString: string | undefined
    public toRGBString(): string {
        if (!this.rgbString) {
            const red = (this.red() * 255).toFixed(0)
            const green = (this.green() * 255).toFixed(0)
            const blue = (this.blue() * 255).toFixed(0)
            this.rgbString = `rgb(${red}, ${green}, ${blue})`
        }
        return this.rgbString
    }

    private hexString: string | undefined
    public toHexString(): string {
        if (!this.hexString) {
            this.hexString = this.rgb().toString({format: "hex"}).toUpperCase()
        }
        return this.hexString;
    }

    private hslString: string | undefined
    public toHSLString(): string {
        if (!this.hslString) {
            const h = this.hueHSL().toFixed(2)
            const s = this.saturationHSL().toFixed(2)
            const l = this.lightnessHSL().toFixed(2)
            this.hslString = `hsl(${h}, ${s}%, ${l}%)`
        }
        return this.hslString;
    }

    public rangeLCH(color: Color, type: "longer" | "shorter" | "increasing" | "decreasing" | "raw" = "raw"): Range  {
        return this.lch().range(color.lch(), {space: "lch", hue: type})
    }

    public steps(color: Color, steps: number): Color[]  {
        return this.lch().steps(color.lch(), {space: "lch", steps: steps}).map(cjs => new Color(cjs))
    }
}
