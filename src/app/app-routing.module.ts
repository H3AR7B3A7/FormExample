import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from '@app/home/home.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'form',
    loadChildren: () =>
      import('./patient-form/patient-form.module').then(
        (m) => m.PatientFormModule
      ),
  },
  {
    path: 'calc',
    loadChildren: () =>
      import('./circular-calc/circular-calc.module').then(
        (m) => m.CircularCalcModule
      ),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
