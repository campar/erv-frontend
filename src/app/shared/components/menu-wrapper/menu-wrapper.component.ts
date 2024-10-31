import {Component, OnInit} from '@angular/core';
import {MenuItemComponent} from "../menu-item/menu-item.component";
import {CommonModule} from '@angular/common';
import {PrimeModule} from '../../prime/prime.modules';

@Component({
  selector: 'app-menu-wrapper',
  standalone: true,
  imports: [MenuItemComponent, CommonModule, PrimeModule],
  templateUrl: './menu-wrapper.component.html',
  styleUrl: './menu-wrapper.component.scss'
})
export class MenuWrapperComponent implements OnInit {

  model: any[] = [];

  ngOnInit() {
    this.model = [
      {
        label: 'home',
        items: [
          {label: 'dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
        ]
      },
      {
        label: 'administration',
        icon: 'pi pi-fw pi-check-square',
        items: [
          {label: 'work_record', icon: 'pi pi-fw pi-list', routerLink: ['/timetable']},
          {label: 'employees', icon: 'pi pi-fw pi-user', routerLink: ['/user']},
          {label: 'structure', icon: 'pi pi-fw pi-sitemap', routerLink: ['/departmentUnit']},
          {label: 'locations', icon: 'pi pi-fw pi-building', routerLink: ['/location']},
          {label: 'devices', icon: 'pi pi-fw pi-tablet', routerLink: ['/device']},
          {label: 'cards', icon: 'pi pi-fw pi-id-card', routerLink: ['/card']},
          {label: 'roles', icon: 'pi pi-fw pi-code', routerLink: ['/role']},
          {label: 'permissions', icon: 'pi pi-fw pi-key', routerLink: ['/permission']},
          {label: 'shifts', icon: 'pi pi-fw pi-replay', routerLink: ['/shift']},
        ]
      },
      {
        label: 'reports',
        items: [
          {label: 'daily_report', icon: 'pi pi-fw pi-calendar-clock', routerLink: ['/dailyReport']},
          {label: 'individual_report', icon: 'pi pi-fw pi-address-book', routerLink: ['/individualReport']},
          {label: 'attendance_report', icon: 'pi pi-fw pi-users', routerLink: ['/absenceReport']},
          {label: 'work_hours_calculation', icon: 'pi pi-fw pi-hourglass', routerLink: ['/workingHours']},
          {label: 'pass_statistics', icon: 'pi pi-fw pi-arrow-right-arrow-left', routerLink: ['/checkInCheckOutStats']},
          {label: 'delays_departures', icon: 'pi pi-fw pi-send', routerLink: ['/leavingArrival']},
          {label: 'pause', icon: 'pi pi-fw pi-pause', routerLink: ['/workPause']},
        ]
      }
    ];
  }
}
