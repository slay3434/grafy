import { Component,AfterViewInit,OnInit, Input,ViewChild, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as $ from 'jquery'

//import * as snap from 'snapsvg'
//import "snapsvg";
//declare var Snap: any;

declare var Snap: any;
declare var mina: any;

@Component({
  selector: 'app-grafy-svg',
  templateUrl: './grafy-svg.component.html',
  styleUrls: ['./grafy-svg.component.css']
})
export class GrafySvgComponent implements OnInit, AfterViewInit {

  s :any;
  constructor() {
   
   }


 
  ngOnInit() {
    this.s = Snap("#svgCanvas");
    //const s = Snap("#svgCanvas");
     //const c = this.s.circle(50, 50, 10);

    //var img = svg("svgCanvas");
  }

  ngAfterViewInit(){
  }

  selected: any=null;
  startX: any=0;
  startY: any=0;
  resize: boolean = false;
  g_mousedown(event: any){
    
   // for(let i in event)
     // console.log(i+": "+event[i]);

    //console.log("id:"+event['target'].id);

    this.selected = document.getElementById(event['target'].id);

    // for(let i in this.selected['cx'])
    //   console.log(i+": "+this.selected[i]);


    let tmpdist = Math.sqrt(Math.pow(event.offsetX-parseInt($("#"+this.selected.id).attr("cx")),2)+Math.pow(event.offsetY-parseInt($("#"+this.selected.id).attr("cy")),2));
    let tmpr = parseInt($("#"+this.selected.id).attr("r"));
    if(tmpdist>tmpr-3 && tmpdist<tmpr+3){    
      this.resize = true;
    }


     this.startX = event.offsetX;
     this.startY = event.offsetY;

  }

  g_mousemove(event: any){

    if(this.selected!= null){
      let x = (Math.max(this.startX,event.offsetX)-Math.min(this.startX,event.offsetX))*Math.sign(event.offsetX-this.startX)
      let y = (Math.max(this.startY,event.offsetY)-Math.min(this.startY,event.offsetY))*Math.sign(event.offsetY-this.startY)
      if(this.resize){
        let tmpr =  parseInt($("#"+this.selected.id).attr("r"));
        if((tmpr+x)>5)
          $("#"+this.selected.id).attr({r:tmpr+x});
    
      }
      else{      

        this.startX =event.offsetX;
        this.startY =event.offsetY;

        
        let tmpx =  parseInt($("#"+this.selected.id).attr("cx"));
        let tmpy =   parseInt($("#"+this.selected.id).attr("cy"));
        //console.log("tmpx-"+tmpx+", tmpy-"+tmpy);

        $("#"+this.selected.id).attr({cx:tmpx+x, cy: tmpy+y});
      }
    }

  }

  g_mouseup(event: any){
    this.selected = null;
    this.resize = false;
  }

  newCircle(){
    //var circle = document.createElement("circle")
 
    // $("circle").attr("r",30)
    // .attr("cx", 250*Math.random())
    // .attr("cy",250*Math.random());
    
    //$("<circle />").attr({id:"id_"+Date.now(), "r":30, "cx": Math.round(25*Math.random())+100, "cy":Math.round(50*Math.random())+100,stroke:"green", "stroke-width":"4", fill:"yellow"}).appendTo("#svgCanvas");    
   //$("#svgCanvas").append("circle").attr({id:"id_"+Date.UTC, "r":30, "cx": Math.round(250*Math.random()), "cy":Math.round(250*Math.random())});

   var c = this.s.circle(Math.round(250*Math.random())+10, Math.round(250*Math.random())+10, 30);
   c.attr("id","id_"+Date.now());
   c.attr("fill", this.getRandomColor());
   c.mousedown((e: any)=>{this.g_mousedown(e)});

  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
