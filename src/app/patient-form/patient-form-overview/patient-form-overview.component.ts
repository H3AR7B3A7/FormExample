import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { Patient } from '@app/patient-form/models/patient'

@Component({
  selector: 'app-patient-form-overview',
  templateUrl: './patient-form-overview.component.html',
  styleUrls: ['./patient-form-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientFormOverviewComponent {
  @Input()
  patients!: Patient[]
  @Input()
  currentPatientId!: number
  @Input()
  loading!: boolean
  @Input()
  errorMessage!: string
  @Input()
  savingPatient!: boolean
  @Input()
  updatingPatient!: boolean
  @Input()
  removingPatient!: number

  @Output()
  patientRemoved = new EventEmitter<number>()
  @Output()
  patientSelected = new EventEmitter<number>()

  selectPatient(id: number): void {
    if (this.currentPatientId !== id) {
      this.patientSelected.emit(id)
    } else {
      this.patientSelected.emit(0)
    }
  }

  removePatient($event: MouseEvent, id: number): void {
    $event.stopPropagation()
    this.patientRemoved.emit(id)
  }
}
