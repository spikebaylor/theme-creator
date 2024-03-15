import {Component, computed, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ColorSwatchComponent} from "./common/color-swatch/color-swatch.component";
import {NgForOf} from "@angular/common";
import {ColorComponent} from "./components/common/color-component/color-component.component";
import {Color} from "./models/Color";
import {ColorTheory} from "./models/ColorTheory";
import {ColorChartComponent} from "./components/common/color-chart/color-chart.component";
import {ThemePageComponent} from "./components/pages/theme-page/theme-page.component";
import {ColorPickerPanelComponent} from "./components/common/color-picker-panel/color-picker-panel.component";
import {DialogService} from "primeng/dynamicdialog";
import {ButtonModule} from "primeng/button";
import {ColorSchemePageComponent} from "./components/pages/color-scheme-page/color-scheme-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, ColorSwatchComponent, NgForOf, ColorComponent, ColorChartComponent, ThemePageComponent, ColorPickerPanelComponent, ButtonModule, ColorSchemePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DialogService]
})
export class AppComponent {
  title = 'theme-creator';

  theme = signal(ColorTheory.generateTheme(Color.hexString("#5e81ac")))
  scheme = signal(ColorTheory.generateSceme(Color.hexString("#5e81ac")))
  tones = computed(() => ColorTheory.testTonalPalette(this.theme().primary))
  test = [
      Color.hexString("#eff2f7"),
      Color.hexString("#cdd8e5"),
      Color.hexString("#b5c5d9"),
      Color.hexString("#93abc7"),
      Color.hexString("#7e9abd"),
      Color.hexString("#5e81ac"),
      Color.hexString("#56759d"),
      Color.hexString("#435c7a"),
      Color.hexString("#34475f"),
      Color.hexString("#273648"),

  ]


  onGenerate() {
/*    const t = ColorTheory.generateTheme(this.theme().primary)
    this.theme.set(t)*/
      const t = ColorTheory.generateSceme(this.scheme().getColor("primary", 500));
      this.scheme.set(t)
  }
}

