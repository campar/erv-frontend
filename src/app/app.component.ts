import {AfterViewInit, ChangeDetectorRef, Component, inject} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {AuthService} from './core/services/auth.service';
import {TranslationService} from './core/services/translation.service';
import {AsyncPipe, NgIf} from "@angular/common";
import {AppLayoutComponent} from "./shared/components/layout/layout.component";
import {ToastService} from './core/services/toast.service';
import {ToastModule} from 'primeng/toast';
import {LanguageService} from "./core/services/language.service";
import { SettingsService } from './features/services/settings.service';
import { LayoutService } from './shared/components/layout/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, AsyncPipe, NgIf, AppLayoutComponent, ToastModule],
  providers: []
})
export class AppComponent implements AfterViewInit{
  title = 'erv-angular';
  private authService = inject(AuthService);
  private translationService = inject(TranslationService);
  private languageService = inject(LanguageService);
  private settingsService = inject(SettingsService);
  private layoutService = inject(LayoutService);
  private crf: ChangeDetectorRef = inject(ChangeDetectorRef);
  showLoader: boolean = false;
  router: Router = inject(Router)

  toastService = inject(ToastService)

  isLoggedIn() {
    return this.authService.authEvent$;
  }

  isPageWithMenu() {
    return this.router.url !== '/pageNotFound';
  }

  constructor() {
    this.languageService.currentLanguage$.subscribe(data => {
      if (data) {
        this.translationService.setLanguage(data.code);
      } else {
        this.languageService.loadLanguage();
      }
    });
  }
  ngAfterViewInit(): void {
    const styleConfig = this.settingsService.getItemFromSettings('styleConfig')
    if(styleConfig){
      this.layoutService.updateFromLocalStorage(styleConfig);
    }
    this.crf.detectChanges();
  }
}
