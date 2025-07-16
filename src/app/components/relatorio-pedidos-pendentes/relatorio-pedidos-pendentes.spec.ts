import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPedidosPendentes } from './relatorio-pedidos-pendentes';

describe('RelatorioPedidosPendentes', () => {
  let component: RelatorioPedidosPendentes;
  let fixture: ComponentFixture<RelatorioPedidosPendentes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioPedidosPendentes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioPedidosPendentes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
