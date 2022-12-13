import { bootstrapApplication } from '@angular/platform-browser';
import { TMSComponent } from './app/tms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(TMSComponent, {
    providers: [importProvidersFrom(BrowserAnimationsModule)]
});
