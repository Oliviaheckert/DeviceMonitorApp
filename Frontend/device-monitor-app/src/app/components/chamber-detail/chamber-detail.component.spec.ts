import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberDetailComponent } from './chamber-detail.component';

describe('ChamberDetailComponent', () => {
  let component: ChamberDetailComponent;
  let fixture: ComponentFixture<ChamberDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamberDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamberDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
