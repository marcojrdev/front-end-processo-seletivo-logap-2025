import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vogal } from './vogal';

describe('Vogal', () => {
  let component: Vogal;
  let fixture: ComponentFixture<Vogal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vogal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vogal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
