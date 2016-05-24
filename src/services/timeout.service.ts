import { Injectable } from '@angular/core';

let noop = (callback:Function) => {
      return callback || (() => { });
    };

/**
 * Interface for Timeout service
 */
export interface Timeout {
  delay(duration:number, callback?:Function);
}

@Injectable()
export class TimeoutService implements Timeout{
  /**
   * Delay function that uses Promise `.then()` handlers
   * to
   */
  delay (timeout:number, callback:Function ) {
    return new Promise<void>(resolve => {
      setTimeout( resolve, timeout )
    }).then( noop(callback) );
  }
}
