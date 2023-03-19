import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Patient } from '@app/patient-form/patient'
import { Observable, catchError, map, retry, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class PatientService {
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

  getPatientIdAvailable(patientId: string): Observable<boolean> {
    return this.http
      .get<Patient[]>(this.patientBaseUrl + `?patientId=^${patientId}/?$`)
      .pipe(map((p) => p.length === 0))
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientBaseUrl, patient)
  }

  removePatient(id: number): Observable<Patient> {
    return this.http.delete<Patient>(this.patientBaseUrl + id)
  }
}
