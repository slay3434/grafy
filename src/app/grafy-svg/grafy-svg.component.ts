import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafy-svg',
  templateUrl: './grafy-svg.component.html',
  styleUrls: ['./grafy-svg.component.css']
})
export class GrafySvgComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selected: any=null;
  selectedX: any=0;
  selectedY: any=0;
  g_mousedown(event: any){
    
   // for(let i in event)
     // console.log(i+": "+event[i]);

   // console.log("id:"+event['target'].id);

    this.selected = document.getElementById(event['target'].id);
    
    for(let i in this.selected['cx'])
      console.log(i+": "+this.selected[i]);
    // this.selectedX = event.offsetX;
    // this.selectedY = event.offsetY;

  }

  g_mousemove(event: any){
    if(this.selected!= null){
      this.selected.attr({cx: 60, cy: 60});
    }

  }

}
