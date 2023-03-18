import { Patient } from '@app/patient-form/patient'

export interface PatientFormState {
  patients: Patient[]
  errorMessage: string
  loading: boolean
}
