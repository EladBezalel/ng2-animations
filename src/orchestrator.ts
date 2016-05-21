import {Component} from '@angular/core';
import {Step1} from './steps/step1';
import {Step2} from './steps/step2';

@Component({
  selector: 'orchestrator',
  directives: [Step1, Step2],
  template: `
    <step-1 (done)="onDone($event)" *ngIf="item === 'step1'"></step-1>
    <step-2 *ngIf="item === 'step2'"></step-2>
  `,
})
export class Orchestrator {
  item = 'step1';

  onDone = (stepId) => {
    this.item = `step${stepId + 1}`;
  };
}