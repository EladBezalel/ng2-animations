import {Component, animation, state, style, transition, animate} from '@angular/core';

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
    .end-item {
      box-shadow: 0 2px 4px -1px rgba(0,0,0,.2),
                  0 4px 5px 0 rgba(0,0,0,.14),
                  0 1px 10px 0 rgba(0,0,0,.12);
      border-radius: 3px;
    }
  `],
  template: `
    <div class="container" @container="state">
      <div class="item" @item="state"></div>
      <div @separator="state"></div>
      <div class="item" @item="state"></div>
    </div>
  `,
  animations: [
    animation('item', [
      state('start', style({
        borderRadius: '3px',
        boxShadow: '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)'
      })),
      state('end', style({
        borderRadius: '3px',
        boxShadow: '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)'
      })),
      transition('void => end', [
        animate('1s .5s ease')
      ]),
      transition('end => start', [
        animate('1s ease')
      ])
    ]),
    animation('container', [
      state('start', style({
        width: '600px',
        boxShadow: 'none'
      })),
      state('end', style({
        width: '728px',
        boxShadow: 'none'
      })),
      transition('void => end', [
        animate('2s ease')
      ]),
      transition('end => start', [
        animate('1s ease')
      ])
    ]),
    animation('separator', [
      state('start', style({
        width: 0
      })),
      state('end', style({
        width: '128px'
      })),
      transition('void => end', [
        animate('.6s .7s ease')
      ]),
      transition('end => start', [
        animate('1s ease')
      ])
    ])
  ]
})

export class Step2 {
  state = 'end';

  // constructor () {
  //   setTimeout(() => {
  //     this.state = 'start'
  //   }, 1000)
  // }
}