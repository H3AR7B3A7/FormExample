import { Patient } from '@app/patient-form/models/patient'

export interface PatientFormState {
  patients: Patient[]
  errorMessage: string
  loading: boolean
  savingPatient: boolean | undefined
  currentPatient: number | undefined
}
