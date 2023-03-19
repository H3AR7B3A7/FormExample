import { Patient } from '@app/patient-form/models/patient'

export interface PatientFormState {
  patients: Patient[]
  currentPatientId: number
  errorMessage: string
  loading: boolean
  savingPatient: boolean
  updatingPatient: boolean
  removingPatient: number
}
