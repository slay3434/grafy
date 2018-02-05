import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafySvgComponent } from './grafy-svg.component';

describe('GrafySvgComponent', () => {
  let component: GrafySvgComponent;
  let fixture: ComponentFixture<GrafySvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrafySvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafySvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
