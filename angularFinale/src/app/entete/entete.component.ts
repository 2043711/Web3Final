import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css']
})
export class EnteteComponent {

  constructor(private router: Router) {}


  changePage(page: string) {
    this.router.navigate(["/" + page + ""]);
  }
}
