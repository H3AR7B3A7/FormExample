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
  loading!: boolean
  @Input()
  errorMessage!: string
  @Input()
  patientAdded!: boolean

  @Output()
  patientRemoved = new EventEmitter<number>()

  removePatient(id: number): void {
    this.patientRemoved.emit(id)
  }
}
