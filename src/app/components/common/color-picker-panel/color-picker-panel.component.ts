import {Component, computed, ElementRef, model, viewChild} from '@angular/core';
import {SliderModule} from "primeng/slider";
import {Color} from "../../../models/Color";
import {FormsModule} from "@angular/forms";
import {ColorTheory} from "../../../models/ColorTheory";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {ColorSliderComponent} from "./color-slider/color-slider.component";

@Component({
  selector: 'app-color-picker-panel',
  standalone: true,
  imports: [
    SliderModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ColorSliderComponent
  ],
  templateUrl: './color-picker-panel.component.html',
  styleUrl: './color-picker-panel.component.scss'
})
export class ColorPickerPanelComponent {

  color = model(Color.hexString("blue"))

  container = viewChild<ElementRef>("container")

  luminance= computed(() => this.color().luminanceLCH())
  chroma= computed(() => this.color().chromaLCH())
  hue = computed(() => this.color().hueLCH())

  luminanceColorStops= computed(() => ColorTheory.LCH.rangeOverLuminance(this.color()))
  chromaColorStops = computed(() => ColorTheory.LCH.rangeOverChroma(this.color()))
  hueColorStops = computed(() => ColorTheory.LCH.rangeOverHue(this.color()))

  onLuminanceChange(event: number) {
    this.color.update(c => c.modifyLuminanceLCH(_ => event))
  }

  onChromaChange(event: number) {
    this.color.update(c => c.modifyChromaLCH(_ => {
      return event
    }))
  }

  onHueChange(event: number) {
    this.color.update(c =>  c.modifyHueLCH(_ => event))
  }

}
