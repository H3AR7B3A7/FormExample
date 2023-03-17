import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PatientFormComponent } from '@app/patient-form/patient-form.component'

const routes: Routes = [
  {
    path: '',
    component: PatientFormComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientFormRoutingModule {}
