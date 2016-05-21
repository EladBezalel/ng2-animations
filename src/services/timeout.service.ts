import { Injectable } from '@angular/core';

@Injectable()
export class TimeoutService {
  $promise (timeout) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  }
}