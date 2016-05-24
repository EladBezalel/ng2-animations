import { Output, OnInit, EventEmitter} from '@angular/core'
import {Timeout, TimeoutService} from '../services/timeout.service.ts';

export abstract class AbstractStep implements OnInit {
  private   timeout : Timeout      = new TimeoutService();
  protected stepID  : number       = 0;
  protected state   : string       = 'void';
  @Output() done    : EventEmitter = new EventEmitter();

  constructor (stepId: number) {
    this.stepID = stepId;
  }

  delay (duration:number) {
    return this.timeout.delay(duration);
  }

  ngOnInit () {
    this
      .play()
      .then(() => {
        this.done.emit(this.stepID);
      });
  }

  /**
   * Abstract method; implement in subclass(es)
   */
  abstract play();
}
