import { appReducer } from '@app/core/state/app.reducer'
import { AppState } from '@app/core/state/app.state'
import { formReducer } from '@app/patient-form/state/form.reducer'
import { FormState } from '@app/patient-form/state/form.state'
import { Action, combineReducers, compose } from '@ngrx/store'

export interface State {
  app: AppState
  form: FormState
}

const reducers = {
  app: appReducer,
  form: formReducer,
}

export function rootReducer(state: State | undefined, action: Action): State {
  return compose(combineReducers)(reducers)(state, action)
}
