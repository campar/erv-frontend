import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {

}
