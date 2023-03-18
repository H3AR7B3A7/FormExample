import { appReducer } from '@app/core/state/app.reducer'
import { AppState } from '@app/core/state/app.state'
import { patientFormReducer } from '@app/patient-form/state/patient-form.reducer'
import { PatientFormState } from '@app/patient-form/state/patient-form.state'
import { Action, combineReducers, compose } from '@ngrx/store'

export interface State {
  app: AppState
  form: PatientFormState
}

const reducers = {
  app: appReducer,
  form: patientFormReducer,
}

export function rootReducer(state: State | undefined, action: Action): State {
  return compose(combineReducers)(reducers)(state, action)
}
