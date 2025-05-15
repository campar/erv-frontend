import {inject, Injectable} from '@angular/core';
import {TranslationService} from './translation.service';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Settings, SettingsService} from "../../features/services/settings.service";
export interface Language {
  code: string;
  shortName: string;
  fullName: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  static readonly languages: Language[] = [
    {code: 'en', shortName: 'EN', fullName: 'English', flag: 'fi fi-gb'},
    {code: 'sr_lat', shortName: 'SRB', fullName: 'Srpski', flag: 'fi fi-rs'},
    {code: 'sr_cyr', shortName: 'СРБ', fullName: 'Српски', flag: 'fi fi-rs'},
  ];
  translationService = inject(TranslationService);
  protected http: HttpClient = inject(HttpClient);
  protected settingsService = inject(SettingsService);
  protected apiUrl = environment.apiUrl + 'api/settings';
  private defaultLanguage = environment.defaultLanguage;
  private languageSubject: BehaviorSubject<Language> = new BehaviorSubject<Language>(<Language>this.getLanguageFromMemory());
  public currentLanguage$: Observable<Language> = this.languageSubject.asObservable();

  getLanguages(): Language[] {
    return LanguageService.languages;
  }

  changeLanguage(languageCode: string) {
    this.settingsService.updateSetting("language", languageCode);
    this.setLanguage(languageCode);
  }

  loadLanguage() {
    this.setLanguage(this.defaultLanguage)
    this.http.get<any>(`${this.apiUrl}`).subscribe((data: Settings[]) => {
      this.setLanguage(data.find(e => e.key === 'language')?.value ?? this.defaultLanguage);
    });
  }

  private async setLanguage(language: string) {
    await this.translationService.setLanguage(language);
    let obj = LanguageService.languages.filter(e => e.code === language)[0];
    this.languageSubject.next(obj);
  }

  private getLanguageFromMemory(): Language | null {
    let code = this.settingsService.getSettingsFromMemory()?.find(e => e.key === 'language')?.value;
    if (!code) return null;
    return LanguageService.languages.filter(e => e.code === code)[0];
  }
}
