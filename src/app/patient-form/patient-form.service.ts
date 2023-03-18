import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Patient } from '@app/patient-form/patient'
import { Observable, catchError, retry, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class PatientFormService {
  private readonly patientBaseUrl = 'api/patients/'

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientBaseUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error)
        return throwError(() => error)
      })
    )
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientBaseUrl, patient)
  }
}
