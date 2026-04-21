import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Oscilloscope } from './oscilloscope';

describe('Oscilloscope', () => {
  let component: Oscilloscope;
  let fixture: ComponentFixture<Oscilloscope>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Oscilloscope]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Oscilloscope);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
