import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { Patient } from '@app/patient-form/patient'

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
}
