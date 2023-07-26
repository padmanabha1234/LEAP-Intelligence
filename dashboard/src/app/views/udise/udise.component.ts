
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { config } from './config/udise_config';

@Component({
    selector: 'app-udise',
    templateUrl: './udise.component.html',
    styleUrls: ['./udise.component.scss']
})
export class UdiseComponent implements OnInit {
    loadTabs = false;
    rbacDetails: any;
    tabIndex;
    selectedTabLabel;
    tabs: any = [];
    programName : any = 'udise'
    
constructor(private route: ActivatedRoute, private _rbacService: RbacService, private _commonService: CommonService) { 
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
        this._commonService.getMetaData(this.programName).subscribe()
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
