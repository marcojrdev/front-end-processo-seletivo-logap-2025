import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RelatorioService, PedidoPendente } from '../../services/relatorio/relatorio-service';

@Component({
  selector: 'app-relatorio-pedidos-pendentes',
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './relatorio-pedidos-pendentes.html',
  styleUrl: './relatorio-pedidos-pendentes.css'
})
export class RelatorioPedidosPendentes {

  pedidosPendentes: PedidoPendente[] = [];
  isLoading = true;

  private relatorioService = inject(RelatorioService);

  ngOnInit(): void {
    this.carregarPedidosPendentes();
  }

  carregarPedidosPendentes(): void {
    this.isLoading = true;
    this.relatorioService.getPedidosPendentes().subscribe({
      next: (data) => {
        this.pedidosPendentes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos pendentes:', err);
        this.isLoading = false;
      }
    });
  }

}
