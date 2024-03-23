import {Component, computed, effect, input, signal} from '@angular/core';
import {Color} from "../../../models/Color";
import {ButtonModule} from "primeng/button";
import {ColorDetailsComponent} from "../color-details/color-details.component";
import {DropdownModule} from "primeng/dropdown";
import {HSLWidgetsComponent} from "../color-picker-panel/hslwidgets/hslwidgets.component";
import {InputTextModule} from "primeng/inputtext";
import {LCHWidgetsComponent} from "../color-picker-panel/lchwidgets/lchwidgets.component";
import {PaginatorModule} from "primeng/paginator";
import {PanelModule} from "primeng/panel";
import {RGBWidgetsComponent} from "../color-picker-panel/rgbwidgets/rgbwidgets.component";
import { ColorTheory } from '../../../models/ColorTheory';
import {ColorTheorySwatches} from "./color-theory-swatches/color-theory-swatches.component";
import {ColorScheme} from "../../../models/ColorScheme";
import {SliderModule} from "primeng/slider";

@Component({
  selector: 'app-color-theory-panel',
  standalone: true,
  imports: [
    ButtonModule,
    ColorDetailsComponent,
    DropdownModule,
    HSLWidgetsComponent,
    InputTextModule,
    LCHWidgetsComponent,
    PaginatorModule,
    PanelModule,
    RGBWidgetsComponent,
    ColorTheorySwatches,
    SliderModule
  ],
  templateUrl: './color-theory-panel.component.html',
  styleUrl: './color-theory-panel.component.scss'
})
export class ColorTheoryPanelComponent {

  theme = input.required<ColorScheme>()
  rootColorOptions = computed(() => this.getRootColors(this.theme()))
  rootColor = signal(new ColorOption("blue", Color.fromString("blue")));
  optionChoice = signal<string>("Triadic")
  phi = signal<number>(35)
  hslColors = computed(() => this.makeHSL(this.optionChoice(), this.rootColor(), this.phi()))
  lchColors = computed(() => this.makeLCH(this.optionChoice(), this.rootColor(), this.phi()))
  showPhiSlider = computed(() => this.shouldShowPhi(this.optionChoice()))

  private getRootColors(colorScheme: ColorScheme) {
    return ColorScheme.names.map(n => new ColorOption(n, colorScheme.getColor(n, 500)))
  }

  color = signal(this.hslColors()[0])
  options = ["Compliment", "Analogous", "Split Compliment", "Triadic", "Tetradic" ]

  protected readonly ColorTheory = ColorTheory;
  private init = false

  constructor() {
    // THis is a ridiculous hack because for some reason the required input of theme isn't set yet when
    // trying to set the rootColor signal.
    setTimeout(() => {
      this.rootColor.set(this.rootColorOptions()[0])
    }, 500)

  }

  private makeHSL(type: string, colorOption: ColorOption, phi: number): Color[] {
    const color = colorOption.color
    let colors: Color[] = []
    switch (type) {
      case "Compliment": { colors = [ColorTheory.HSL.compliment(color)]; break; }
      case "Analogous": { colors = ColorTheory.HSL.analogous(color, phi); break; }
      case "Split Compliment": { colors = ColorTheory.HSL.splitCompliment(color, phi); break; }
      case "Triadic": { colors = ColorTheory.HSL.triadic(color); break; }
      case "Tetradic": { colors = ColorTheory.HSL.tetradic(color); break; }
    }
    colors.push(color)
    return colors;
  }

  private makeLCH(type: string, colorOption: ColorOption, phi: number): Color[] {
    const color = colorOption.color;
    let colors: Color[] = []
    switch (type) {
      case "Compliment": { colors = [ColorTheory.LCH.compliment(color)]; break; }
      case "Analogous": { colors = ColorTheory.LCH.analogous(color, phi); break; }
      case "Split Compliment": { colors = ColorTheory.LCH.splitCompliment(color, phi); break; }
      case "Triadic": { colors = ColorTheory.LCH.triadic(color); break; }
      case "Tetradic": { colors = ColorTheory.LCH.tetradic(color); break; }
    }
    colors.push(color)
    return colors;
  }


  onColorSelected(c: Color) {
    this.color.set(c)
  }

  private shouldShowPhi(type: string): boolean {
      return type == "Analogous" || type == "Split Compliment"
  }
}

class ColorOption {
  constructor(
      public name: string,
      public color: Color
  ) {
  }
}
