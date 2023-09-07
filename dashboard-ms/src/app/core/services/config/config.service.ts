import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IDashboardMenu } from 'src/app/core/models/IDashboardCard';
import { IMenuItem } from 'src/app/core/models/IMenuItem';
import { ResponseType } from 'src/app/core/models/IResponseType';
import { formatNumberForKeyMetric } from 'src/app/utilities/NumberFomatter';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private readonly _http: HttpClient) { }

  

}
