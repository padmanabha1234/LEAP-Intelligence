import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppConstants } from './appConstants';

@Injectable()
export class AppConfig {

    public static config: Object = null;// <-- Your global config variable
    constructor(private http: HttpClient) {
    }

    public getConfig(key: any) {

        if (AppConfig.config && AppConfig.config[key]) {

            return AppConfig.config[key];
        }
        else {
            return null;
        }
    }

    public load() {
        this.http.get('assets/config/globalconfig.json').pipe(map(data => {
            return data;
        })).subscribe((data) => {
            AppConfig.config = data;
        });
    }
}