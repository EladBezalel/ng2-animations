import {Component, trigger, keyframes, state, style, transition, animate} from "@angular/core";
import {AbstractStep} from "./step.abstract";

var boxShadow = '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)';

@Component({
  selector: 'step-3',
  styles: [`
    .container {
      width: 300px;
      height: 300px;
      display: flex;
      flex-direction: column;
      align-content: space-between;
      justify-content: space-between;
      box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
                  0 4px 5px 0 rgba(0,0,0,.14),
                  0 1px 10px 0 rgba(0,0,0,.12);
      border-radius: 3px;      
    }
    .item {
      background-color: white;      
      display: flex;
      flex: 1;
    }
  `],
  template: `
    <div class="container" [@container]="state">
      <div class="item" [@item]="state"></div>
      <div [@separator]="state"></div>
      <div class="item" [@item]="state"></div>
      <div [@separator]="state"></div>
      <div class="item" [@item]="state"></div>
      <div [@separator]="state"></div>
      <div class="item" [@item]="state"></div>
    </div>
  `,
  animations: [
    trigger('item', [
      state('spliced', style({ borderRadius: '3px', boxShadow: boxShadow })),
      state('joined', style({ borderRadius: '3px 0 3px 0x' })),
      transition('void => spliced', [
        style({ boxShadow: boxShadow }),
        animate('1s ease')
      ]),
      transition('spliced => joined', [,
        animate('0s', keyframes([
          style({ boxShadow: 'none' }),
          style({ boxShadow: boxShadow })
        ])),
        animate('1s ease', keyframes([
          style({ borderRadius: '3px' }),
          style({ borderRadius: '0' })
        ])),
        animate('0s', keyframes([
          style({ boxShadow: boxShadow }),
          style({ boxShadow: 'none' })
        ]))
      ])
    ]),
    trigger('container', [
      state('spliced', style({ height: '348px', boxShadow: 'none' })),
      state('joined', style({ height: '300px', borderRadius: '3px' })),

      transition('void => spliced', [
        style({ boxShadow: 'none' }),
        animate('1s ease')
      ]),
      transition('spliced => joined', [
        animate('1s ease', keyframes([
          style({ height: '348px'}),
          style({ height: '300px'})
        ])),
        animate('0s', keyframes([
          style({ boxShadow: 'none' }),
          style({ boxShadow: boxShadow })
        ]))
      ])
    ]),
    trigger('separator', [
      state('spliced', style({height: '16px'})),
      state('joined', style({height: 0})),
      transition('void => spliced', [animate('.5s .2s ease')]),
      transition('spliced => joined', [animate('.5s ease')])
    ])
  ],
  outputs: ['done'] // https://github.com/angular/angular/issues/5415
})
export class Step3 extends AbstractStep {
  state = 'void';

  constructor () { super(3); }

  play() {
    this.state = 'spliced';

    return this.timeout.$promise(1500)
      .then(() => {
        this.state = 'joined';

        return this.timeout.$promise(1000);
      });
  }
}