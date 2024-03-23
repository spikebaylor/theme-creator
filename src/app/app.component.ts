import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ColorComponent} from "./components/common/color-component/color-component.component";
import {Color} from "./models/Color";
import {ColorTheory} from "./models/ColorTheory";
import {ColorChartComponent} from "./components/common/color-chart/color-chart.component";
import {ThemePageComponent} from "./components/pages/theme-page/theme-page.component";
import {ColorPickerPanelComponent} from "./components/common/color-picker-panel/color-picker-panel.component";
import {DialogService} from "primeng/dynamicdialog";
import {ButtonModule} from "primeng/button";
import {ColorSchemePageComponent} from "./components/pages/color-scheme-page/color-scheme-page.component";
import {TestNordComponent} from "./test/test-nord/test-nord.component";
import {ColorTheoryPanelComponent} from "./components/common/color-theory-panel/color-theory-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, ColorComponent, ColorChartComponent, ThemePageComponent, ColorPickerPanelComponent, ButtonModule, ColorSchemePageComponent, TestNordComponent, ColorTheoryPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DialogService]
})
export class AppComponent {
  title = 'theme-creator';

  //theme = signal(ColorTheory.generateTheme(Color.fromString("#5e81ac")))

  scheme = signal(ColorTheory.generateSceme(Color.fromString("rgb(119, 22, 153)")))

  onGenerate() {
      const t = ColorTheory.generateSceme(this.scheme().getColor("primary", 500));
      this.scheme.set(t)
  }
}

