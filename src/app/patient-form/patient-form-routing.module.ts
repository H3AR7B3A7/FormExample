import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { PatientFormShellComponent } from '@app/patient-form/patient-form-shell/patient-form-shell.component'

const routes: Routes = [
  {
    path: '',
    component: PatientFormShellComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientFormRoutingModule {}
