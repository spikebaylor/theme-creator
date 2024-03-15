import {Component, computed, input, Input} from '@angular/core';
import {Theme} from "../../../models/Theme";
import {Color} from "../../../models/Color";
import {ColorComponent} from "../../common/color-component/color-component.component";
import {NgForOf} from "@angular/common";
import {ColorChartComponent} from "../../common/color-chart/color-chart.component";
import {ColorTheory} from "../../../models/ColorTheory";

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

  theme = input.required<Theme>()

  ptones = computed(() => ColorTheory.testTonalPalette(this.theme().primary))
  stones = computed(() => ColorTheory.testTonalPalette(this.theme().secondary))

}
