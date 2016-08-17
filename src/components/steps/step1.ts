import {trigger, style, keyframes, animate, state, transition, group, Component } from '@angular/core'

import {AbstractStep} from "./step.abstract";

@Component({
  selector: 'step-1',
  styles: [`
    .item {
      background-color: white;     
      box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
                  0 4px 5px 0 rgba(0,0,0,.14),
                  0 1px 10px 0 rgba(0,0,0,.12);
      align-self: center;    
    }
  `],
  template: `
    <div class="item" [@state]="state"></div>
  `,
  animations: [
    trigger('state', [
      state('active', style({
        height: '300px',
        width: '300px',
        borderRadius: '3px'
      })),
      state('turned', style({
        height: '300px',
        width: '600px',
        transform: 'rotate(0deg)'
      })),
      transition('void => active', [
        group([
          animate('.6s ease', keyframes([
            style({
              marginTop: '100px',
              height: '0px',
              width: '200px',
              borderRadius: '0px'
            }),
            style({
              marginTop: '100px',
              height: '300px',
              width: '300px',
              borderRadius: '3px'
            })
          ])),
          animate('.7s .2s ease', keyframes([
            style({
              marginTop: '100px'
            }),
            style({
              marginTop: '0'
            })
          ]))
        ])
      ]),
      transition('active => turned', [
        group([
          animate('.7s ease-in-out', keyframes([
            style({ transform: 'rotate(-90deg)' }),
            style({ transform: 'rotate(0deg)'}),
          ])),
          animate('.6s .1s ease-in', keyframes([
            style({ width: '300px' }),
            style({ width: '600px' })
          ]))
        ])
      ])
    ]),
  ],
  outputs: ['done'] // https://github.com/angular/angular/issues/5415
})
export class Step1 extends AbstractStep {
  state = 'void';

  constructor() {
    super(1);
  }

  play() {
    this.state = 'active';

    return this.timeout.$promise(800)
      .then(() => {
        this.state = 'turned';

        return this.timeout.$promise(700);
      })
  }
}
