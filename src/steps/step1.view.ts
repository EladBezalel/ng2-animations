import {animation, style, animate, state, transition, group, Component} from "@angular/core";
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
    <div class="item" @trigger="status"></div>
  `,
  animations: [
    animation('trigger', [
      state('void', style({
        height: '0px',
        width: '200px',
        borderRadius: '0px'
      })),
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
        style({
          borderRadius: '30px',
        }),
        animate('.6s ease')
      ]),
      transition('active => turned', [
        group([
          animate('.8s ease', [
            style({ transform: 'rotate(-90deg)' }),
            style({ transform: 'rotate(0deg)'}),
          ]),
          animate('.5s .2s ease', [
            style({ width: '300px' }),
            style({ width: '600px' })
          ])
        ])
      ])
    ]),
  ]
})
export class Step1 extends AbstractStep {
  constructor() { super( 1 ); }

  /**
   *
   */
  play() {
    this.state = 'active';

    return this.delay(500)
      .then(() => {
        this.state = 'turned';
        return this.delay(600);
      })
  }
}
