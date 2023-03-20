import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  templateUrl: './circular-calc-shell.component.html',
  styleUrls: ['./circular-calc-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CircularCalcShellComponent {}
