import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberTelemetryComponent } from './chamber-telemetry.component';

describe('ChamberTelemetryComponent', () => {
  let component: ChamberTelemetryComponent;
  let fixture: ComponentFixture<ChamberTelemetryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamberTelemetryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamberTelemetryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
