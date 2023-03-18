import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { PatientFormRoutingModule } from '@app/patient-form/patient-form-routing.module'
import { PatientFormComponent } from '@app/patient-form/patient-form.component'
import { PatientFormEffects } from '@app/patient-form/state/patient-form.effects'
import { patientFormReducer } from '@app/patient-form/state/patient-form.reducer'
import { SharedModule } from '@app/shared/shared.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

@NgModule({
  declarations: [PatientFormComponent],
  imports: [
    SharedModule,
    PatientFormRoutingModule,
    StoreModule.forFeature('patientForm', patientFormReducer),
    EffectsModule.forFeature([PatientFormEffects]),
    ReactiveFormsModule,
  ],
})
export class PatientFormModule {}
