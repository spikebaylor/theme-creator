import {Component, computed, input} from '@angular/core';
import {ColorDetailsComponent} from "../color-details/color-details.component";
import {Color} from "../../../models/Color";
import {ColorTheory} from "../../../models/ColorTheory";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-color-swatch',
  standalone: true,
  imports: [
    ColorDetailsComponent,
    TooltipModule
  ],
  templateUrl: './color-swatch.component.html',
  styleUrl: './color-swatch.component.scss'
})
export class ColorSwatchComponent {


  color = input.required<Color>()
  textShouldBeLight = computed(() => ColorTheory.textColorShouldBeLight(this.color()))
  title = input<string>('')
  hex = computed(() => this.color().toHexString())

  getTitle(): string {
    if (this.title() == "") {
      return this.hex();
    } else {
      return this.title()
    }
  }

}
