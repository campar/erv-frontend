import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import { LayoutService } from '../../shared/components/layout/layout.service';

export interface Settings {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  protected http: HttpClient = inject(HttpClient);
  protected apiUrl = environment.apiUrl + 'api/settings';
  private layoutService = inject(LayoutService);

  private settingsSubject = new BehaviorSubject<Settings[]>([]);
  public settings$ = this.settingsSubject.asObservable();

  constructor() {
    const settings = this.getSettingsFromMemory();
    if (settings) {
      this.settingsSubject.next(settings);
    }
  }

  getSettingsFromMemory(): Settings[] | null {
    const settings = localStorage.getItem("settings");
    return settings ? JSON.parse(settings) : null;
  }

  getItemFromSettings(key: string) {
    const currentSettings = this.getSettingsFromMemory() || [];
    const index = currentSettings.findIndex(setting => setting.key === key);
    if (index !== -1) {
      return JSON.parse(currentSettings[index].value);
    }
    return undefined;
  }

  private saveSettingsToMemory(settings: Settings[]): void {
    localStorage.setItem("settings", JSON.stringify(settings));
    this.settingsSubject.next(settings);
  }

  updateSetting(key: string, value: string): void {
    const currentSettings = this.getSettingsFromMemory() || [];
    const index = currentSettings.findIndex(setting => setting.key === key);

    if (index !== -1) {
      currentSettings[index].value = value;
    } else {
      currentSettings.push({key, value});
    }

    this.saveSettingsToMemory(currentSettings);
    this.saveSettingsToApi().subscribe((data: Settings[]) => {
      this.saveSettingsToMemory(data);
    });
  }

  private saveSettingsToApi(): Observable<Settings[]> {
    const settings = this.getSettingsFromMemory();
    if (settings) {
      return this.http.post<Settings[]>(`${this.apiUrl}/saveAll`, settings);
    }
    return new Observable<Settings[]>();
  }

  private loadSettingsFromApi(): Observable<Settings[]> {
    return this.http.get<Settings[]>(this.apiUrl);
  }

  sync(): void {
    this.loadSettingsFromApi().subscribe(settings => {
      this.saveSettingsToMemory(settings);
      const styleConfig = this.getItemFromSettings('styleConfig');
      if(styleConfig){
        this.layoutService.updateFromLocalStorage(styleConfig);
      }
    });
  }
}
