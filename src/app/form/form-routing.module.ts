import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FormShellComponent } from '@app/form/form-shell/form-shell.component'

const routes: Routes = [
  {
    path: '',
    component: FormShellComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormRoutingModule {}
