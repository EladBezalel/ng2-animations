import {Component, animation, state, style, transition, animate, group} from "@angular/core";
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
    <div class="container" @container="state">
      <div class="item" @trigger1="state"></div>
      <div @separator="state"></div>
      <div class="item" @trigger2="state"></div>
    </div>
  `,
  animations: [
    animation('trigger1', [
      state('spliced', style({ borderRadius: '3px', boxShadow: boxShadow })),
      state('joined', style({ borderRadius: '3px 0 3px 0x' })),
      transition('void => spliced', [
        style({ boxShadow: boxShadow }),
        animate('1s ease')
      ]),
      transition('spliced => joined', [
        animate('1s ease', [
          style({ borderRadius: '3px' }),
          style({ borderRadius: '0' })
        ])
      ])
    ]),
    animation('trigger2', [
      state('void', style({ boxShadow: `-8px 0 0 white, ${boxShadow}` })),
      state('spliced', style({ borderRadius: '3px', boxShadow: boxShadow })),
      state('joined', style({ borderRadius: '0 3px 0 3px' })),

      transition('void => spliced', [
        animate('.5s', [
          style({ borderRadius: '0' }),
          style({ borderRadius: '3px' })
        ]),
        animate('0s', [
          style({ boxShadow: boxShadow }),
          style({ boxShadow: `-8px 0 0 white, ${boxShadow}` })
        ])
      ]),
      transition('spliced => joined', [
        group([
          animate('1s ease', [
            style({ borderRadius: '3px' }),
            style({ borderRadius: '0' })
          ]),
          animate('1s ease', [
            style({ boxShadow: `0px 0 0 white, ${boxShadow}` }),
            style({ boxShadow: `-8px 0 0 white, ${boxShadow}` })
          ])
        ])
      ])
    ]),
    animation('container', [
      state('spliced', style({ width: '728px', boxShadow: 'none' })),
      state('joined', style({ width: '300px', overflow: 'hidden' })),

      transition('void => spliced', [
        style({ boxShadow: 'none' }),
        animate('2s ease')
      ]),
      transition('spliced => joined', [
        animate('.5s ease-in', [
          style({ width: '728px' }),
          style({ width: '600px' })
        ]),
        animate('.5s ease-out', [
          style({ width: '600px' }),
          style({ width: '300px' }),
        ])
      ])
    ]),
    animation('separator', [
      state('spliced', style({width: '128px'})),
      state('joined', style({width: 0})),
      transition('void => spliced', [animate('1s .5s ease')]),
      transition('spliced => joined', [animate('.5s ease-in-out')])
    ])
  ]
})
export class Step2 extends AbstractStep {
  constructor() { super(2); }

  /**
   * Component animated play
   */
  play() {
    this.state = 'spliced';
    return this.delay(1500)
      .then(() => {
        this.state = 'joined';
        return this.delay(1000);
      });
  }
}
