import { createReducer } from '@ngrx/store'

import { AppState } from './app.state'

export const initialState: AppState = {}

export const appReducer = createReducer<AppState>(initialState)
