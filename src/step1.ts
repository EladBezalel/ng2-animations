//our root app component
import {animation, style, animate, state, transition, Component, Input} from '@angular/core'

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
    <div class="item" @state="state"></div>
  `,
  animations: [
    animation('state', [
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
        style({
          transform: 'rotate(-90deg)'
        }),
        animate('.6s ease')
      ])
    ]),
  ]
})
export class Step1 {
  @Input() state;
}
