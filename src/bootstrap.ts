import { bootstrap } from '@angular/platform-browser-dynamic';
import { Orchestrator } from './orchestrator.view';

bootstrap(Orchestrator, [])
  .catch(err => console.error(err));
