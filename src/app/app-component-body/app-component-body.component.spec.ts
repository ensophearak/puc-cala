import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponentBodyComponent } from './app-component-body.component';

describe('AppComponentBodyComponent', () => {
  let component: AppComponentBodyComponent;
  let fixture: ComponentFixture<AppComponentBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponentBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponentBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
