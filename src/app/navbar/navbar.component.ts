import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {}
  logout() {
    sessionStorage.removeItem('email');
    window.location.href = 'http://localhost:4200/home';
  }
}
