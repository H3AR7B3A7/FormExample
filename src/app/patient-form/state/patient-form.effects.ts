import { Injectable } from '@angular/core'
import { PatientFormService } from '@app/patient-form/patient-form.service'
import {
  PatientFormApiActions,
  PatientFormPageActions,
} from '@app/patient-form/state/actions'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of } from 'rxjs'

@Injectable()
export class PatientFormEffects {
  getPatients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientFormPageActions.loadPatients),
      mergeMap(() =>
        this.patientService.getPatients().pipe(
          map((patients) =>
            PatientFormApiActions.loadPatientsSuccess({ patients })
          ),
          catchError((error) =>
            of(PatientFormApiActions.loadPatientsFail({ error }))
          )
        )
      )
    )
  })

  constructor(
    private actions$: Actions,
    private patientService: PatientFormService
  ) {}
}
