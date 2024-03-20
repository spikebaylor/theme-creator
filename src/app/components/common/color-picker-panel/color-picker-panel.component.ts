import {Component, computed, effect, ElementRef, model, viewChild} from '@angular/core';
import {SliderModule} from "primeng/slider";
import {Color} from "../../../models/Color";
import {FormsModule} from "@angular/forms";
import {ColorTheory} from "../../../models/ColorTheory";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {ColorSliderComponent} from "./color-slider/color-slider.component";
import {LCHWidgetsComponent} from "./lchwidgets/lchwidgets.component";
import {DropdownModule} from "primeng/dropdown";
import {HSLWidgetsComponent} from "./hslwidgets/hslwidgets.component";
import {ColorDetailsComponent} from "../color-details/color-details.component";
import {AccordionModule} from "primeng/accordion";
import {PanelModule} from "primeng/panel";
import {ButtonModule} from "primeng/button";
import {RGBWidgetsComponent} from "./rgbwidgets/rgbwidgets.component";

@Component({
  selector: 'app-color-picker-panel',
  standalone: true,
  imports: [
    SliderModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ColorSliderComponent,
    LCHWidgetsComponent,
    DropdownModule,
    HSLWidgetsComponent,
    ColorDetailsComponent,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RGBWidgetsComponent
  ],
  templateUrl: './color-picker-panel.component.html',
  styleUrl: './color-picker-panel.component.scss'
})
export class ColorPickerPanelComponent {

  color = model(Color.fromString("blue"))
  rgbColor = computed(() => this.color().forceRGBGamut())
  inRGBGamut = computed(() => this.color().inRGBGamut())

  colorSpaceOptions = ["HSL", "RGB", "okLCH" ]
  colorSpace = "HSL"

  protected readonly ColorTheory = ColorTheory;
  textInput: string = '';

  onSetColorClicked() {
    console.log(`onSetColorClicked`)
    if (this.textInput.trim() != '') {
      try {
        const newColor = Color.fromString(this.textInput)
        console.log(`newColor: ${newColor}`)
        this.color.set(newColor)
        this.textInput = ''
      } catch (error) {
        console.error("Could not parse text as color, need to add an error msg somewhere.")
      }
    }
  }

}
