import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastrarProduto } from './modal-cadastrar-produto.component';

describe('ModalCadastrarProduto', () => {
  let component: ModalCadastrarProduto;
  let fixture: ComponentFixture<ModalCadastrarProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCadastrarProduto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastrarProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
