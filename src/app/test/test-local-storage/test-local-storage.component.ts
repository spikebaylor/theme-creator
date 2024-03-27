import {Component, input, WritableSignal} from '@angular/core';
import {StorageManager} from "@test/localstorage/StorageManager";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {Color} from "@models/Color";
import {InputNumberModule} from "primeng/inputnumber";
import {ColorComponent} from "@components-common/color-component/color-component.component";

@Component({
  selector: 'app-test-local-storage',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    InputNumberModule,
    ColorComponent
  ],
  templateUrl: './test-local-storage.component.html',
  styleUrl: './test-local-storage.component.scss'
})
export class TestLocalStorageComponent {

  myString: WritableSignal<string>
  myNumber: WritableSignal<number>
  myColor: WritableSignal<Color>

  constructor(private storage: StorageManager) {
    this.myString = storage.localStorage<string>("myString", "The Default")
    this.myNumber = storage.localStorage<number>("myNumber", 88)
    this.myColor = storage.localStorage<Color>("myColor", Color.fromString("blue"))
  }

}
