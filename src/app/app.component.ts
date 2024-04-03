import {Component, effect, signal} from '@angular/core';
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
import {ColorChooserPanelComponent} from "./components/common/color-chooser-panel/color-chooser-panel.component";
import {StateManager} from "./services/state-manager.service";
import {ColorScheme} from "./models/ColorScheme";
import {
  ColorTheorySwatches
} from "./components/common/color-theory-panel/color-theory-swatches/color-theory-swatches.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColorComponent, ColorChartComponent, ThemePageComponent, ColorPickerPanelComponent, ButtonModule, ColorSchemePageComponent, TestNordComponent, ColorTheoryPanelComponent, ColorChooserPanelComponent, ColorTheorySwatches],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DialogService]
})
export class AppComponent {
  title = 'theme-creator';

  scheme: ColorScheme = ColorTheory.generateScemeTriadic(Color.fromString("blue"))

  testColor = Color.fromString("blue")
  test = [this.testColor]

  constructor(private state: StateManager) {
    effect(() => {
      this.scheme = state.scheme()
    });
  }

  onGenerate() {
      const t = ColorTheory.generateScemeTriadic(this.scheme.getColor("primary", 500));

      this.state.scheme.set(t)
  }
}

