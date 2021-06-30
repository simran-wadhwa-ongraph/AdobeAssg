import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepratmentViewComponent } from './depratment-view.component';

describe('DepratmentViewComponent', () => {
  let component: DepratmentViewComponent;
  let fixture: ComponentFixture<DepratmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepratmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepratmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
