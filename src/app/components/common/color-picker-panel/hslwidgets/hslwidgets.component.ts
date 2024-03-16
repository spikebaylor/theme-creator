import {Component, computed, ElementRef, model, viewChild} from '@angular/core';
import {Color} from "../../../../models/Color";
import {ColorTheory} from "../../../../models/ColorTheory";
import {ColorSliderComponent} from "../color-slider/color-slider.component";

@Component({
  selector: 'app-hslwidgets',
  standalone: true,
  imports: [
    ColorSliderComponent
  ],
  templateUrl: './hslwidgets.component.html',
  styleUrl: './hslwidgets.component.scss'
})
export class HSLWidgetsComponent {

  color = model.required<Color>()

  container = viewChild<ElementRef>("container")

  hue = computed(() => this.color().hueHSL())
  saturation= computed(() => this.color().saturationHSL())
  lightness= computed(() => this.color().lightnessHSL())

  hueColorStops = computed(() => ColorTheory.HSL.rangeOverHue(this.color()))
  saturationColorStops = computed(() => ColorTheory.HSL.rangeOverSaturation(this.color()))
  lightnessColorStops= computed(() => ColorTheory.HSL.rangeOverLightness(this.color()))

  onLightnessChange(event: number) {
    this.color.update(c => c.modifyLightnessHSL(_ => event))
  }

  onSaturationChange(event: number) {
    this.color.update(c => c.modifySaturationHSL(_ => event))
  }

  onHueChange(event: number) {
    this.color.update(c =>  c.modifyHueHSL(_ => event))
  }
}
