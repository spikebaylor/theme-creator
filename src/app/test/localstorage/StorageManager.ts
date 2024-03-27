import {effect, Injectable, Injector, signal, WritableSignal} from "@angular/core";
import {toObservable} from "@angular/core/rxjs-interop";
import {debounceTime} from "rxjs";
import {Color} from "@models/Color";

@Injectable({
  providedIn: 'root'
})
export class StorageManager {

  private cache = new Map<string, WritableSignal<any>>()

  constructor(private injector: Injector) {
  }

  localStorage<T>(key: string, defaultValue: T): WritableSignal<T> {
    if (typeof defaultValue === "string") {
      return this.handleLocalStorage(key, defaultValue, this.serializeString, this.deserializeString)
    } else if( typeof defaultValue === "number") {
      return this.handleLocalStorage(key, defaultValue, this.serializeNumber, this.deserializeNumber)
    } else if (defaultValue instanceof Color) {
      return this.handleLocalStorage(key, defaultValue, this.serializeColor, this.deserializeColor)
    }

    console.log("LS: any")
    return this.handleLocalStorage(key, defaultValue, this.serializeAny, this.deserializeAny)
  }

  private serializeColor(c: Color): string {
    return c.toString()
  }

  private deserializeColor(s: string): Color {
    return Color.fromString(s)
  }

  private serializeNumber(s: number): string {
    return s.toString()
  }

  private deserializeNumber(s: string): number {
    return +s
  }

  private serializeString(s: string): string {
    return s
  }

  private deserializeString(s: string): string {
    return s
  }

  private serializeAny(obj: any): string {
    return JSON.stringify(obj)
  }

  private deserializeAny(s: any): any {
    return JSON.parse(s)
  }

  private handleLocalStorage<T>(key: string, defaultValue: T, serializer: (v: T) => string, deserializer: (s: string) => T) {
    if (!this.cache.has(key)) {
      console.log(`Creating ${key}`);
      const str = localStorage.getItem(key)
      let initvalue: T | undefined = undefined
      if (str) {
        console.log(`Creating ${key}: fromLocalStorage: ${str}`)
        initvalue = deserializer(str)
      }
      if (!initvalue) {
        console.log(`Creating ${key}: defaultValue: ${defaultValue}`)
        initvalue = defaultValue
      }
      const sig = signal<T>(initvalue)
      this.cache.set(key, sig)

      toObservable(sig, {injector: this.injector}).pipe(
        debounceTime(1000)
      ).subscribe({
        next: v => {
          const serialized = serializer(v)
          console.log(`changed[${key}] -> ${serialized}`)
          localStorage.setItem(key, serialized)
        },
        error: e => console.error("ERROR in localStorage: " + e),
        complete: () => console.log("ToObservable has completed")
      })
    }
    return this.cache.get(key)!
  }



  /*localStorageString(key: string, defaultValue: string): WritableSignal<string> {
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
  }*/

}
