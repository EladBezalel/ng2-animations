import {Component, trigger, keyframes, state, style, transition, animate, group} from "@angular/core";
import {AbstractStep} from "./step.abstract";

var boxShadow = '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)';
@Component({
  selector: 'step-2',
  styles: [`
    .container {
      width: 600px;
      height: 300px;
      display: flex;
      flex-direction: row;
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
      <div class="item" [@item1]="state"></div>
      <div [@separator]="state"></div>
      <div class="item" [@item2]="state"></div>
    </div>
  `,
  animations: [
    trigger('item1', [
      state('spliced', style({ borderRadius: '3px', boxShadow: boxShadow })),
      state('joined', style({ borderRadius: '3px 0 3px 0x' })),
      transition('void => spliced', [
        style({ boxShadow: boxShadow }),
        animate('0.3s')
      ]),
      transition('spliced => joined', [
        animate('1s ease', keyframes([
          style({ borderRadius: '3px' }),
          style({ borderRadius: '0' })
        ]))
      ])
    ]),
    trigger('item2', [
      state('void', style({ boxShadow: `-8px 0 0 white, ${boxShadow}` })),
      state('spliced', style({ borderRadius: '3px', boxShadow: boxShadow })),
      state('joined', style({ borderRadius: '0 3px 0 3px' })),

      transition('spliced => joined', [
        group([
          animate('1s ease', keyframes([
            style({ borderRadius: '3px' }),
            style({ borderRadius: '0' })
          ])),
          animate('1s ease', keyframes([
            style({ boxShadow: `0px 0 0 white, ${boxShadow}` }),
            style({ boxShadow: `-8px 0 0 white, ${boxShadow}` })
          ]))
        ])
      ])
    ]),
    trigger('container', [
      state('spliced', style({ width: '664px', boxShadow: 'none' })),
      state('joined', style({ width: '300px', overflow: 'hidden' })),

      transition('void => spliced', [
        style({ boxShadow: 'none' }),
        animate('.5s ease-out')
      ]),
      transition('spliced => joined', [
        animate('.5s ease-in', keyframes([
          style({ width: '664px' }),
          style({ width: '600px' })
        ])),
        animate('.5s ease-out', keyframes([
          style({ width: '600px' }),
          style({ width: '300px' }),
        ]))
      ])
    ]),
    trigger('separator', [
      state('spliced', style({width: '64px'})),
      state('joined', style({width: 0})),
      transition('void => spliced', [animate('.5s ease-out')]),
      transition('spliced => joined', [animate('.5s ease-in-out')])
    ])
  ],
  outputs: ['done'] // https://github.com/angular/angular/issues/5415
})

export class Step2 extends AbstractStep {
  state = 'void';

  constructor() { super(2); }

  play() {
    this.state = 'spliced';

    return this.timeout.$promise(700)
      .then(() => {
        this.state = 'joined';

        return this.timeout.$promise(1000);
      });
  }
}