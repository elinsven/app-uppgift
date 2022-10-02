import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationsnummerComponent } from './organisationsnummer.component';

describe('OrganisationsnummerComponent', () => {
  let component: OrganisationsnummerComponent;
  let fixture: ComponentFixture<OrganisationsnummerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationsnummerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationsnummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
