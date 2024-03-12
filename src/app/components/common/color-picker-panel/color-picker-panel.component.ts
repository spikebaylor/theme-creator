import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {SliderModule} from "primeng/slider";
import {Color} from "../../../models/Color";
import {Range} from "colorjs.io"
import {FormsModule} from "@angular/forms";
import {ColorTheory} from "../../../models/ColorTheory";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {ColorSliderComponent} from "./color-slider/color-slider.component";

@Component({
  selector: 'app-color-picker-panel',
  standalone: true,
  imports: [
    SliderModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    ColorSliderComponent
  ],
  templateUrl: './color-picker-panel.component.html',
  styleUrl: './color-picker-panel.component.scss'
})
export class ColorPickerPanelComponent implements OnChanges, AfterViewInit {

  @Input() color: Color = Color.hexString("blue")
  @ViewChild("container") container!: ElementRef

  hue: number = this.color.hueLCH()
  chroma: number = this.color.chromaLCH()
  luminance: number = this.color.luminanceLCH()

  hueColorStops = signal<Color[]>([])
  luminanceColorStops = signal<Color[]>([])
  chromaColorStops = signal<Color[]>([])

  private update() {
    this.hue = this.color.hueLCH()
    this.chroma = this.color.chromaLCH()
    this.luminance = this.color.luminanceLCH()

    this.hueColorStops.set(ColorTheory.LCH.rangeOverHue(this.color));
    this.chromaColorStops.set(ColorTheory.LCH.rangeOverChroma(this.color));
    this.luminanceColorStops.set(ColorTheory.LCH.rangeOverLuminance(this.color));
  }

  onHueChange(event: number) {
    this.hue = event
    this.color = this.color.modifyHueLCH(_ => this.hue)
    this.update()
  }

  onLuminanceChange(event: number) {
    this.luminance = event
    this.color = this.color.modifyLuminanceLCH(_ => this.luminance)
    this.update()
  }

  onChromaChange(event: number) {
    this.chroma = event
    this.color = this.color.modifyChromaLCH(_ => this.chroma)
    this.update()
  }

  ngAfterViewInit(): void {
    this.update()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update()
  }

}
