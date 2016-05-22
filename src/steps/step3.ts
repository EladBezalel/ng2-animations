import {Component, animation, state, style, transition, animate, group} from "@angular/core";
import {AbstractStep} from "./AbstractStep";

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
    <div class="container" @container="state">
      <div class="item" @item="state"></div>
      <div @separator="state"></div>
      <div class="item" @item="state"></div>
      <div @separator="state"></div>
      <div class="item" @item="state"></div>
      <div @separator="state"></div>
      <div class="item" @item="state"></div>
    </div>
  `,
  animations: [
    animation('item', [
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
    animation('container', [
      state('spliced', style({ height: '348px', boxShadow: 'none' })),
      state('joined', style({ width: '300px', overflow: 'hidden' })),

      transition('void => spliced', [
        style({ boxShadow: 'none' }),
        animate('1s ease')
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
      state('spliced', style({height: '16px'})),
      state('joined', style({width: 0})),
      transition('void => spliced', [animate('.5s .3s ease')]),
      transition('spliced => joined', [animate('.5s ease-in-out')])
    ])
  ]
})
export class Step3 extends AbstractStep {
  state = 'void';

  constructor () { super(3); }

  play() {
    this.state = 'spliced';

    return this.timeout.$promise(1500)
      .then(() => {

        return this.timeout.$promise(1000);
      });
  }
}