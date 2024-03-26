import {effect, Injectable, Injector, signal, WritableSignal} from "@angular/core";
import {toObservable} from "@angular/core/rxjs-interop";
import {debounceTime} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageManager {

  private cache = new Map<string, WritableSignal<any>>()

  constructor(private injector: Injector) {
  }


  localStorageString(key: string, defaultValue: string): WritableSignal<string> {
    if (!this.cache.has(key)) {
      console.log(`Creating ${key}`)
      let initvalue = localStorage.getItem(key)
      if (!initvalue) {
        initvalue = defaultValue
      }
      const sig = signal<string>(initvalue)
      this.cache.set(key, sig)

      toObservable(sig, {injector: this.injector}).pipe(
        debounceTime(1000)
      ).subscribe({
        next: v => {
          console.log(`changed[${key}] -> ${v}`)
          localStorage.setItem(key, v)
        },
        error: e => console.error("ERROR in localStorage: " + e),
        complete: () => console.log("ToObservable has completed")
      })
    }
    return this.cache.get(key)!
  }

}
