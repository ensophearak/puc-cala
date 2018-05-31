
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponentSidenavComponent } from './app-component-sidenav.component';

describe('AppComponentSidenavComponent', () => {
  let component: AppComponentSidenavComponent;
  let fixture: ComponentFixture<AppComponentSidenavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponentSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponentSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
