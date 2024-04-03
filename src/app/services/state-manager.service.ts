import {Injectable, signal} from '@angular/core';
import {ColorScheme} from "../models/ColorScheme";
import {ColorTheory} from "../models/ColorTheory";
import {Color} from "../models/Color";

@Injectable({
  providedIn: 'root'
})
export class StateManager {

  scheme = signal(ColorTheory.generateSceme(Color.fromString("rgb(119, 22, 153)")))

  constructor() { }
}
