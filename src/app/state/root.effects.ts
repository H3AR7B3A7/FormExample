import { Injectable } from '@angular/core'
import { Actions } from '@ngrx/effects'
import { createAction } from '@ngrx/store'

export const getClientsSuccess = createAction('[Client] Get Clients Success')

@Injectable()
export class RootEffects {
  // init$ = createEffect(() => this.actions$
  //   .pipe(
  //     ofType(ROOT_EFFECTS_INIT),
  //     switchMap(() => of(/*...*/))
  //   )
  // )

  public constructor(private actions$: Actions) {}
}
