import {Component, inject, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {ToastService} from "../../core/services/toast.service";
import {PrimeModule} from "../../shared/prime/prime.modules";
import {PasswordModule} from "primeng/password";
import { SettingsService } from '../../features/services/settings.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, PrimeModule, PasswordModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  toastService = inject(ToastService)
  settingsService = inject(SettingsService)
  translationService = inject(TranslationService)

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.authService.authEvent$.subscribe(data => {
      if (data) this.router.navigate(['']).then();
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.authService.login(username, password).subscribe({
        
        next: () => {
          this.settingsService.sync();
          this.router.navigate(['/'])
        },
        error: err => {
          if(err.error.localizationKey) {
            let errorMessage = this.translationService.translate(err.error.localizationKey)
            if(err.status === 429){
              if(err.error.details.remainingSeconds) errorMessage = errorMessage.replace('{0}', err.error.details.remainingSeconds)
            }
            this.toastService.showError(errorMessage)
          }else{
            this.toastService.showError(err.message)
          }
          console.error('Login failed', err)
        }
      });
    }
  }

  hide = signal(true);

  togglePassword() {
    this.hide.set(!this.hide());
  }
}
