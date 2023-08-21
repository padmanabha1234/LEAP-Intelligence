import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { config } from './config/student_statistics_config';

@Component({
  selector: 'app-student-statistics',
  templateUrl: './student-statistics.component.html',
  styleUrls: ['./student-statistics.component.scss']
})
export class StudentStatisticsComponent implements OnInit {
  loadTabs = false;
  rbacDetails: any;
  tabIndex;
  selectedTabLabel;
  tabs: any = [];
  
constructor(private route: ActivatedRoute, private _rbacService: RbacService) { 
    this.route.queryParams.subscribe((param: any) => {
      this.tabIndex = param.tab ? Number(param.tab) : 0;
    })
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails;
    })
    let allTabs = [...Object.keys(config)]
    allTabs.forEach((tab: any) => {
      config?.[tab]?.filters?.every((filter) => {
        if((Number(filter?.hierarchyLevel) === this.rbacDetails?.role) || this.rbacDetails?.role === 0){
          if(!(this.tabs.includes(config?.[tab]?.label))){
            this.tabs.push(config?.[tab]?.label)
          }
          return false
        }
        return true
      })
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.selectedTabLabel = this.tabs.length > 0 ? this.tabs[0] : undefined
    });
  }

  onTabChanged($event: any): void {
    this.selectedTabLabel = $event?.tab?.textLabel;
    this.tabIndex = $event.index;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

}
