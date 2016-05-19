import {Component} from '@angular/core';
import {Step1} from './step1';
import {Step2} from './step2';

@Component({
  selector: 'orchestrator',
  directives: [Step1, Step2],
  template: `
    <step-1 [state]="state" *ngIf="item === 'step1'"></step-1>
    <step-2 *ngIf="item === 'step2'"></step-2>
  `,
})

export class Orchestrator {
  public state = 'void';
  item = 'step1';

  constructor () {
    this.play();
  }

  private time = (timeout) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });

  };

  public play = () => {
    this.state = 'active';

    this.time(500)
      .then(() => {
        this.state = 'turned';

        return this.time(600);
      })
      .then(() => {
        this.item = 'step2'
      });
  };
}