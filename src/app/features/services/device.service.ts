import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../core/entity-utils/page";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  protected apiUrl = environment.apiUrl + 'api';

  protected http: HttpClient = inject(HttpClient);

  getCheckInStatsReport(data: any, entity: string): Observable<Page> {
    return this.http.post<Page>(`${this.apiUrl}/${entity}/getCheckInStatsReport`, data);
  }

  getCheckInStatsReportPDF(data: any, entity: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/${entity}/getCheckInStatsReportPDF`, data, { responseType: 'blob' as 'json' });
  }
}
