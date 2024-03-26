import {Component, input, WritableSignal} from '@angular/core';
import {StorageManager} from "@test/localstorage/StorageManager";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-test-local-storage',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule
  ],
  templateUrl: './test-local-storage.component.html',
  styleUrl: './test-local-storage.component.scss'
})
export class TestLocalStorageComponent {

  myString: WritableSignal<string>

  constructor(private storage: StorageManager) {
    this.myString = storage.localStorageString("bah", "The Default")
  }

}
