import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoDetalhado } from './pedido-detalhado';

describe('PedidoDetalhado', () => {
  let component: PedidoDetalhado;
  let fixture: ComponentFixture<PedidoDetalhado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoDetalhado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidoDetalhado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
