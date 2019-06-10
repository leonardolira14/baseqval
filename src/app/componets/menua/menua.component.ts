import { Component, OnInit } from '@angular/core';

import { environment} from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menua',
  templateUrl: './menua.component.html',
  styleUrls: ['./menua.component.scss']
})
export class MenuaComponent implements OnInit {
  public ruta_server = environment.urlserverp;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goto(ir) {
    this.router.navigateByUrl('/' + ir);
  }
  gotop(id: string) {
    
  }
}
