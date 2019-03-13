import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caddreporte',
  templateUrl: './caddreporte.component.html',
  styleUrls: ['./caddreporte.component.scss']
})
export class CaddreporteComponent implements OnInit {
	x:number=0;
	y:number=0;
  constructor() { }

  ngOnInit() {
  }
   dragEnd(event) {
   	
    console.log('Element was dragged', event);
  }

}
