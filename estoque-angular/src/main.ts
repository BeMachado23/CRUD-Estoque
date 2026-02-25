import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // Nome corrigido aqui

bootstrapApplication(AppComponent, appConfig) // Nome corrigido aqui
  .catch((err) => console.error(err));
