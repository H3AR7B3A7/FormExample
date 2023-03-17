import { NgModule } from '@angular/core'
import { PatientFormRoutingModule } from '@app/patient-form/patient-form-routing.module'
import { PatientFormComponent } from '@app/patient-form/patient-form.component'
import { FormEffects } from '@app/patient-form/state/form.effects'
import { formReducer } from '@app/patient-form/state/form.reducer'
import { SharedModule } from '@app/shared/shared.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

@NgModule({
  declarations: [PatientFormComponent],
  imports: [
    SharedModule,
    PatientFormRoutingModule,
    StoreModule.forFeature('form', formReducer),
    EffectsModule.forFeature([FormEffects]),
  ],
})
export class PatientFormModule {}
