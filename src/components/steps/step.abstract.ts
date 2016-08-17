import { Injectable, Output, OnInit, EventEmitter} from '@angular/core'

import {TimeoutService} from '../../services/timeout.service.ts';

@Injectable()
export abstract class AbstractStep implements OnInit {
  @Output() done: EventEmitter<Number> = new EventEmitter<Number>();

  timeout: TimeoutService = new TimeoutService();

  constructor (private stepId: number) {}

  ngOnInit () {
    this.play()
      .then(() => {
        this.done.emit(this.stepId);
      });
  }

  abstract play();
}
