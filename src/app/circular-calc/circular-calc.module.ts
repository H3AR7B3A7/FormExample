import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { CircularCalcRoutingModule } from '@app/circular-calc/circular-calc-routing.module'
import { SharedModule } from '@app/shared/shared.module'

import { CircularCalcFormComponent } from './circular-calc-form/circular-calc-form.component'
import { CircularCalcShellComponent } from './circular-calc-shell/circular-calc-shell.component'

@NgModule({
  declarations: [CircularCalcShellComponent, CircularCalcFormComponent],
  imports: [SharedModule, CircularCalcRoutingModule, ReactiveFormsModule],
})
export class CircularCalcModule {}
