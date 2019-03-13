import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-cgraficas',
  templateUrl: './cgraficas.component.html',
  styleUrls: ['./cgraficas.component.scss']
})
export class CgraficasComponent implements OnInit {

  constructor( private _route:ActivatedRoute ) {
  console.log(this._route.snapshot.paramMap.get('id'));
   }

  ngOnInit() {
  }

}
