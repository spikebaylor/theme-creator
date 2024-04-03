import { Component } from '@angular/core';
import {Nord} from "../../data/nord";
import {Color} from "../../models/Color";
import {ColorChartComponent} from "../../components/common/color-chart/color-chart.component";
import {ModifiableColorSwatch} from "../../components/common/modifiable-color-swatch/modifiable-color-swatch.component";

@Component({
  selector: 'app-test-nord',
  standalone: true,
  imports: [
    ColorChartComponent,
    ModifiableColorSwatch
  ],
  templateUrl: './test-nord.component.html',
  styleUrl: './test-nord.component.scss'
})
export class TestNordComponent {

  nord = new Nord()
  chartColors =this.nord.neutralLight


  luminance = (c: Color) => c.luminanceLCH()
  chroma = (c: Color) => c.chromaLCH()
  hueLCH = (c: Color) => c.hueLCH()
  hueHSL = (c: Color) => c.hueHSL(true)
  saturation = (c: Color) => c.saturationHSL(true)
  lightness = (c: Color) => c.lightnessHSL(true)

  constructor() {

    const root = this.nord.tertiary[5];
    const tones = this.generateTones(root)
    Nord.printColors(tones)
    this.chartColors = this.nord.neutralLight

   // this.chartColors = this.nord.tertiary
    Nord.printColors(this.chartColors)

    this.calculateLightness(this.chartColors)
  }

  calculateLightness(colors: Color[]) {
    const root = colors[5].lightnessHSL(true)

    console.group("% of root")
    colors.forEach((color, idx) => {
      const c = color.lightnessHSL(true)
      const per = c / root
      console.log(`[${idx}]: ${per}% ::: ${c}`)
    })
    console.groupEnd()

    console.group("delta")
    let previous = 100
    colors.forEach((color, idx) => {
      const c = color.lightnessHSL(true)
      const delta = previous - c
      console.log(`[${idx}]: ${delta} ::: ${c}`)
      previous = c
    })
    console.groupEnd()

  }

  private generateTones(color: Color): Color[] {
    const tints = Color.fromString("white").steps(color, 7)
    const shades = color.steps(Color.fromString("black"), 6)
    const colors: Color[] = [
        tints[1], //50
        tints[2], //100
        tints[3], //200
        tints[4], //300
        tints[5], //400
        color,
        shades[1], //600
        shades[2], //700
        shades[3], //800
        shades[4], //900
    ]
    return colors;

  }

}
