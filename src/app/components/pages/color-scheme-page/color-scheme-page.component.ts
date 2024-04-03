import {Component, effect, inject, input} from '@angular/core';
import {Theme} from "../../../models/Theme";
import {ColorScheme} from "../../../models/ColorScheme";
import {ModifiableColorSwatch} from "../../common/modifiable-color-swatch/modifiable-color-swatch.component";
import {Color} from "../../../models/Color";
import {ColorSwatchComponent} from "../../common/color-swatch/color-swatch.component";
import {StateManager} from "../../../services/state-manager.service";

@Component({
  selector: 'app-color-scheme-page',
  standalone: true,
    imports: [
        ModifiableColorSwatch,
        ColorSwatchComponent
    ],
  templateUrl: './color-scheme-page.component.html',
  styleUrl: './color-scheme-page.component.scss'
})
export class ColorSchemePageComponent {

  state = inject(StateManager)
  scheme = this.state.scheme

  protected readonly ColorScheme = ColorScheme;

  setColor(colorName: string, color: Color) {
    this.scheme().setColor(colorName, color)
  }
}
