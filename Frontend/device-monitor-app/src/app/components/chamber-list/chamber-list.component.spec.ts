import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamberListComponent } from './chamber-list.component';

describe('ChamberListComponent', () => {
  let component: ChamberListComponent;
  let fixture: ComponentFixture<ChamberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamberListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
