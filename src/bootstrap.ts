import {bootstrap} from '@angular/platform-browser-dynamic';
import {Orchestrator} from './orchestrator';

bootstrap(Orchestrator, [])
  .catch(err => console.error(err));