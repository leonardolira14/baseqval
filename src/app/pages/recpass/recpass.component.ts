import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConectService } from 'src/app/services/conect.service';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-recpass',
  templateUrl: './recpass.component.html',
  styleUrls: ['./recpass.component.scss']
})
export class RecpassComponent implements OnInit {
  correo:string;
  constructor(private http:ConectService,public router:Router,public spinner:NgxSpinnerService) {
    this.correo="";
   }
    
  ngOnInit() {
  }
  reccontra(){
    this.spinner.show();
    this.http.recuperapas(this.correo)
    .subscribe((res)=>{
      this.spinner.hide();
      if(res["pass"]!=0){
        $(".alert-loginsuces").addClass("show").html(' <strong>Error! </strong>'+res["ok"]+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(()=>{
          $(".alert-loginsuces").removeClass("show");
        },4000)

      }else{
        this.spinner.hide();
        $(".alert-login").addClass("show").html(' <strong>Error! </strong>'+res["ok"]+'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        setTimeout(()=>{
          $(".alert-login").removeClass("show");
        },4000)
      }
    },(error)=>{

    })
  }
  login(){
    this.spinner.show();
    this.router.navigateByUrl('/');
  }
}
