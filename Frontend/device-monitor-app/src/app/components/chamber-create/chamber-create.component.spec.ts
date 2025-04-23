import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberCreateComponent } from './chamber-create.component';

describe('ChamberCreateComponent', () => {
  let component: ChamberCreateComponent;
  let fixture: ComponentFixture<ChamberCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamberCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamberCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
