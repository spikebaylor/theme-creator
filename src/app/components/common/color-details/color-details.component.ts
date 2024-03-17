import {Component, computed, effect, EventEmitter, input, Output} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {Color} from "../../../models/Color";

@Component({
  selector: 'app-color-details',
  standalone: true,
  imports: [
    InputTextModule
  ],
  templateUrl: './color-details.component.html',
  styleUrl: './color-details.component.scss'
})
export class ColorDetailsComponent {

  @Output() isOutOfGamut = new EventEmitter<boolean>(false)

  color = input.required<Color>()
  inRGBGamut = computed(() => this.color().inRGBGamut())

  hexString = computed(() => this.color().forceRGBGamut().toHexString())

  actualRGB = computed(() => this.color().toRGBString())
  rgbString = computed(() => this.color().forceRGBGamut().toRGBString())

  actualHSL = computed(() => this.color().toHSLString())
  hslString = computed(() => this.color().forceHSLGamut().toHSLString())

  lchString = computed(() => this.color().toLCHString())

  constructor() {
    effect(() => {
      this.isOutOfGamut.emit(!this.inRGBGamut())
    });
  }
}
