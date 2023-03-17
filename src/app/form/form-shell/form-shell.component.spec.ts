import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FormShellComponent } from './form-shell.component'

describe('FormShellComponent', () => {
  let component: FormShellComponent
  let fixture: ComponentFixture<FormShellComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormShellComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(FormShellComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
