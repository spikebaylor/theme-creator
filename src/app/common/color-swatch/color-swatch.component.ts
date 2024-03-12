import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import Color from "colorjs.io";

@Component({
  selector: 'app-color-swatch',
  standalone: true,
  imports: [],
  templateUrl: './color-swatch.component.html',
  styleUrl: './color-swatch.component.scss'
})
export class ColorSwatchComponent implements OnChanges {

  @Input() color: Color = new Color("#000000")
  @Input() textColor: Color = new Color("black")
  @Input() borderColor: Color = new Color("black")
  text: string = ""

  ngOnChanges(changes: SimpleChanges): void {
    const srgb = this.color.to("srgb")
    this.text = srgb.toString({format: "hex"}).toUpperCase()

    const hsl = this.color.to("hsl")
    this.text = hsl.toString().toUpperCase()
  }


}
