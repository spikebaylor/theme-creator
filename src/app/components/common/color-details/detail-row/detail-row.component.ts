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

  showCopied = false
  interval: any

  copy() {
    navigator.clipboard.writeText(this.value())
    this.showCopied = true;
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.interval = setInterval(() => this.showCopied = false, 2000)
  }
}
