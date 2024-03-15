import {Component, input} from '@angular/core';
import {Theme} from "../../../models/Theme";
import {ColorScheme} from "../../../models/ColorScheme";
import {ColorComponent} from "../../common/color-component/color-component.component";
import {Color} from "../../../models/Color";

@Component({
  selector: 'app-color-scheme-page',
  standalone: true,
  imports: [
    ColorComponent
  ],
  templateUrl: './color-scheme-page.component.html',
  styleUrl: './color-scheme-page.component.scss'
})
export class ColorSchemePageComponent {

  scheme = input.required<ColorScheme>()

  protected readonly ColorScheme = ColorScheme;

  setColor(colorName: string, color: Color) {
    this.scheme().setColor(colorName, color)
  }
}
