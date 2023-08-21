import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  constructor(private readonly _router: Router) { }

  ngOnInit(): void {
  }

  setCategory(category, url): void {
    localStorage.setItem('category', category)
    this._router.navigate([`/${url}`])
  }

}
