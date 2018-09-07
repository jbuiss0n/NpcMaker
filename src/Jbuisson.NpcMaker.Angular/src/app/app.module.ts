import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BootstrapComponent } from './bootstrap.component';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import * as Shared from './shared';
import * as Characters from './characters';

@NgModule({
  imports: [
    BrowserModule,
    Characters.CharactersModule,
    Shared.SharedModule,
    RouterModule.forRoot([
      ...AppRoutes
    ]),
  ],
  declarations: [
    AppComponent,
    BootstrapComponent,
  ],
  providers: [],
  bootstrap: [BootstrapComponent],
})
export class AppModule { }
