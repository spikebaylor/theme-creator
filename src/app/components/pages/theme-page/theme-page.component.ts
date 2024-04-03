import {Component, computed, input, Input} from '@angular/core';
import {Theme} from "../../../models/Theme";
import {Color} from "../../../models/Color";
import {ModifiableColorSwatch} from "../../common/modifiable-color-swatch/modifiable-color-swatch.component";
import {NgForOf} from "@angular/common";
import {ColorChartComponent} from "../../common/color-chart/color-chart.component";
import {ColorTheory} from "../../../models/ColorTheory";

@Component({
  selector: 'app-theme-page',
  standalone: true,
  imports: [
    ModifiableColorSwatch,
    NgForOf,
    ColorChartComponent
  ],
  templateUrl: './theme-page.component.html',
  styleUrl: './theme-page.component.scss'
})
export class ThemePageComponent {

  theme = input.required<Theme>()

  ptones = computed(() => ColorTheory.generateTones(this.theme().primary))
  stones = computed(() => ColorTheory.generateTones(this.theme().secondary))

}
