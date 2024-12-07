import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {PrimeModule} from "../../prime/prime.modules";

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [PrimeModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
  animations: [
    trigger('toggleSection', [
      state('open', style({
        height: '*',
        opacity: 1
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class SectionComponent {
  isOpen = true;
  toggleSection() {
    this.isOpen = !this.isOpen;
  }
}
