import {Component, Input} from '@angular/core';
import {
  GenericInsertFormComponent
} from "../../../../shared/components/generic-insert-form/generic-insert-form.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslatePipe} from "../../../../core/pipes/translate.pipe";
import {PrimeModule} from "../../../../shared/prime/prime.modules";
import { AppDate } from '../../../../shared/utils/app-date';

@Component({
  selector: 'app-card-insert-form',
  standalone: true,
  imports: [GenericInsertFormComponent, AsyncPipe, FormsModule, NgForOf, NgIf, TranslatePipe, PrimeModule, ReactiveFormsModule],
  templateUrl: './card-insert-form.component.html',
  styleUrls: ['./card-insert-form.component.css', '../../../../shared/components/generic-form/generic-form.component.scss']
})

export class CardInsertFormComponent extends GenericInsertFormComponent{
  @Input() defaults!: { [key: string]: any };
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.form?.get('permanent')?.valueChanges.subscribe(value =>{
      let dateControl = this.form?.get('expirationDate')
      if(value){
        dateControl?.disable()
        dateControl?.setValue(AppDate.now().plusYears(100).toDate())
      }else{
        dateControl?.enable()
        dateControl?.setValue(undefined)
      }
    })
  }
  override onSubmit(navigate?: boolean, callback?: () => void): void {
    console.log(this.form?.get('active')?.value)
    this.form?.get('expirationDate')?.enable()
    super.onSubmit(navigate, callback)
  }
  
}
