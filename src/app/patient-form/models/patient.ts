import { Gender } from '@app/patient-form/models/gender'

export interface Patient {
  patientId: string
  name: {
    first: string
    last: string
  }
  age: number
  gender: Gender
  address: {
    street: string
    number: string
    city: string
  }
  notes: Note[]
  id?: number
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function resolvePatient(obj: any): Patient {
  return {
    patientId: obj.patientId || '',
    name: {
      first: obj.name.first || '',
      last: obj.name.last || '',
    },
    age: obj.age || 0,
    gender: obj.gender || '',
    address: {
      street: obj.address.street || '',
      number: obj.address.number || '',
      city: obj.address.city || '',
    },
    notes: obj.notes || [],
  } as const
}

export interface Note {
  text: string
}
