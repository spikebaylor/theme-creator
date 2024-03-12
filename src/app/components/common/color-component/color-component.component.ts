import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Color} from "../../../models/Color";

@Component({
  selector: 'app-color-component',
  standalone: true,
  imports: [],
  templateUrl: './color-component.component.html',
  styleUrl: './color-component.component.scss'
})
export class ColorComponent implements OnChanges {

  @Input() color: Color = Color.hexString("#000000")

  ngOnChanges(changes: SimpleChanges): void {

  }




}
