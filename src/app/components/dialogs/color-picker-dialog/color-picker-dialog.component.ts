import {Component} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Color} from "../../../models/Color";
import {ButtonModule} from "primeng/button";
import {ColorPickerPanelComponent} from "../../common/color-picker-panel/color-picker-panel.component";

@Component({
  selector: 'app-color-picker-dialog',
  standalone: true,
  imports: [
    ButtonModule,
    ColorPickerPanelComponent
  ],
  templateUrl: './color-picker-dialog.component.html',
  styleUrl: './color-picker-dialog.component.scss'
})
export class ColorPickerDialogComponent {

  color: Color;

  public static showDialog(color: Color = Color.fromString("red"), dialogService: DialogService): DynamicDialogRef {
    return dialogService.open(ColorPickerDialogComponent, {
      header: 'Choose Color',
      width: '700px',
      data: {inputColor: color}
    })
  }

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.color = config.data.inputColor;
    this.reset();
  }

  public reset() {

  }
  public cancel() {
    this.ref.close()
  }

  public saveChangesClicked() {
    this.ref.close(this.color);
  }

}
