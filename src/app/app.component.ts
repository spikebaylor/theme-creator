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

  theme = signal(ColorTheory.generateTheme(Color.fromString("#5e81ac")))
  scheme = signal(ColorTheory.generateSceme(Color.fromString("#5e81ac")))
  tones = computed(() => ColorTheory.testTonalPalette(this.theme().primary))
  test = [
      Color.fromString("#eff2f7"),
      Color.fromString("#cdd8e5"),
      Color.fromString("#b5c5d9"),
      Color.fromString("#93abc7"),
      Color.fromString("#7e9abd"),
      Color.fromString("#5e81ac"),
      Color.fromString("#56759d"),
      Color.fromString("#435c7a"),
      Color.fromString("#34475f"),
      Color.fromString("#273648"),

  ]


  onGenerate() {
/*    const t = ColorTheory.generateTheme(this.theme().primary)
    this.theme.set(t)*/
      const t = ColorTheory.generateSceme(this.scheme().getColor("primary", 500));
      this.scheme.set(t)
  }
}

