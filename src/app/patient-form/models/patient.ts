export interface Patient {
  id: number
  patientId: string
  name: {
    first: string
    last: string
  }
  age: number
  gender: string
  address: {
    street: string
    number: string
    city: string
  }
  notes: Note[]
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function resolvePatient(patient: any): Patient {
  return {
    id: patient.id,
    patientId: patient.patientId,
    name: {
      first: patient.name.first,
      last: patient.name.last,
    },
    age: patient.age,
    gender: patient.gender,
    address: {
      street: patient.address.street,
      number: patient.address.number,
      city: patient.address.city,
    },
    notes: patient.notes,
  } as const
}

export interface Note {
  text: string
}

export const NEW_PATIENT = resolvePatient({
  id: 0,
  patientId: '',
  name: {
    first: '',
    last: '',
  },
  age: null,
  gender: '',
  address: {
    street: '',
    number: '',
    city: '',
  },
  notes: [
    {
      text: '',
    },
  ],
})
