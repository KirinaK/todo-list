import { Injectable, isDevMode, ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private errorHandler: ErrorHandler) { }

  errorLog(error: Error): void {
    const noop: Function = (): any => {};
    (isDevMode) ? this.errorHandler.handleError(error.message) : noop;
  }
}
