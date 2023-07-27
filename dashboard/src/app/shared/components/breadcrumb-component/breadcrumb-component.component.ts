import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { ReportDrilldownService } from 'src/app/core/services/report-drilldown/report-drilldown.service';

@Component({
  selector: 'app-breadcrumb-component',
  templateUrl: './breadcrumb-component.component.html',
  styleUrls: ['./breadcrumb-component.component.scss']
})
export class BreadcrumbComponentComponent implements OnInit {

  rbacDetails: any;
  baseRbacDetails: any;
  selectedRole: any;
  linkedReports: any;
  originalDetails: any;

  constructor(private _rbacService: RbacService, private readonly _reportDrilldownService: ReportDrilldownService) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails
      this.originalDetails = rbacDetails
      this.selectedRole = rbacDetails.role
    })
    this._reportDrilldownService.drilldownData.subscribe(data => {
      if (data && data === 'reset') {
        this._reportDrilldownService.emit(null)
        this.rbacDetails = {
          ...this.originalDetails
        }
      }
      else if (data) {
        this.linkedReports = data?.linkedReports ? data?.linkedReports : this.linkedReports
        this.updateBreadcrumb(data);
      }
    })
  }

  ngOnInit(): void {
  }

  drilldown(hierarchyLevel: any) {

    if (Number(hierarchyLevel) >= Number(this.selectedRole) && Number(hierarchyLevel) < this.rbacDetails.role) {
      let breadCrumbDrillDownDetails: any = {
        linkedReports: this.linkedReports,
        hierarchyLevel: hierarchyLevel
      };

      if (Number(hierarchyLevel) >= 1) {
        breadCrumbDrillDownDetails = {
          ...breadCrumbDrillDownDetails,
          id: this.rbacDetails['state'],
          state: this.rbacDetails['state'],
          state_name: this.rbacDetails['state_name']
        }
      }
      if (Number(hierarchyLevel) >= 2) {
        breadCrumbDrillDownDetails = {
          ...breadCrumbDrillDownDetails,
          id: this.rbacDetails['district'],
          district: this.rbacDetails['district'],
          [this.rbacDetails['district']]: this.rbacDetails[this.rbacDetails['district']],
        }
      }
      if (Number(hierarchyLevel) >= 3) {
        breadCrumbDrillDownDetails = {
          ...breadCrumbDrillDownDetails,
          id: this.rbacDetails['block'],
          block: this.rbacDetails['block'],
          [this.rbacDetails['block']]: this.rbacDetails[this.rbacDetails['block']],
        }
      }
      if (Number(hierarchyLevel) >= 4) {
        breadCrumbDrillDownDetails = {
          ...breadCrumbDrillDownDetails,
          id: this.rbacDetails['cluster'],
          cluster: this.rbacDetails['cluster'],
          [this.rbacDetails['cluster']]: this.rbacDetails[this.rbacDetails['cluster']],
        }
      }
      if (Number(hierarchyLevel) === 5) {
        breadCrumbDrillDownDetails = {
          ...breadCrumbDrillDownDetails,
          id: this.rbacDetails['school'],
          school: this.rbacDetails['school'],
          [this.rbacDetails['school']]: this.rbacDetails[this.rbacDetails['school']],
        }
      }
      this.rbacDetails = {
        ...breadCrumbDrillDownDetails
      }
      this._reportDrilldownService.emit(this.rbacDetails)

      // this.updateBreadcrumb(breadCrumbDrillDownDetails)
    }
  }

  updateBreadcrumb(details: any) {
    let { hierarchyLevel, id } = details ?? {}
    let breadCrumbDrillDownDetails: any = {
      ...this.rbacDetails,
      role: hierarchyLevel
    };

    if (Number(hierarchyLevel) === 1) {
      breadCrumbDrillDownDetails = {
        ...breadCrumbDrillDownDetails,
        state: id,
        state_name: details?.['state_name']
      }
    }
    else if (Number(hierarchyLevel) === 2) {
      breadCrumbDrillDownDetails = {
        ...breadCrumbDrillDownDetails,
        district: id,
        [id]: details?.['district_name'] ? details?.['district_name'] : this.rbacDetails[id],
      }
    }
    else if (Number(hierarchyLevel) === 3) {
      breadCrumbDrillDownDetails = {
        ...breadCrumbDrillDownDetails,
        block: id,
        [id]: details?.['block_name'] ? details?.['block_name'] : this.rbacDetails[id]
      }
    }
    else if (Number(hierarchyLevel) === 4) {
      breadCrumbDrillDownDetails = {
        ...breadCrumbDrillDownDetails,
        cluster: id,
        [id]: details?.['cluster_name'] ? details?.['cluster_name'] : this.rbacDetails[id]
      }
    }
    else if (Number(hierarchyLevel) === 5) {
      breadCrumbDrillDownDetails = {
        ...breadCrumbDrillDownDetails,
        school: id,
        [id]: details?.['school_name'] ? details?.['school_name'] : this.rbacDetails[id]
      }
    }
    this.rbacDetails = {
      ...breadCrumbDrillDownDetails
    }
  }

  checkActive(level: any) {
    return (Number(level) >= Number(this.selectedRole) && Number(level) < this.rbacDetails.role)
  }

}