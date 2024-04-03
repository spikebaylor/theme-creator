import {Component, EventEmitter, input, Output, signal} from '@angular/core';
import {Color} from "../../../../models/Color";
import {ModifiableColorSwatch} from "../../modifiable-color-swatch/modifiable-color-swatch.component";
import {ColorSwatchComponent} from "../../color-swatch/color-swatch.component";

@Component({
  selector: 'app-color-theory-swatches',
  standalone: true,
  imports: [
    ModifiableColorSwatch,
    ColorSwatchComponent
  ],
  templateUrl: './color-theory-swatches.component.html',
  styleUrl: './color-theory-swatches.component.scss'
})
export class ColorTheorySwatches {

  lchColors = input.required<Color[]>()
  hslColors = input.required<Color[]>()

  @Output() onSelected = new EventEmitter<Color>()

  onColorSelected(c: Color) {
    this.onSelected.emit(c)
  }
}
