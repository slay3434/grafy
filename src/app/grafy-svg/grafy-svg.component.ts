import { Component,AfterViewInit,OnInit, Input,ViewChild, EventEmitter, Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import * as $ from 'jquery'
import { SelectorContext } from '@angular/compiler';
//import { parse } from 'path';

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
    
    //$("#wasl2").animate({cx:50},1000);
    var z = this.s.select('#wasl3');
    z.transform("r45");
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

  isDrawing= false;

  g_mousedown(event: any){

    if(event['target'].id!=""){

      this.startX = event.offsetX*(this.scale);
      this.startY = event.offsetY*(this.scale);

      if(event['target'].id=="svgCanvas"){
        if(this.selectedShape!=null){
        // this.isDrawing = true;
          this.drawElement(event);
        }
      }
      else{

        this.selected = document.getElementById(event['target'].id);
        
        //wyciaga element na wierzch
        this.s.append(this.selected);

        if(this.selected.tagName!=null){
          switch(this.selected.tagName){
            case 'circle':
              //let tmpdist = Math.sqrt(Math.pow(event.offsetX-parseInt($("#"+this.selected.id).attr("cx")),2)+Math.pow(event.offsetY-parseInt($("#"+this.selected.id).attr("cy")),2));
              //*(1/this.scale)
             // let tmpdist = this.getLength(this.startX,this.startY,parseInt($("#"+this.selected.id).attr("cx")),parseInt($("#"+this.selected.id).attr("cy")));
             let tmpdist = this.getLength(this.startX,this.startY,parseInt(this.s.select("#"+this.selected.id).attr("cx"))*(this.scale),parseInt(this.s.select("#"+this.selected.id).attr("cy"))*(this.scale));
              //let tmpr = parseInt($("#"+this.selected.id).attr("r"));
              let tmpr = parseInt(this.s.select("#"+this.selected.id).attr("r"));
              console.log(tmpdist+"    "+tmpr + "    "+this.s.select("#"+this.selected.id).attr("cx"));
              if(tmpdist>tmpr-3 && tmpdist<tmpr+3){    
                this.resize = true;
              }
              break;
            case 'rect':
            if(this.isOnRectangleBorder(event)){
              this.resize = true;
            }
          }

        }      
      }
    }

  }

  g_mousemove(event: any){

    
  
    if(this.selected!= null){
      let x = (Math.max(this.startX,event.offsetX)-Math.min(this.startX,event.offsetX))*Math.sign(event.offsetX-this.startX)
      let y = (Math.max(this.startY,event.offsetY)-Math.min(this.startY,event.offsetY))*Math.sign(event.offsetY-this.startY)
      if(this.resize){
        if(this.selected.tagName!=null)
        switch(this.selected.tagName.toLowerCase()){
          case 'circle':
            let tmpr =  parseInt($("#"+this.selected.id).attr("r"));
            if((tmpr+x)>5 && (tmpr+x)<$("#svgCanvas").width())
              $("#"+this.selected.id).attr({r:tmpr+x});
            break;
          case 'rect':
           
              let w =  parseInt($("#"+this.selected.id).attr("width"));
              let h =  parseInt($("#"+this.selected.id).attr("height"));
              if(((w+x)>5 && (w+x<$("#svgCanvas").width())) && (((h+y)>5 && (h+y)<$("#svgCanvas").height())))
                $("#"+this.selected.id).attr({width:w+x, height:h+y});
            
            break;

        
        }

      }
      else{      

        // this.startX =event.offsetX;
        // this.startY =event.offsetY;
        if(this.selected.tagName!=null)
        switch(this.selected.tagName.toLowerCase()){
          case 'circle':
             let tmpcx =  parseInt($("#"+this.selected.id).attr("cx"));
             let tmpcy =   parseInt($("#"+this.selected.id).attr("cy"));
             $("#"+this.selected.id).attr({cx:tmpcx+x, cy: tmpcy+y});
              
              //(this.s.select("#"+this.selected.id)).transform("translate("+(tmpcx+x)+","+(tmpcy+y)+")");
            break;
          case 'rect':
            let tmprx =  parseInt($("#"+this.selected.id).attr("x"));
            let tmpry =   parseInt($("#"+this.selected.id).attr("y"));
            $("#"+this.selected.id).attr({x:tmprx+x, y: tmpry+y});
          break;
        }
      }
    }
    else if(this.selectedShape!=null && this.isDrawing){

      this.drawElement(event);
    }
   

    this.startX =event.offsetX;
    this.startY =event.offsetY;
  }

  g_mouseup(event: any){
    this.selected = null;
    this.resize = false;

    if(this.isDrawing){
      this.isDrawing = false;
    }

  }

 
  g_mousedblclick(event: any){

    this.test('double'); 
     
  }

  scale: number=1;
  g_mousewheel(event: any){
    //console.log(event);
    if(event['wheelDelta']>0){
      this.scale +=0.1; 
    }
    else
      if(this.scale>0.2)
       this.scale -=0.1;

      this.scale =  Math.round(this.scale * 100) / 100

      console.log(this.scale+" wdelta"+event['wheelDelta']);
    var ff = this.s.selectAll('*');
    ff.forEach(element => {
      element.transform('s'+this.scale);
    });
    //this.s.transform('s'+this.scale);
  }

  selectedShape: any=null;

  drawElement(event: any){
    //console.log(this.s.len(this.startX, this.startY, event.offsetX, event.offsetY));
    let shape: any;
    if(true)
    switch(this.selectedShape){
      case 'circle':
        //shape = this.s.circle(this.startX, this.startY, this.getLength(this.startX, this.startY, event.offsetX, event.offsetY));
        shape = this.s.circle(this.startX, this.startY,30);
        // shape.attr({"id":"id_"+Date.now(),"fill":'white', 'stroke': 'skyblue', 'stroke-width':2});
        break;
      case 'rect':
        shape = this.s.rect(this.startX,this.startY, 40,30);
        // shape.attr({"id":"id_"+Date.now(), style:"fill='white';stroke='skyblue';stroke-width=2"});
        break;
    }

    
    //shape.attr("fill",'none');
    shape.attr({"id":"id_"+Date.now(),"fill":'white', 'stroke': 'skyblue', 'stroke-width':2});

    this.addMouseListeners(shape);
    this.s.add(shape);
    this.selected = shape;
    this.isDrawing = false;
    this.selectedShape = null;
    this.resize = true;

    this.selected.transform('s'+this.scale);

  }

  test(value: any){
    if(value!=null)
      console.log(value);
    else{
      //console.log(this.selectedShape);
      //var z = this.s.scale(10);
      // var zz = new Snap.Matrix();
      // zz.scale(0.4);
    var ff = this.s.selectAll('*');
    ff.forEach(element => {
      element.transform('S0.4');
    });
      //ff.transform('s0.4');

      //this.newCircle();
    }
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
   this.addMouseListeners(c);

  }

  addMouseListeners(object:any){
 
    object.dblclick((e: any)=>{this.g_mousedblclick(e)});
    object.mousedown((e: any)=>{this.g_mousedown(e)});
  }

  wyczysc(){
    this.s.clear();
  }


  //#region help functions

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getLength(x1:number,y1:number, x2:number, y2:number){
    let rez = Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));

    return rez;
  }


  isOnRectangleBorder(event: any){
    let w =  parseInt($("#"+this.selected.id).attr("width"))*(1/this.scale);
    let h =  parseInt($("#"+this.selected.id).attr("height"))*(1/this.scale);
    let x =  parseInt($("#"+this.selected.id).attr("x"))*(1/this.scale);
    let y =  parseInt($("#"+this.selected.id).attr("y"))*(1/this.scale);

    let cx = event.offsetX*(1/this.scale);
    let cy = event.offsetY*(1/this.scale);

    let rez = false;
    console.log((x+w)+"    "+(y+h) +"   "+cx+"    "+cy);
    if(
      (((cy>(y-3))&&(cy<(y+h+3)))&&((cx>(x+w-3))&&(cx<(x+w+3)))) 
      ||
      (((cy>(y+h-3))&&(cy<(y+h+3)))&&((cx>(x-3))&&(cx<(x+w+3))))
    )
    rez = true;

    return rez;
  }

  //#endregion

}
