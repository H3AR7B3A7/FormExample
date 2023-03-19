import { Injectable } from '@angular/core'
import { FEMALE, MALE, OTHER } from '@app/patient-form/model/gender'
import { Patient } from '@app/patient-form/model/patient'
import { InMemoryDbService } from 'angular-in-memory-web-api'

type ExtendedPatient = Patient & {
  [key: string]: unknown
}

interface DataBase {
  patients: ExtendedPatient[]
}

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  createDb(): DataBase {
    return {
      patients: [
        {
          id: 1,
          patientId: '9a7ce785-20e8-4db9-843b-26c355cd8363',
          name: {
            first: 'Iron',
            last: 'Man',
          },
          age: 31,
          gender: MALE.value,
          address: {
            street: 'Midtown Manhattan',
            number: 'The Stark Tower Complex',
            city: 'New York City',
          },
          notes: [],
        },
        {
          id: 2,
          patientId: '12d90afb-8250-4237-b9f9-441218c1339b',
          name: {
            first: 'Super',
            last: 'Woman',
          },
          age: 28,
          gender: FEMALE.value,
          address: {
            street: 'Krypton',
            number: 'forgot',
            city: 'Antimatter Universe',
          },
          notes: [],
        },
        {
          id: 3,
          patientId: '3e982d25-89e5-46aa-a07d-41680a066198',
          name: {
            first: 'Groot',
            last: 'Flora Colossus',
          },
          age: 6,
          gender: OTHER.value,
          address: {
            street: 'Planet X',
            number: 'behind the mountain',
            city: 'Galaxy',
          },
          notes: [],
        },
      ],
    }
  }
}
