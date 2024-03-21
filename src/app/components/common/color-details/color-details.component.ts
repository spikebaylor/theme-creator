import {Component, computed, effect, EventEmitter, input, Output} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {Color} from "../../../models/Color";
import {ButtonModule} from "primeng/button";
import {DetailRowComponent} from "./detail-row/detail-row.component";

@Component({
  selector: 'app-color-details',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    DetailRowComponent
  ],
  templateUrl: './color-details.component.html',
  styleUrl: './color-details.component.scss'
})
export class ColorDetailsComponent {

  @Output() isOutOfGamut = new EventEmitter<boolean>(false)

  color = input.required<Color>()
  inRGBGamut = computed(() => this.color().inRGBGamut())

  hexString = computed(() => this.color().toHexString(true))

  actualRGB = computed(() => this.color().toRGBString())
  rgbString = computed(() => this.color().toRGBString(true))

  actualHSL = computed(() => this.color().toHSLString())
  hslString = computed(() => this.color().toHSLString(true))

  lchString = computed(() => this.color().toLCHString())

  constructor() {
    effect(() => {
      this.isOutOfGamut.emit(!this.inRGBGamut())
    });
  }

  copy(s: string) {
    navigator.clipboard.writeText(s)
  }
}
