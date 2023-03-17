import { Injectable } from '@angular/core'
import { Patient } from '@app/patient-form/patient'
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
          id: 1,
          name: 'Spiderman',
          team: 'Avengers',
        },
        {
          id: 2,
          name: 'Flash',
          team: 'Justice League',
        },
        {
          id: 3,
          name: 'Ironman',
          team: 'Avengers',
        },
        {
          id: 4,
          name: 'Superman',
          team: 'Justice League',
        },
        {
          id: 5,
          name: 'Hulk',
          team: 'Avengers',
        },
        {
          id: 6,
          name: 'Batman',
          team: 'Justice League',
        },
      ],
    }
  }
}
