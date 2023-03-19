import { Patient } from '@app/patient-form/models/patient'

export interface PatientFormState {
  patients: Patient[]
  errorMessage: string
  loading: boolean
  patientAdded: boolean
}
