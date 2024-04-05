import {Component, computed, inject, model, signal} from '@angular/core';
import {ColorDetailsComponent} from "@components-common/color-details/color-details.component";
import {HSLWidgetsComponent} from "@components-common/color-picker-panel/hslwidgets/hslwidgets.component";
import {LCHWidgetsComponent} from "@components-common/color-picker-panel/lchwidgets/lchwidgets.component";
import {RGBWidgetsComponent} from "@components-common/color-picker-panel/rgbwidgets/rgbwidgets.component";
import {
  ColorTheorySwatches
} from "@components-common/color-theory-panel/color-theory-swatches/color-theory-swatches.component";
import {Color} from "@models/Color";
import {ColorScheme} from "@models/ColorScheme";
import {ColorTheory} from '@models/ColorTheory';
import {StorageManager} from "@services/localstorage/StorageManager";
import {StateManager} from "@services/state-manager.service";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {PanelModule} from "primeng/panel";
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
  protected readonly ColorTheory = ColorTheory;

  state = inject(StateManager)
  options = ["Compliment", "Analogous", "Split Compliment", "Triadic", "Tetradic" ]
  rootColorOptions = computed(() => this.getRootColors(this.state.scheme()))

  color = model<Color>(Color.fromString("blue"))
  rootColor = signal(this.rootColorOptions()[0]);
  private storage = inject(StorageManager)
  optionChoice = this.storage.localStorage("colortheorypanel.optionChoice", "Triadic")
  phi = signal<number>(35)
  hslColors = computed(() => this.makeHSL(this.optionChoice(), this.rootColor(), this.phi()))
  lchColors = computed(() => this.makeLCH(this.optionChoice(), this.rootColor(), this.phi()))
  showPhiSlider = computed(() => this.shouldShowPhi(this.optionChoice()))

  private getRootColors(colorScheme: ColorScheme) {
    return ColorScheme.names.map(n => new ColorOption(n, colorScheme.getColor(n, 500)))
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
      default: { colors = [ColorTheory.HSL.compliment(color)]; break; }
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
      default: { colors = [ColorTheory.LCH.compliment(color)]; break; }
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
