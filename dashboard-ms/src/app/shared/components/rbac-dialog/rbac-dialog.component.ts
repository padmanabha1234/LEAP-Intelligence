import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common/common.service';
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { rbacConfig } from './rbacConfig';
import { environment } from 'src/environments/environment';
import { StateCodes, stateNames } from 'src/app/core/config/StateCodes';

@Component({
  selector: 'app-rbac-dialog',
  templateUrl: './rbac-dialog.component.html',
  styleUrls: ['./rbac-dialog.component.scss']
})
export class RbacDialogComponent implements OnInit {
  rbacForm: FormGroup;
  filters: any = [];
  selectedRoleLevel: any = 0;
  rbacRoles: any = rbacConfig.roles
  selectedRoleObject: any;
  rbacDetails: any;
  availableFilters: string = '';
  updatedForm: any;
  stateInfo: any;

  constructor(private fb: FormBuilder, private _commonService: CommonService, private _rbacService: RbacService, private router: Router) {
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails
      this.selectedRoleLevel = rbacDetails?.role
    })
    this.rbacForm = this.fb.group({
      state: [null],
      district: [null],
      block: [null],
      cluster: [null],
      school: [null],
      grade: [null]
    })
    let baseHierarchy;
    if (environment.config === 'VSK') {
      baseHierarchy = 2;
      this.setStateDetails(this.rbacDetails)
    }
    else {
      baseHierarchy = 1;
    }
    if (this.selectedRoleLevel < baseHierarchy) {
      router.navigate(['/summary-statistics'])
    }
    this.selectedRoleObject = rbacConfig.roles.filter((roleObj: any) => {
      return roleObj.value === this.selectedRoleLevel;
    })?.[0]
    let selectableFilters = rbacConfig.filters.filter((filter: any) => {
      return filter.hierarchyLevel <= this.selectedRoleLevel
    })
    selectableFilters?.forEach((filter: any, index: any) => {
      this.availableFilters += index === selectableFilters?.length - 1 ? filter?.name?.toLowerCase() :
        index === selectableFilters?.length - 2 ? filter?.name?.toLowerCase() + ' & ' :
          filter?.name?.toLowerCase() + ', '
    })
  }

  ngOnInit(): void {
    this.resetFilterForm(this.rbacForm);
    this.getFilters();
  }

  get f() {
    return this.rbacForm.controls;
  }

  onSubmit() {
    if (this.rbacForm.valid) {
      this.rbacForm.value.role = this.selectedRoleLevel
      this.setStateDetails(this.updatedForm)
      this.router.navigate(['/summary-statistics'])
    }
    else {
      const invalid = [];
      const controls = this.rbacForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      console.log(invalid)

      this.rbacForm.markAllAsTouched()
    }
  }

  async getFilters() {
    // if (this.selectedRoleLevel === 0) {
    //   this.filters = [];
    //   const controls = this.rbacForm.controls;
    //   for (const name in controls) {
    //     console.log(name)
    //     if (name !== 'name' && name !== 'role') {
    //       controls[name].clearValidators()
    //       controls[name].updateValueAndValidity()
    //     }
    //   }
    //   return
    // }
    let { filters, baseHierarchy } = rbacConfig;
    if (environment.config === 'VSK') {
      baseHierarchy = 2;
      filters = filters.filter((filter: any) => {
        return filter.hierarchyLevel !== 1
      })
    }
    else {
      baseHierarchy = 1;
    }
    let oldFilters = this.filters.filter((filter: any) => {
      return this.rbacForm.value[filter.name?.toLowerCase()] != null
    })
    let constructedFilters: any = [...oldFilters];
    for (let i = 0; i < filters.length; i++) {
      if (filters[i].hierarchyLevel <= this.selectedRoleLevel) {
        let masterFilter = filters.filter((prevFilter: any) => {
          return Number(prevFilter.hierarchyLevel) === Number(filters[i].hierarchyLevel) - 1;
        })
        if (masterFilter?.length > 0 && masterFilter[0].hierarchyLevel && !this.rbacForm.value[filters[i].name.toLowerCase()] && this.rbacForm.value[masterFilter[0].name.toLowerCase()]) {
          let query = this.parseQuery(filters[i].query, this.rbacForm.value[masterFilter[0].name.toLowerCase()])
          await this._commonService.getReportDataNew(query).subscribe((res: any) => {
            let rows = res;
            filters[i]['options'] = rows;
            constructedFilters.push(filters[i])
            this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.setValidators(Validators.required)
            this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.updateValueAndValidity()
          })
        }
        else if (masterFilter?.length > 0 && this.rbacForm.value[masterFilter[0]?.name.toLowerCase()] === null) {
          constructedFilters.splice(i, 1);
          this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.clearValidators()
          this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.updateValueAndValidity()
        }
        if (filters[i].hierarchyLevel === baseHierarchy && !this.rbacForm.value[filters[i].name.toLowerCase()]) {
          this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.setValidators(Validators.required)
          this.rbacForm?.controls?.[filters[i]?.name?.toLowerCase()]?.updateValueAndValidity()
          await this._commonService.getReportDataNew(filters[i].query).subscribe((res: any) => {
            let rows = res;
            filters[i]['options'] = rows;
            constructedFilters.push(filters[i])
          })
        }
      }
    }
    this.filters = constructedFilters;
  }

  updateForm(option: any, filter: any) {
    this.updatedForm = {
      ...this.rbacDetails,
      ...this.updatedForm,
      [option[filter?.valueProp]]: option[filter?.labelProp]
    }

    return option[filter?.valueProp]
  }

  parseQuery(query: any, masterLevel: any) {
    let startIndex = query.indexOf('{');
    let endIndex = query.indexOf('}');
    let masterRE = new RegExp(`{master_id}`, "g");
    if (query && masterLevel && startIndex != -1 && endIndex != -1) {
      query = query.replace(masterRE, '\'' + masterLevel + '\'');
    }
    return query;
  }

  resetFilterForm(form: any) {
    let { filters } = rbacConfig;
    if (environment.config === 'VSK') {
      filters = filters.filter((filter: any) => {
        return filter.hierarchyLevel !== 1
      })
    }
    filters.forEach((filter: any) => {
      form.controls[filter.name.toLowerCase()].reset()
      form.controls[filter.name.toLowerCase()].clearValidators();
      form.controls[filter.name.toLowerCase()].updateValueAndValidity();
    })
  }

  changeFilter(filter: any) {
    let { filters } = rbacConfig
    if (environment.config === 'VSK') {
      filters = filters.filter((filter: any) => {
        return filter.hierarchyLevel !== 1
      })
    }
    this.filters.splice(this.filters.indexOf(filter) + 1);
    filters.forEach((fil: any) => {
      if (fil.hierarchyLevel > filter.hierarchyLevel) {
        this.rbacForm.controls[fil?.name?.toLowerCase()].reset()
        this.rbacForm.controls[filter.name.toLowerCase()].clearValidators();
        this.rbacForm.controls[filter.name.toLowerCase()].updateValueAndValidity();
      }
    });
    this.getFilters();
  }

  setStateDetails(details: any) {
    if (environment.config === 'VSK') {
      let state_id, stateName;
      if (environment.stateCode) {
        state_id = StateCodes.indexOf(environment.stateCode)
        this.rbacForm.value.state = state_id
        let names: any = stateNames;
        names.every((state: any) => {
          if (state.stateCode == environment.stateCode) {
            stateName = state.stateName;
            return false;
          }
          return true;
        });
      }
      this._rbacService.setRbacDetails({
        ...details,
        ...this.rbacForm.value,
        state_name: stateName,
      });
    }
    else {
      this._rbacService.setRbacDetails({
        ...details,
        ...this.rbacForm.value
      });
    }
  }


}
