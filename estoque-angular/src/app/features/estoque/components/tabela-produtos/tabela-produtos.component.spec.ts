import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaProdutosComponent } from './tabela-produtos.component';

describe('TabelaProdutosComponent', () => {
  let component: TabelaProdutosComponent;
  let fixture: ComponentFixture<TabelaProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaProdutosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaProdutosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
