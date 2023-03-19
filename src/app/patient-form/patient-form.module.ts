import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { PatientFormRoutingModule } from '@app/patient-form/patient-form-routing.module'
import { PatientFormShellComponent } from '@app/patient-form/patient-form-shell/patient-form-shell.component'
import { PatientFormEffects } from '@app/patient-form/state/patient-form.effects'
import { patientFormReducer } from '@app/patient-form/state/patient-form.reducer'
import { SharedModule } from '@app/shared/shared.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { PatientFormEditComponent } from './patient-form-edit/patient-form-edit.component'
import { StatusPipe } from './patient-form-edit/utils/status.pipe'
import { PatientFormOverviewComponent } from './patient-form-overview/patient-form-overview.component'

@NgModule({
  declarations: [
    PatientFormShellComponent,
    PatientFormOverviewComponent,
    PatientFormEditComponent,
    StatusPipe,
  ],
  imports: [
    SharedModule,
    PatientFormRoutingModule,
    StoreModule.forFeature('patientForm', patientFormReducer),
    EffectsModule.forFeature([PatientFormEffects]),
    ReactiveFormsModule,
  ],
})
export class PatientFormModule {}
