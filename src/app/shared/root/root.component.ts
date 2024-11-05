import {Component, inject, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {SearchDTO} from "../../core/entity-utils/search-dto";
import {Page} from "../../core/entity-utils/page";
import {ApiService} from "../../core/services/api.service";
import {AppUtils} from "../utils/app-utils";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: '',
  styles: []
})
export class RootComponent implements OnDestroy {
  protected subs: Subscription[] = [];
  protected service: ApiService = inject(ApiService);

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  search(body: SearchDTO, entity: string, responseFn: Function, errorFn?: Function): void {
    let sub = this.service.search(body, AppUtils.toFirstLetterLowercase(entity)).subscribe({
      next: (data: Page) => {
        responseFn(data);
      },
      error: (err) => {
        if (errorFn) {
          errorFn(err); // Only called if passed in
        } else {
          console.error('Unhandled update error:', err); // Optional fallback
        }
      }
    });
    this.subs.push(sub);
  }

  delete(id: any, entity: string, responseFn: Function, errorFn?: Function): void {
    let sub = this.service.delete(AppUtils.toFirstLetterLowercase(entity), id).subscribe({
      next: (data: any) => {
        responseFn(data);
      },
      error: (err) => {
        if (errorFn) {
          errorFn(err); // Only called if passed in
        } else {
          console.error('Unhandled update error:', err); // Optional fallback
        }
      }
    });
    this.subs.push(sub);
  }

  insert(body: {}, entity: string, responseFn: Function, errorFn?: Function): void {
    let sub = this.service.insert(AppUtils.toFirstLetterLowercase(entity), body).subscribe({
      next: (data: {}) => {
        responseFn(data);
      },
      error: (err) => {
        if (errorFn) {
          errorFn(err); // Only called if passed in
        } else {
          console.error('Unhandled update error:', err); // Optional fallback
        }
      }
    });
    this.subs.push(sub);
  }

  update(body: {}, entity: string, responseFn: Function, errorFn?: Function): void {
    let sub = this.service.update(AppUtils.toFirstLetterLowercase(entity), body).subscribe({
      next: (data: {}) => {
        responseFn(data);
      },
      error: (err) => {
        if (errorFn) {
          errorFn(err); // Only called if passed in
        } else {
          console.error('Unhandled update error:', err); // Optional fallback
        }
      }
    });
    this.subs.push(sub);
  }

  getAll(entity: string, responseFn: Function, errorFn?: Function): void {
    let sub = this.service.getAll(AppUtils.toFirstLetterLowercase(entity)).subscribe({
      next: (data: any[]) => {
        responseFn(data);
      },
      error: (err) => {
        if (errorFn) {
          errorFn(err); // Only called if passed in
        } else {
          console.error('Unhandled update error:', err); // Optional fallback
        }
      }
    });
    this.subs.push(sub);
  }

  getAllMinimal(entity: string, responseFn: Function, errorFn?: Function): void {
    let sub = this.service.getAllMinimal(AppUtils.toFirstLetterLowercase(entity)).subscribe({
      next: (data: any[]) => {
        responseFn(data);
      },
      error: (err) => {
        if (errorFn) {
          errorFn(err); // Only called if passed in
        } else {
          console.error('Unhandled update error:', err); // Optional fallback
        }
      }
    });
    this.subs.push(sub);
  }

  getById(id: any, entity: string, responseFn: Function, errorFn?: Function): void {
    let sub = this.service.getById(AppUtils.toFirstLetterLowercase(entity), id).subscribe({
      next: (data: any) => {
        responseFn(data);
      },
      error: (err) => {
        if (errorFn) {
          errorFn(err); // Only called if passed in
        } else {
          console.error('Unhandled update error:', err); // Optional fallback
        }
      }
    });
    this.subs.push(sub);
  }

  performSubscription(sub: Observable<any>, res: any) {
    let s = sub.subscribe((data: any) => {
      res(data);
    })
    this.subs.push(s);
  }
}
