import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GrafyComponent } from './grafy/grafy.component';

import * as $ from 'jquery';
import { GrafySvgComponent } from './grafy-svg/grafy-svg.component'


@NgModule({
  declarations: [
    AppComponent,
    GrafyComponent,
    GrafySvgComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
