import {Component, effect, ElementRef, input, model, viewChild} from '@angular/core';
import {SliderModule} from "primeng/slider";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {Color} from "../../../../models/Color";

@Component({
  selector: 'app-color-slider',
  standalone: true,
  imports: [
    SliderModule,
    InputNumberModule,
    FormsModule
  ],
  templateUrl: './color-slider.component.html',
  styleUrl: './color-slider.component.scss'
})
export class ColorSliderComponent {

  value = model.required<number>()
  colorStops = input.required<Color[]>()
  labelText = input.required<string>()
  min = input<number>(0)
  max = input<number>(100)
  step = input<number>(1)
  maxFractionDigits = input<number>(0)
  container = viewChild<ElementRef>("container")

  constructor() {
    effect(() => {
        this.container()!!.nativeElement.style.setProperty('--colorStops', this.colorStops())
    })
  }

  onChange(event: number) {
    // This is a hack, but for some reason SOMETIMES this becomes a string even though it should not.
    if (typeof event == "string") {
      event = Number(event)
    }
    this.value.set(event)
  }
}
