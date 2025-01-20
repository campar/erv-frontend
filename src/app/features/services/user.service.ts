import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../../core/entity-utils/page";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected apiUrl = environment.apiUrl + 'api';

  protected http: HttpClient = inject(HttpClient);

  getAbsenceReport(data: any, entity: string): Observable<Page> {
    return this.http.post<Page>(`${this.apiUrl}/${entity}/getAbsenceReport`, data);
  }

  getAbsenceReportPDF(data: any, entity: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/${entity}/getAbsenceReportPDF`, data, {responseType: 'blob' as 'json'});
  }

  getAbsenceReportCsv(data: any, entity: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/${entity}/getAbsenceReportCsv`, data, {responseType: 'blob' as 'json'});
  }

  getWorkingHoursReport(data: any, entity: string): Observable<Page> {
    return this.http.post<Page>(`${this.apiUrl}/${entity}/getWorkingHoursReport`, data);
  }

  getWorkingHoursReportPDF(data: any, entity: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/${entity}/getWorkingHoursReportPDF`, data, {responseType: 'blob' as 'json'});
  }

  getWorkingHoursReportCsv(data: any, entity: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/${entity}/getWorkingHoursReportCsv`, data, {responseType: 'blob' as 'json'});
  }

  getLeavingArrivalReport(data: any, entity: string): Observable<Page> {
    return this.http.post<Page>(`${this.apiUrl}/${entity}/getLeavingArrivalReport`, data);
  }

  getLeavingArrivalReportPDF(data: any, entity: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/${entity}/getLeavingArrivalReportPDF`, data, {responseType: 'blob' as 'json'});
  }

  getLeavingArrivalReportCsv(data: any, entity: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/${entity}/getLeavingArrivalReportCsv`, data, {responseType: 'blob' as 'json'});
  }

  getDailyReport(data: any, entity: string): Observable<Page> {
    return this.http.post<Page>(`${this.apiUrl}/${entity}/getDailyReport`, data);
  }

  getDailyReportPDF(data: any, entity: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/${entity}/getDailyReportPDF`, data, {responseType: 'blob' as 'json'});
  }

  getDailyReportCsv(data: any, entity: string): Observable<Blob> {
    return this.http.post<Blob>(`${this.apiUrl}/${entity}/getDailyReportCsv`, data, {responseType: 'blob' as 'json'});
  }

  importUsers(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/import`, formData);
  }

  setPassword(data: any): Observable<any> {
    return this.http.put<Page>(`${this.apiUrl}/user/password`, data);
  }
}
