import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private enabled = true;
  private noop = () => {};

  constructor() {
    if (!isDevMode) this.enabled = false;
  }

  invokeConsoleMethod(type: string, args?: any): void {
    if (this.enabled) {
      const logFn: Function = (console)[type] || this.noop;
      logFn.apply(console, [args]);
    }
  }
}