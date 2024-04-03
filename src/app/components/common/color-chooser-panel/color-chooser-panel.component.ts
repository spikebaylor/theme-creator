import {Component, computed, input, model} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ColorDetailsComponent} from "../color-details/color-details.component";
import {DropdownModule} from "primeng/dropdown";
import {HSLWidgetsComponent} from "../color-picker-panel/hslwidgets/hslwidgets.component";
import {InputTextModule} from "primeng/inputtext";
import {LCHWidgetsComponent} from "../color-picker-panel/lchwidgets/lchwidgets.component";
import {PanelModule} from "primeng/panel";
import {RGBWidgetsComponent} from "../color-picker-panel/rgbwidgets/rgbwidgets.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Color} from "../../../models/Color";
import {ColorTheory} from "../../../models/ColorTheory";
import {RadioButtonModule} from "primeng/radiobutton";
import {ColorPickerPanelComponent} from "../color-picker-panel/color-picker-panel.component";
import {ColorTheoryPanelComponent} from "../color-theory-panel/color-theory-panel.component";
import {ColorScheme} from "../../../models/ColorScheme";

@Component({
  selector: 'app-color-chooser-panel',
  standalone: true,
    imports: [
        ButtonModule,
        ColorDetailsComponent,
        DropdownModule,
        HSLWidgetsComponent,
        InputTextModule,
        LCHWidgetsComponent,
        PanelModule,
        RGBWidgetsComponent,
        ReactiveFormsModule,
        RadioButtonModule,
        FormsModule,
        ColorPickerPanelComponent,
        ColorTheoryPanelComponent
    ],
  templateUrl: './color-chooser-panel.component.html',
  styleUrl: './color-chooser-panel.component.scss'
})
export class ColorChooserPanelComponent {

    color = model(Color.fromString("blue"))
    rgbColor = computed(() => this.color().forceRGBGamut())
    inRGBGamut = computed(() => this.color().inRGBGamut())
    chooserType = model<string>("picker")

    protected readonly ColorTheory = ColorTheory;
}
