import {Component, computed, ElementRef, model, viewChild} from '@angular/core';
import {ColorSliderComponent} from "../color-slider/color-slider.component";
import {Color} from "../../../../models/Color";
import {ColorTheory} from "../../../../models/ColorTheory";

@Component({
  selector: 'app-lchwidgets',
  standalone: true,
    imports: [
        ColorSliderComponent
    ],
  templateUrl: './lchwidgets.component.html',
  styleUrl: './lchwidgets.component.scss'
})
export class LCHWidgetsComponent {

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
    this.color.update(c => c.modifyChromaLCH(_ => event))
  }

  onHueChange(event: number) {
    this.color.update(c =>  c.modifyHueLCH(_ => event))
  }

}
