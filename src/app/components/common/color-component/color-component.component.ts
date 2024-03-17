import {Component, computed, EventEmitter, input, Input, model, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Color} from "../../../models/Color";
import {ColorTheory} from "../../../models/ColorTheory";
import _default from "chart.js/dist/plugins/plugin.legend";
import {ColorPickerDialogComponent} from "../../dialogs/color-picker-dialog/color-picker-dialog.component";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-color-component',
  standalone: true,
  imports: [],
  templateUrl: './color-component.component.html',
  styleUrl: './color-component.component.scss',
  providers: [DialogService]
})
export class ColorComponent {

  color = model.required<Color>()
  @Output()
  colorSelected = new EventEmitter<Color>()
  textShouldBeLight = computed(() => ColorTheory.textColorShouldBeLight(this.color()))
  allowColorSelection = input<boolean>(false)
  title = input<string>('')
  hex = computed(() => this.color().toHexString())

  constructor(private dialogService: DialogService) {
  }

  onPanelClick() {
    if (this.allowColorSelection()) {
      ColorPickerDialogComponent.showDialog(this.color(), this.dialogService).onClose.subscribe(c => {
        if (c) {
          this.colorSelected.emit(c)
        }
      })
    }
  }

  getTitle(): string {
    if (this.title() == "") {
      return this.hex();
    } else {
      return this.title()
    }
  }
}
