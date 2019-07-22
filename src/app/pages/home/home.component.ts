import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public modal_cuestionario = false;
  public modal_reportes = false;
  public modal_grupos = false;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }
  goto(ir) {
    this.router.navigateByUrl('/' + ir);
  }
}
