import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Color} from "../../../models/Color";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-color-chart',
  standalone: true,
  imports: [
    ChartModule
  ],
  templateUrl: './color-chart.component.html',
  styleUrl: './color-chart.component.scss'
})
export class ColorChartComponent implements OnChanges {

  @Input() colors: Color[] = []
  @Input() func: (color: Color) => number = (_) => 0
  @Input() yMin: number | undefined
  @Input() yMax: number | undefined
  @Input() title: string = ""
  data: any = {}
  options: any = {}


  ngOnChanges(changes: SimpleChanges): void {
    // update data

    const labels = this.colors.map(c => c.toHexString())
    const data = this.colors.map(c => this.func(c))
    const bgColor = this.colors.map(c => c.toString())

    this.data = {
      labels: labels,
      datasets: [
        {
          label: this.title,
          data: data,
          backgroundColor: bgColor,
          borderColor: bgColor,
          borderWidth: 1
        }
      ]
    };

    this.options = {
      scales: {
        y: {

        }
      }
    }

    if (this.yMin) {
      this.options.scales.y.min = this.yMin
    }

    if (this.yMax) {
      this.options.scales.y.max = this.yMax
    }

    /*this.options = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };*/
  }

}
