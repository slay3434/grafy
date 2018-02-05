import { Component,AfterViewInit,OnInit, Input,ViewChild, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as $ from 'jquery'

@Component({
  selector: 'app-grafy-svg',
  templateUrl: './grafy-svg.component.html',
  styleUrls: ['./grafy-svg.component.css']
})
export class GrafySvgComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
  }

  selected: any=null;
  startX: any=0;
  startY: any=0;
  g_mousedown(event: any){
    
   // for(let i in event)
     // console.log(i+": "+event[i]);

   // console.log("id:"+event['target'].id);

    this.selected = document.getElementById(event['target'].id);
    
    // for(let i in this.selected['cx'])
    //   console.log(i+": "+this.selected[i]);

     this.startX = event.offsetX;
     this.startY = event.offsetY;

  }

  g_mousemove(event: any){
    if(this.selected!= null){


      
      let x = (Math.max(this.startX,event.offsetX)-Math.min(this.startX,event.offsetX))*Math.sign(event.offsetX-this.startX)
      let y = (Math.max(this.startY,event.offsetY)-Math.min(this.startY,event.offsetY))*Math.sign(event.offsetY-this.startY)

     
      this.startX =event.offsetX;
      this.startY =event.offsetY;

      
      let tmpx =  parseInt($("#"+this.selected.id).attr("cx"));
      let tmpy =   parseInt($("#"+this.selected.id).attr("cy"));
      //console.log("tmpx-"+tmpx+", tmpy-"+tmpy);

      $("#"+this.selected.id).attr({cx:tmpx+x, cy: tmpy+y});
 
    }

  }

  g_mouseup(event: any){
    this.selected = null;
  }

}
