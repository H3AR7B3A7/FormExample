import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Patient } from '@app/patient-form/models/patient'
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
      .pipe(
        map((p) => p.length === 0),
        catchError((err) => this.handleError(err))
      )
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http
      .post<Patient>(this.patientBaseUrl, patient)
      .pipe(catchError((err) => this.handleError(err)))
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http
      .put<Patient>(this.patientBaseUrl + `${patient.id}`, patient)
      .pipe(
        map(() => patient),
        catchError((err) => this.handleError(err))
      )
  }

  removePatient(id: number): Observable<Patient> {
    return this.http
      .delete<Patient>(this.patientBaseUrl + id)
      .pipe(catchError((err) => this.handleError(err)))
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.error}`
    }
    console.error(err)
    return throwError(() => errorMessage)
  }
}
