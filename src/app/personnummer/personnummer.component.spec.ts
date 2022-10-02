import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnummerComponent } from './personnummer.component';

describe('PersonnummerComponent', () => {
  let component: PersonnummerComponent;
  let fixture: ComponentFixture<PersonnummerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnummerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
