import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Patient } from '@app/patient-form/model/patient'
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
      catchError((err) => this.handleError(err))
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
    return throwError(() =>
      err.error instanceof ErrorEvent
        ? `An error occurred: ${err.error.message}`
        : `Backend returned code ${err.status}: ${err.error}`
    )
  }
}
