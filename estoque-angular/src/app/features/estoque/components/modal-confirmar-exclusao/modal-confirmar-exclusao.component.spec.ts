import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmarExclusaoComponent } from './modal-confirmar-exclusao.component';

describe('ModalConfirmarExclusaoComponent', () => {
  let component: ModalConfirmarExclusaoComponent;
  let fixture: ComponentFixture<ModalConfirmarExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfirmarExclusaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmarExclusaoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
