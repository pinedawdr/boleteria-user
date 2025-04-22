import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacidadComponent } from './privacidad.component';

describe('PrivacidadComponent', () => {
  let component: PrivacidadComponent;
  let fixture: ComponentFixture<PrivacidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacidadComponent]
    });
    fixture = TestBed.createComponent(PrivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
