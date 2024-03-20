import {Component, computed, ElementRef, model, viewChild} from '@angular/core';
import {Color} from "../../../../models/Color";
import {ColorTheory} from "../../../../models/ColorTheory";
import {ColorSliderComponent} from "../color-slider/color-slider.component";

@Component({
  selector: 'app-rgbwidgets',
  standalone: true,
  imports: [
    ColorSliderComponent
  ],
  templateUrl: './rgbwidgets.component.html',
  styleUrl: './rgbwidgets.component.scss'
})
export class RGBWidgetsComponent {
  color = model.required<Color>()

  container = viewChild<ElementRef>("container")

  red = computed(() => this.color().red())
  green= computed(() => this.color().green())
  blue= computed(() => this.color().blue())

  redColorStops = computed(() => ColorTheory.RGB.rangeOverRed(this.color()))
  greenColorStops = computed(() => ColorTheory.RGB.rangeOverGreen(this.color()))
  blueColorStops= computed(() => ColorTheory.RGB.rangeOverBlue(this.color()))

  onRedChange(event: number) {
    this.color.update(c => c.modifyRed(_ => event))
  }

  onGreenChange(event: number) {
    this.color.update(c => c.modifyGreen(_ => event))
  }

  onBlueChange(event: number) {
    this.color.update(c =>  c.modifyBlue(_ => event))
  }
}
