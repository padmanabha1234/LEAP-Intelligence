import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leap-alerts-tab',
  templateUrl: './leap-alerts-tab.component.html',
  styleUrls: ['./leap-alerts-tab.component.scss']
})
export class LeapAlertsTabComponent implements OnInit {
  flaskapi: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.flaskapi = this.sanitizer.bypassSecurityTrustResourceUrl(environment.flaskAPI);
   }

  ngOnInit(): void {

  }




}
