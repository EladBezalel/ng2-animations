/* Import styles */
import '!style!css!less!./main.less';

/* Import all required libraries */
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'hammerjs';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { Orchestrator } from './components/orchestrator';

@NgModule({

  imports: [
    BrowserModule
  ],

  declarations: [Orchestrator],
  bootstrap: [Orchestrator]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);