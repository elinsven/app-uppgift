import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamordningsnummerComponent } from './samordningsnummer.component';

describe('SamordningsnummerComponent', () => {
  let component: SamordningsnummerComponent;
  let fixture: ComponentFixture<SamordningsnummerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamordningsnummerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SamordningsnummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
