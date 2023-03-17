import { Component } from '@angular/core'
import { FormService } from '@app/patient-form/form.service'
import { Patient } from '@app/patient-form/patient'
import { Observable } from 'rxjs'

@Component({
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss'],
})
export class PatientFormComponent {
  patients$: Observable<Patient[]>

  constructor(private formService: FormService) {
    this.patients$ = formService.getHeroes()
  }
}
