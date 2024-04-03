import {Component, computed, EventEmitter, input, Output} from '@angular/core';
import {Color} from "../../../models/Color";
import {ColorTheory} from "../../../models/ColorTheory";
import {ColorPickerDialogComponent} from "../../dialogs/color-picker-dialog/color-picker-dialog.component";
import {DialogService} from "primeng/dynamicdialog";
import {ColorDetailsComponent} from "../color-details/color-details.component";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-color-component',
  standalone: true,
  imports: [
    ColorDetailsComponent,
    TooltipModule
  ],
  templateUrl: './color-component.component.html',
  styleUrl: './color-component.component.scss',
  providers: [DialogService]
})
export class ColorComponent {

  color = input.required<Color>()
  @Output()
  colorSelected = new EventEmitter<Color>()
  textShouldBeLight = computed(() => ColorTheory.textColorShouldBeLight(this.color()))
  allowColorSelection = input<boolean>(false)
  title = input<string>('')
  hex = computed(() => this.color().toHexString())

  constructor(private dialogService: DialogService) {
  }

  onPanelClick() {
/*    if (this.allowColorSelection()) {
      ColorPickerDialogComponent.showDialog(this.color(), this.dialogService).onClose.subscribe(c => {
        if (c) {
          this.colorSelected.emit(c)
        }
      })
    }*/
  }

  getTitle(): string {
    if (this.title() == "") {
      return this.hex();
    } else {
      return this.title()
    }
  }
}
