import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CircularCalcShellComponent } from '@app/circular-calc/circular-calc-shell/circular-calc-shell.component'

const routes: Routes = [
  {
    path: '',
    component: CircularCalcShellComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircularCalcRoutingModule {}
