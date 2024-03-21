import {Component, input} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-detail-row',
  standalone: true,
    imports: [
        InputTextModule
    ],
  templateUrl: './detail-row.component.html',
  styleUrl: './detail-row.component.scss'
})
export class DetailRowComponent {

  label = input.required<string>()
  value = input<string>("")
  isWarning = input<boolean>(false)
  warning = input<string>("")

  copied = ""
  interval: any

  copy() {
    navigator.clipboard.writeText(this.value())
    console.log(`COPIED!: ${this.value()}`)
    this.copied = "copied";
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.interval = setInterval(() => this.copied = "", 2000)
  }
}
