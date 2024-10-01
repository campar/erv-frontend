import {Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './core/guards/auth.guard';
import {LoginGuard} from './core/guards/login.guard';
import {
  DepartmentUnitCreatePageComponent
} from "./pages/department-unit/department-unit-create-page/department-unit-create-page.component";
import {
  DepartmentUnitEditPageComponent
} from "./pages/department-unit/department-unit-edit-page/department-unit-edit-page.component";
import {
  DepartmentUnitSearchPageComponent
} from "./pages/department-unit/department-unit-search-page/department-unit-search-page.component";
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {DailyReportPageComponent} from "./pages/daily-report-page/daily-report-page.component";
import {AbsenceReportPageComponent} from "./pages/absence-report-page/absence-report-page.component";
import {WorkingHoursPageComponent} from "./pages/working-hours-page/working-hours-page.component";
import {CheckInStatsPageComponent} from "./pages/check-in-stats-page/check-in-stats-page.component";
import {LeavingArrivalPageComponent} from "./pages/leaving-arrival-page/leaving-arrival-page.component";
import {WorkPausePageComponent} from "./pages/work-pause-page/work-pause-page.component";
import {DeviceEditPageComponent} from './pages/device/device-edit-page/device-edit-page.component';
import {CardCreatePageComponent} from './pages/card/card-create-page/card-create-page.component';
import {CardEditPageComponent} from './pages/card/card-edit-page/card-edit-page.component';
import {CardSearchPageComponent} from './pages/card/card-search-page/card-search-page.component';
import {DeviceCreatePageComponent} from './pages/device/device-create-page/device-create-page.component';
import {DeviceSearchPageComponent} from './pages/device/device-search-page/device-search-page.component';
import {LocationCreatePageComponent} from './pages/location/location-create-page/location-create-page.component';
import {LocationEditPageComponent} from './pages/location/location-edit-page/location-edit-page.component';
import {LocationSearchPageComponent} from './pages/location/location-search-page/location-search-page.component';
import {
  PermissionSearchPageComponent
} from './pages/permission/permission-search-page/permission-search-page.component';
import {RoleCreatePageComponent} from './pages/role/role-create-page/role-create-page.component';
import {RoleEditPageComponent} from './pages/role/role-edit-page/role-edit-page.component';
import {RoleSearchPageComponent} from './pages/role/role-search-page/role-search-page.component';
import {ShiftCreatePageComponent} from './pages/shift/shift-create-page/shift-create-page.component';
import {ShiftEditPageComponent} from './pages/shift/shift-edit-page/shift-edit-page.component';
import {ShiftSearchPageComponent} from './pages/shift/shift-search-page/shift-search-page.component';
import {TimetableCreatePageComponent} from './pages/timetable/timetable-create-page/timetable-create-page.component';
import {TimetableEditPageComponent} from './pages/timetable/timetable-edit-page/timetable-edit-page.component';
import {TimetableSearchPageComponent} from './pages/timetable/timetable-search-page/timetable-search-page.component';
import {UserCreatePageComponent} from './pages/user/user-create-page/user-create-page.component';
import {UserEditPageComponent} from './pages/user/user-edit-page/user-edit-page.component';
import {UserSearchPageComponent} from './pages/user/user-search-page/user-search-page.component';
import {IndividualReportPageComponent} from "./pages/individual-report-page/individual-report-page.component";
import {ProfileComponent} from './shared/components/profile/profile.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'user',
    component: UserSearchPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "user.title", parent: "", permissions: ['can_view_user']},
  },
  {
    path: 'user/create',
    component: UserCreatePageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "create", parent: "user", permissions: ['can_create_user']},
  },
  {
    path: 'user/update/:id',
    component: UserEditPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "update", parent: "user", permissions: ['can_update_user']},
  },
  {
    path: 'shift',
    component: ShiftSearchPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "shift.title", parent: "", permissions: ['can_view_shift']},
  },
  {
    path: 'shift/create',
    component: ShiftCreatePageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "create", parent: "shift", permissions: ['can_create_shift']},
  },
  {
    path: 'shift/update/:id',
    component: ShiftEditPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "update", parent: "shift", permissions: ['can_update_shift']},
  },
  {
    path: 'role',
    component: RoleSearchPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "role.title", parent: "", permissions: ['can_view_role']},
  },
  {
    path: 'role/create',
    component: RoleCreatePageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "create", parent: "role", permissions: ['can_create_role']},
  },
  {
    path: 'role/update/:id',
    component: RoleEditPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "update", parent: "role", permissions: ['can_update_role']},
  },
  {
    path: 'permission',
    component: PermissionSearchPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "permission.title", parent: "", permissions: ['can_view_permission']},
  },
  {
    path: 'timetable',
    component: TimetableSearchPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "timetable.title", parent: "", permissions: ['can_view_timetable']},
  },
  {
    path: 'timetable/create',
    component: TimetableCreatePageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "create", parent: "timetable", permissions: ['can_create_timetable']},
  },
  {
    path: 'timetable/update/:id',
    component: TimetableEditPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "update", parent: "timetable", permissions: ['can_update_timetable']},
  },
  {
    path: 'departmentUnit',
    component: DepartmentUnitSearchPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "departmentUnit.title", parent: "", permissions: ['can_view_department_unit']},
  },
  {
    path: 'departmentUnit/create',
    component: DepartmentUnitCreatePageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "create", parent: "departmentUnit", permissions: ['can_create_department_unit']},
  },
  {
    path: 'departmentUnit/update/:id',
    component: DepartmentUnitEditPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "update", parent: "departmentUnit", permissions: ['can_update_department_unit']},
  },
  {
    path: 'device',
    component: DeviceSearchPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "device.title", parent: "", permissions: ['can_view_device']},
  },
  {
    path: 'device/create',
    component: DeviceCreatePageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "create", parent: "device", permissions: ['can_create_device']},
  },
  {
    path: 'device/update/:id',
    component: DeviceEditPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "update", parent: "device", permissions: ['can_update_device']},
  },
  {
    path: 'location',
    component: LocationSearchPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "location.title", parent: "", permissions: ['can_view_location']},
  },
  {
    path: 'location/create',
    component: LocationCreatePageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "create", parent: "location", permissions: ['can_create_location']},
  },
  {
    path: 'location/update/:id',
    component: LocationEditPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "update", parent: "location", permissions: ['can_update_location']},
  },
  {
    path: 'card',
    component: CardSearchPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "card.title", parent: "", permissions: ['can_view_card']},
  },
  {
    path: 'card/create',
    component: CardCreatePageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "create", parent: "card", permissions: ['can_create_card']},
  },
  {
    path: 'card/update/:id',
    component: CardEditPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "update", parent: "card", permissions: ['can_update_card']},
  },
  {
    path: 'dailyReport',
    component: DailyReportPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "daily_report", parent: "", permissions: ['can_view_daily_report']}
  },
  {
    path: 'individualReport',
    component: IndividualReportPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "individual_report", parent: "", permissions: ['can_view_individual_report']}
  },
  {
    path: 'absenceReport',
    component: AbsenceReportPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "attendance_report", parent: "", permissions: ['can_view_attendance_report']}
  },
  {
    path: 'workingHours',
    component: WorkingHoursPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "work_hours_calculation", parent: "", permissions: ['can_view_work_hours_calculation_report']}
  },
  {
    path: 'checkInCheckOutStats',
    component: CheckInStatsPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "pass_statistics", parent: "", permissions: ['can_view_check_in_check_out_status_report']}
  },
  {
    path: 'leavingArrival',
    component: LeavingArrivalPageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "delays_departures", parent: "", permissions: ['can_view_leaving_arrival_report']}
  },
  {
    path: 'workPause',
    component: WorkPausePageComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "pause_report", parent: "", permissions: ['can_view_pause_report']}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {breadcrumb: "profile", parent: ""}
  },
  {path: 'pageNotFound', component: PageNotFoundComponent, canActivate: [AuthGuard]},
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'pageNotFound'}
];
