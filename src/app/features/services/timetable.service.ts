import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "../../core/entity-utils/page";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  protected apiUrl = environment.apiUrl + 'api';

  protected http: HttpClient = inject(HttpClient);

  getIndividualReport(data: any, entity: string): Observable<Page> {
    return this.http.post<Page>(`${this.apiUrl}/${entity}/getIndividualReport`, data);
  }

  getIndividualReportPDF(data: any, entity: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/${entity}/getIndividualReportPDF`, data, {responseType: 'blob' as 'json'});
  }

  getPauseReport(data: any, entity: string) {
    return this.http.post<Page>(`${this.apiUrl}/${entity}/getPauseReport`, data);
  }

  getPauseReportPDF(data: any, entity: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/${entity}/getPauseReportPDF`, data, {responseType: 'blob' as 'json'});
  }

  getDashboardData(data: any,) {
    return this.http.post<Page>(`${this.apiUrl}/timetable/getDashboardData`, data);
  }
}

