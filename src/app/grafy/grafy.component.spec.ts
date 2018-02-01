import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafyComponent } from './grafy.component';

describe('GrafyComponent', () => {
  let component: GrafyComponent;
  let fixture: ComponentFixture<GrafyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
