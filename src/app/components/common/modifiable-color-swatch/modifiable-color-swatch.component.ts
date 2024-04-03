import {Component, computed, EventEmitter, input, model, Output} from '@angular/core';
import {Color} from "../../../models/Color";
import {ColorTheory} from "../../../models/ColorTheory";
import {ColorPickerDialogComponent} from "../../dialogs/color-picker-dialog/color-picker-dialog.component";
import {DialogService} from "primeng/dynamicdialog";
import {ColorDetailsComponent} from "../color-details/color-details.component";
import {TooltipModule} from "primeng/tooltip";
import {ColorSwatchComponent} from "../color-swatch/color-swatch.component";

@Component({
  selector: 'app-modifiable-color-swatch',
  standalone: true,
  imports: [
    ColorDetailsComponent,
    TooltipModule,
    ColorSwatchComponent
  ],
  templateUrl: './modifiable-color-swatch.component.html',
  styleUrl: './modifiable-color-swatch.component.scss',
  providers: [DialogService]
})
export class ModifiableColorSwatch {

  color = model.required<Color>()
  title = input<string>('')

  constructor(private dialogService: DialogService) {
  }

  onPanelClick() {
    ColorPickerDialogComponent.showDialog(this.color(), this.dialogService).onClose.subscribe(c => {
      if (c) {
        this.color.set(c)
      }
    })
  }

}
