import {Component, OnInit} from '@angular/core';
import {Step1} from './steps/step1';
import {Step2} from './steps/step2';
import {Step3} from './steps/step3';

@Component({
  selector: 'orchestrator',
  directives: [Step1, Step2, Step3],
  template: `
    <step-1 (done)="onDone($event)" *ngIf="item === 'step1'"></step-1>
    <step-2 (done)="onDone($event)" *ngIf="item === 'step2'"></step-2>
    <step-3 *ngIf="item === 'step3'"></step-3>
  `,
})
export class Orchestrator implements OnInit {
  item = '';

  onDone = (stepId) => {
    this.item = `step${stepId + 1}`;
    console.log(`running step${stepId + 1}`);
  };

  ngOnInit() {
    this.item = 'step1';
  }
}