import { Injectable } from '@angular/core'
import { Patient } from '@app/patient-form/patient'
import { FEMALE, MALE, OTHER } from '@app/patient-form/patient-form-add/gender'
import { InMemoryDbService } from 'angular-in-memory-web-api'

interface DataBase {
  patients: Patient[]
}

@Injectable({
  providedIn: 'root',
})
export class DataService implements InMemoryDbService {
  createDb(): DataBase {
    return {
      patients: [
        {
          name: {
            first: 'Spider',
            last: 'man',
          },
          age: 10,
          gender: MALE,
          address: {
            street: 'Some street',
            number: '12 2nd floor',
            city: 'SomeCity',
          },
          notes: [],
          id: 1,
        },
        {
          name: {
            first: 'Spider',
            last: 'man',
          },
          age: 10,
          gender: FEMALE,
          address: {
            street: 'Some street',
            number: '12 2nd floor',
            city: 'SomeCity',
          },
          notes: [],
          id: 2,
        },
        {
          name: {
            first: 'Spider',
            last: 'man',
          },
          age: 10,
          gender: OTHER,
          address: {
            street: 'Some street',
            number: '12 2nd floor',
            city: 'SomeCity',
          },
          notes: [],
          id: 3,
        },
      ],
    }
  }
}
