import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements  OnInit {
  title = 'reduximplementation';
  logged = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
  if (localStorage.getItem('logged')) {
    this.logged = true;
  }
  this.router.events.subscribe(event => {
      if (event instanceof  NavigationEnd) {
        if (!localStorage.getItem('logged')) {
          this.logged = false;
        } else {
          this.logged = true;

        }
      }});

  }
}
