import { Component,AfterViewInit,OnInit, Input,ViewChild, EventEmitter, Output} from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as $ from 'jquery'
//import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-grafy',
  templateUrl: './grafy.component.html',
  styleUrls: ['./grafy.component.css']
})
export class GrafyComponent implements OnInit, AfterViewInit {

  ctx: any;
  constructor() {          
    //return this;   
  }

  @ViewChild("myCanvas") myCanvas;

  ngOnInit() {
    this.jakas_tresc = "ff";

  }

  ngAfterViewInit(){
    let canvas = this.myCanvas.nativeElement;
    this.ctx = canvas.getContext("2d");

    //this.myCanvas.on('click', (eventData: any) => { this.onClick.emit(eventData); });    
  }

  drawline(x1:number, y1: number, x2:number, y2:number){
    // let canvas = this.myCanvas.nativeElement;
    // let ctx = canvas.getContext("2d");
    this.ctx.moveTo(x1,y1);
    this.ctx.lineTo(x2,y2);
    this.ctx.stroke();
  }

  drawowal(x1:number, y1: number, x2:number, y2:number){

    let r = 10;
    let width = Math.max(Math.abs(x1),Math.abs(x2) ) - Math.min(Math.abs(x1),Math.abs(x2));
    let height =  Math.max(Math.abs(y1),Math.abs(y2) ) - Math.min(Math.abs(y1),Math.abs(y2));

    let x = x1;
    let y = y1;

    this.ctx.beginPath();				
    this.ctx.arc(x+r,y+r,r,1*Math.PI,1.5*Math.PI);
    this.ctx.arc(x-r+width,y+r,r,1.5*Math.PI,0*Math.PI);
    this.ctx.arc(x-r+width,y-r+height,r,0*Math.PI,0.5*Math.PI);
    this.ctx.arc(x+r,y-r+height,r,0.5*Math.PI,1*Math.PI);
    //ctx.arc(x+r,y+r,r,1*Math.PI,1.5*Math.PI);
    this.ctx.lineTo(x,y+r);
    
    this.ctx.fillStyle = 'blue';
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawrect(x1:number, y1: number, x2:number, y2:number){
    this.ctx.rect(x1,y1,x2,y2);
    this.ctx.stroke();
  }



  @Input() jakas_tresc: string;

  public showText(tresc: string){
    //this.jakas_tresc = tresc;
    console.log("z komponentu: "+this.jakas_tresc);
    this.zz();
    // $("#aa").html(tresc);
   // alert(tresc);
  }

  zz(){
    console.log('oooo');
    this.jakas_tresc = "ooooo";

   
    this.drawline(0,0,1000* Math.random(), 1000* Math.random());
  }



  
     @Output() doClick = new EventEmitter();

    
     canvasClick(){
       this.doClick.emit(event);
     }


     startpoint: startpoint = {x:0,y:0}; 
     gv_ismouseclick: boolean = false;
     g_mousedown(event: any){
      this.startpoint.x = event.offsetX;
      this.startpoint.y = event.offsetY;
      this.gv_ismouseclick = true;
     }

     g_mouseup(event: any){
      this.drawline(this.startpoint.x, this.startpoint.y, event.offsetX,event.offsetY);
      this.gv_ismouseclick = false;
     }

     g_mousemove(event: any){
       if(this.gv_ismouseclick){
        //this.doClick.emit(event);
        this.drawrect(event.offsetX,event.offsetY, 1,1);
       }
     }
  

}

interface startpoint {
  x: number;
  y: number;
}