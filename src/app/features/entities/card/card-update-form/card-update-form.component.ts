import {Component, Input} from '@angular/core';
import {
  GenericUpdateFormComponent
} from "../../../../shared/components/generic-update-form/generic-update-form.component";
import {Structure} from "../../structure";
import { AppDate } from '../../../../shared/utils/app-date';
import { PrimeModule } from '../../../../shared/prime/prime.modules';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-update-form',
  standalone: true,
  imports: [GenericUpdateFormComponent, ReactiveFormsModule, PrimeModule],
  templateUrl: './card-update-form.component.html',
  styleUrl: './card-update-form.component.css'
})

export class CardUpdateFormComponent extends GenericUpdateFormComponent{
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
  override onSubmit(){
    this.form?.get('expirationDate')?.enable()
    super.onSubmit()
  }
}
