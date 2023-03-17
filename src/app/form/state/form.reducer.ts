import { createReducer } from '@ngrx/store'

import { FormState } from './form.state'

export const initialState: FormState = {}

export const formReducer = createReducer<FormState>(initialState)
