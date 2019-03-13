import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  constructor(public router:Router) {
    this.cargarStorage();
   }

  ngOnInit() {
  }
  cargarStorage(){
    if(!localStorage.usuarioqval){
      this.router.navigateByUrl('/');
    }
  }
}
