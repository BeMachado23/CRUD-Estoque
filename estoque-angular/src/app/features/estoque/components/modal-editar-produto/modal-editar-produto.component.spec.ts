import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarProdutoComponent } from './modal-editar-produto.component';

describe('ModalEditarProdutoComponent', () => {
  let component: ModalEditarProdutoComponent;
  let fixture: ComponentFixture<ModalEditarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditarProdutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditarProdutoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
