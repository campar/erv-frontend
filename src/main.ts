import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
fetch('/assets/config.json')
  .then(response => response.json())
  .then(config => {
      environment.apiUrl = config.apiUrl; // Dynamically set the API URL
      bootstrapApplication(AppComponent, appConfig)
        .catch((err) => console.error(err));
  })
  .catch(err => {
      console.error('Error loading configuration:', err);
      // Optionally bootstrap with default values if config fails to load
      bootstrapApplication(AppComponent, appConfig)
        .catch((err) => console.error(err));
  });