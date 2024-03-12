import {Component, Input} from '@angular/core';
import {Theme} from "../../../models/Theme";
import {Color} from "../../../models/Color";
import {ColorComponent} from "../../common/color-component/color-component.component";
import {NgForOf} from "@angular/common";
import {ColorChartComponent} from "../../common/color-chart/color-chart.component";

@Component({
  selector: 'app-theme-page',
  standalone: true,
  imports: [
    ColorComponent,
    NgForOf,
    ColorChartComponent
  ],
  templateUrl: './theme-page.component.html',
  styleUrl: './theme-page.component.scss'
})
export class ThemePageComponent {

  @Input() theme = new Theme(Color.hexString("blue"))

  luminance = (color: Color) => color.luminanceLCH()
  chroma = (color: Color) => color.chromaLCH()
  hue = (color: Color) => color.hueLCH()

  hslHue = (color: Color) => color.hueHSL()
  hslSaturation = (color: Color) => color.saturationHSL()
  hslLightness = (color: Color) => color.lightnessHSL()
}
