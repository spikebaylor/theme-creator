import {Component, computed, inject, model} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ColorDetailsComponent} from "@components-common/color-details/color-details.component";
import {ColorPickerPanelComponent} from "@components-common/color-picker-panel/color-picker-panel.component";
import {HSLWidgetsComponent} from "@components-common/color-picker-panel/hslwidgets/hslwidgets.component";
import {LCHWidgetsComponent} from "@components-common/color-picker-panel/lchwidgets/lchwidgets.component";
import {RGBWidgetsComponent} from "@components-common/color-picker-panel/rgbwidgets/rgbwidgets.component";
import {ColorTheoryPanelComponent} from "@components-common/color-theory-panel/color-theory-panel.component";
import {Color} from "@models/Color";
import {ColorTheory} from "@models/ColorTheory";
import {StorageManager} from "@services/localstorage/StorageManager";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {PanelModule} from "primeng/panel";
import {RadioButtonModule} from "primeng/radiobutton";

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

    storage = inject(StorageManager)

    color = model(Color.fromString("blue"))
    rgbColor = computed(() => this.color().forceRGBGamut())
    inRGBGamut = computed(() => this.color().inRGBGamut())
    chooserType = this.storage.localStorage("colorchooserpanel.chooserType", "picker")

    protected readonly ColorTheory = ColorTheory;
}
