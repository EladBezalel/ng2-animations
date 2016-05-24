import {Component, OnInit} from '@angular/core';
import {Step1} from './steps/step1.view';
import {Step2} from './steps/step2.view';
import {Step3} from './steps/step3.view';

@Component({
  selector: 'orchestrator',
  template: `
    <step-1 (done)="onDone($event)" *ngIf="currentStep === 'step-1'"></step-1>
    <step-2 (done)="onDone($event)" *ngIf="currentStep === 'step-2'"></step-2>
    <step-3                         *ngIf="currentStep === 'step-3'"></step-3>
  `,
  directives : [
    Step1,
    Step2,
    Step3
  ]
})
export class Orchestrator implements OnInit {
  currentStep = '';

  onDone = (stepId) => {
    this.currentStep = `step-${stepId + 1}`;
  };

  ngOnInit() {
    // auto-start animation
    this.currentStep = 'step-1';
  }
}
