import { NgModule } from '@angular/core'
import { FormRoutingModule } from '@app/form/form-routing.module'
import { FormShellComponent } from '@app/form/form-shell/form-shell.component'
import { FormEffects } from '@app/form/state/form.effects'
import { formReducer } from '@app/form/state/form.reducer'
import { SharedModule } from '@app/shared/shared.module'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

@NgModule({
  declarations: [FormShellComponent],
  imports: [
    SharedModule,
    FormRoutingModule,
    StoreModule.forFeature('form', formReducer),
    EffectsModule.forFeature([FormEffects]),
  ],
})
export class FormModule {}
