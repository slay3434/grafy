import { Component,ViewChild, AfterViewInit,OnInit } from '@angular/core';
import {GrafyComponent} from './grafy/grafy.component'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as $ from 'jquery'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit  {
  title = 'app';

  jakas_tresc = "gg";

ngAfterViewInit(){
 // this.graf = new GrafyComponent();

}

  public zmien(){
    console.log("z apki");  
//     this.graf.showText("ghntnbt");
// this.graf.jakas_tresc = "jjjjjjj";
   this.jakas_tresc="kkk";
   //$("#aa").html("kkkkkkkk");
this.graf.zz(); 
this.graf.jakas_tresc=(Math.random()*1000).toString();
  }


  //@ViewChild('app-grafy') graf: GrafyComponent;
  @ViewChild(GrafyComponent) graf;

  showsign(tresc: string){
    console.log(tresc);
  }

  rysujprostokat(){
    let x = 300*Math.random();
    let y = 300*Math.random();
    let r = 50*Math.random();

    this.graf.drawrect(x,y,r,r);
  }

}

