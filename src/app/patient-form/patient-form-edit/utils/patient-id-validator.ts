import { Injectable } from '@angular/core'
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms'
import { PatientService } from '@app/patient-form/service/patient.service'
import { Observable, catchError, debounceTime, first, map, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class PatientIdValidator implements AsyncValidator {
  constructor(private patientService: PatientService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.patientService.getPatientIdAvailable(control.value).pipe(
      debounceTime(300),
      map((isAvailable) => (isAvailable ? null : { exists: true })),
      catchError(() => of(null)),
      first()
    )
  }
}
