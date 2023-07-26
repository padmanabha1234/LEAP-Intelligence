import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  flaskapi: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.flaskapi = this.sanitizer.bypassSecurityTrustResourceUrl(environment.flaskAPI);
   }

  ngOnInit(): void {

  }
}
