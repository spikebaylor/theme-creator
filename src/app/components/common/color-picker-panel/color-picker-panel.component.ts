import {Component, inject, model} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ColorDetailsComponent} from "@components-common/color-details/color-details.component";
import {ColorSliderComponent} from "@components-common/color-picker-panel/color-slider/color-slider.component";
import {HSLWidgetsComponent} from "@components-common/color-picker-panel/hslwidgets/hslwidgets.component";
import {LCHWidgetsComponent} from "@components-common/color-picker-panel/lchwidgets/lchwidgets.component";
import {RGBWidgetsComponent} from "@components-common/color-picker-panel/rgbwidgets/rgbwidgets.component";
import {Color} from "@models/Color";
import {ColorTheory} from "@models/ColorTheory";
import {StorageManager} from "@services/localstorage/StorageManager";
import {AccordionModule} from "primeng/accordion";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {PanelModule} from "primeng/panel";
import {SliderModule} from "primeng/slider";

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

  private storage = inject(StorageManager)

  color = model(Color.fromString("blue"))

  colorSpaceOptions = ["HSL", "RGB", "okLCH" ]
  colorSpace = this.storage.localStorage("colorpickerpanel.colorSpace", "HSL")

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
