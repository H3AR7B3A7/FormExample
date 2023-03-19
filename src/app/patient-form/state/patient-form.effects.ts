import { Injectable } from '@angular/core'
import { PatientService } from '@app/patient-form/service/patient.service'
import {
  PatientFormApiActions,
  PatientFormPageActions,
} from '@app/patient-form/state/actions'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, mergeMap, of } from 'rxjs'

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
          catchError((errorMessage) =>
            of(PatientFormApiActions.loadPatientsFail({ errorMessage }))
          )
        )
      )
    )
  })

  addPatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientFormPageActions.addPatient),
      concatMap((action) =>
        this.patientService.addPatient(action.patient).pipe(
          map((patient) =>
            PatientFormApiActions.addPatientSuccess({ patient })
          ),
          catchError((errorMessage) =>
            of(PatientFormApiActions.addPatientFail({ errorMessage }))
          )
        )
      )
    )
  })

  updatePatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientFormPageActions.updatePatient),
      concatMap((action) =>
        this.patientService.updatePatient(action.patient).pipe(
          map((patient) =>
            PatientFormApiActions.updatePatientSuccess({ patient })
          ),
          catchError((errorMessage) =>
            of(PatientFormApiActions.updatePatientFail({ errorMessage }))
          )
        )
      )
    )
  })

  deletePatient$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PatientFormPageActions.removePatient),
      concatMap((action) =>
        this.patientService.removePatient(action.id).pipe(
          map(() =>
            PatientFormApiActions.removePatientSuccess({ id: action.id })
          ),
          catchError((errorMessage) =>
            of(PatientFormApiActions.removePatientFail({ errorMessage }))
          )
        )
      )
    )
  })

  constructor(
    private actions$: Actions,
    private patientService: PatientService
  ) {}
}
