import {Component, EventEmitter, input, Output, signal} from '@angular/core';
import {Color} from "../../../../models/Color";
import {ColorComponent} from "../../color-component/color-component.component";

@Component({
  selector: 'app-color-theory-swatches',
  standalone: true,
  imports: [
    ColorComponent
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
