import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ColorSwatchComponent} from "./common/color-swatch/color-swatch.component";
import ColorJS from "colorjs.io";
import {NgForOf} from "@angular/common";
import {HSL, LCH} from "./util/Colors";
import {ColorComponent} from "./components/common/color-component/color-component.component";
import {Color} from "./models/Color";
import {ColorTheory} from "./models/ColorTheory";
import {ColorChartComponent} from "./components/common/color-chart/color-chart.component";
import {ThemePageComponent} from "./components/pages/theme-page/theme-page.component";
import {Theme} from "./models/Theme";
import {ColorPickerPanelComponent} from "./components/common/color-picker-panel/color-picker-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ColorSwatchComponent, NgForOf, ColorComponent, ColorChartComponent, ThemePageComponent, ColorPickerPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'theme-creator';
  //root: Color = new Color("#5E81AC")
  //root: Color = new Color("#FF0080")
  //root: ColorJS = new ColorJS("#D8DEE9")
  colorColumns: ColorColumn[] = []
  nd: Color = Color.hexString("black")
  nl: Color = Color.hexString("white")

  chartColors: Color[] = []
  luminance = (color: Color) => color.luminanceLCH()
  chroma = (color: Color) => color.chromaLCH()
  hue = (color: Color) => color.hueLCH()
  yMin = 0;
  yMax = .5;
  chartTitle = "Chroma"
  theme: Theme = new Theme(Color.hexString("blue"))

  constructor() {
    this.showGeneratedTheme();
    //this.showNordTheme();
    // set primary (from code for now)
    // auto create secondary, tertiary, nl, nd (like below)
    // show these swatches and charts for LCH and HSL comparing
    // Get color picker on swatches for now
    // ideally i'd like to be able to set LCH, HSL, RGB etc from this picker.
    // Show some default stuff using this generated theme?

/*
    const root = Color.hexString("#5E81AC")
    this.theme = new Theme(root)

    const comp = LCH.getComplimentTest(root)
    const analogous = ColorTheory.LCH.analogous(root, 25)
    const split = ColorTheory.LCH.splitCompliment(root, 25)

    const primary = root;
    const secondary = analogous[0]
    const accent = comp
    this.nl = ColorTheory.LCH.neutralLight(root)
    this.nd = ColorTheory.LCH.neutralDark(root)

    this.colorColumns.push({

      title: "Nord", colors: [
        Color.hexString("#8fbcbb"),
        Color.hexString("#d08770"),
        Color.hexString("#5E81AC"),
        Color.hexString("#2e3440"),
        Color.hexString("#d8dee9"),
        Color.hexString("#bf616a"),
        Color.hexString("#ebcb8b"),
        Color.hexString("#8ba378"),
      ]
    })

    const nordColors = this.colorColumns[0].colors.map(cc => cc)
    this.chartColors = nordColors

    this.colorColumns.push({title: "Scheme", colors: [
        primary,
        secondary,
        accent,
        split[0],
        split[1],
        this.nl,
        this.nd]})

    const themeColors = this.colorColumns[1].colors.map(cc => cc)
    this.chartColors = themeColors


    this.colorColumns.push({
      title: "Test", colors: [
        primary.modifyLCH((l, c, h) => [l, c, 29.23]),
        primary.modifyLCH((l, c, h) => [l, c, 142.50]),
        primary.modifyLCH((l, c, h) => [l, c, 264.05]),
        primary.modifyLCH((l, c, h) => [l, c, 109.77]),
        primary.modifyLCH((l, c, h) => [l, c, 194.77]),
        primary.modifyLCH((l, c, h) => [l, c, 328.36]),
      ]
    })

    this.colorColumns.push({
      title: "Primary Colors", colors: [
        Color.hexString("#FF0000"),
        Color.hexString("#00FF00"),
        Color.hexString("#0000FF"),
        Color.hexString("#FFFF00"),
        Color.hexString("#00FFFF"),
        Color.hexString("#FF00FF"),
      ]
    })*/


  }

  private showGeneratedTheme() {
    const root = Color.hexString("#5E81AC")
    this.theme = new Theme(root)
  }

  private showNordTheme() {
    const root = Color.hexString("#5E81AC")
    this.theme = new Theme(root)

    this.theme.primary =  Color.hexString("#8fbcbb")
    this.theme.secondary = Color.hexString("#d08770")
    this.theme.tertiary = Color.hexString("#5E81AC")
    this.theme.neutralLight = Color.hexString("#2e3440")
    this.theme.neutralDark = Color.hexString("#d8dee9")

    this.theme.red = Color.hexString("#bf616a")
    this.theme.green = Color.hexString("#8ba378")
    this.theme.blue = Color.hexString("#5E81AC")
    this.theme.yellow = Color.hexString("#ebcb8b")
    this.theme.purple = Color.hexString("#B48EAD")
  }

  /*private testRandom6() {
    const red = new ColorJS("HSL", [0, 100, 50]);
    const orange = new ColorJS("HSL", [30, 100, 50]);
    const yellow = new ColorJS("HSL", [60, 100, 50]);
    const chartreuse = new ColorJS("HSL", [90, 100, 50]);
    const green = new ColorJS("HSL", [120, 100, 50]);
    const spring = new ColorJS("HSL", [150, 100, 50]);
    const cyan = new ColorJS("HSL", [180, 100, 50]);
    const azure = new ColorJS("HSL", [210, 100, 50]);
    const blue = new ColorJS("HSL", [240, 100, 50]);
    const violet = new ColorJS("HSL", [270, 100, 50]);
    const magenta = new ColorJS("HSL", [300, 100, 50]);
    const rose = new ColorJS("HSL", [330, 100, 50]);
    const twelve = [red, orange, yellow, chartreuse, green, spring, cyan, azure, blue, violet, magenta, rose];


    twelve.forEach(c => {
      const colors = this.randomWithinHueSpace(c)
      const title = c.toString()
      this.colorColumns.push({title, colors})
    })

  }*/

  private randomWithinHueSpace(root: ColorJS): ColorJS[] {
    const hsl = root.to("hsl");
    const hue = hsl.h
    const colors = [root]
    const min = (360 + hue - 15)
    const max = (360 + hue + 15)


    for (let i = 0; i < 6; i++) {
      const hue = this.getRandomInt(min, max)
      const saturation = this.getRandomInt(20, 80)
      const lightness = this.getRandomInt(20, 80)
      colors.push(new ColorJS("HSL", [hue % 360, saturation, lightness]))
    }
    return colors;
  }

  getRandomInt(min: number, max: number): number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  /*private testColorTheory() {
    this.nd = LCH.getNeutralDark(this.root)
    this.nl = LCH.getNeutralLight(this.root)

    console.log("NL: " + this.nl)
    console.log("ND: " + this.nd)

    this.colorColumns.push({title: "Neutrals",colors: [this.nl, this.nd]})

    //this.colorColumns.push({title: "Root",colors: [this.root]})

    //this.colorColumns.push({title: "LCH Compliment",colors: [LCH.getCompliment(this.root)]})
    this.colorColumns.push({title: "HSL Compliment",colors: [HSL.getCompliment(this.root)]})

    //this.colorColumns.push({title: "LCH Adjacent",colors: LCH.getAnalogous(this.root, 35)})
    this.colorColumns.push({title: "HSL Adjacent",colors: HSL.getAnalogous(this.root, 25)})

    //this.colorColumns.push({title: "LCH Triads",colors: LCH.getTriads(this.root, 35)})
    //this.colorColumns.push({title: "HSL Triads",colors: HSL.getTriads(this.root, 35)})

    //this.colorColumns.push({title: "LCH Triadic",colors: LCH.getTradics(this.root)})
    this.colorColumns.push({title: "HSL Triadic",colors: HSL.getTradics(this.root)})

    //this.colorColumns.push({title: "LCH Tetradic",colors: LCH.getTetradics(this.root)})
    this.colorColumns.push({title: "HSL Tetradic",colors: HSL.getTetradics(this.root)})

    this.colorColumns.forEach(cc => {
      cc.colors.unshift(this.root)
    })
  }*/

}

interface ColorColumn {
  title: string
  colors: Color[]
}
