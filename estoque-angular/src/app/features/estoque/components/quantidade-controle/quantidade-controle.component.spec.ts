import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantidadeControleComponent } from './quantidade-controle.component';

describe('QuantidadeControleComponent', () => {
  let component: QuantidadeControleComponent;
  let fixture: ComponentFixture<QuantidadeControleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuantidadeControleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantidadeControleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
