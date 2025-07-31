import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { RelatorioService, PedidoPendente } from '../../services/relatorio/relatorio-service';
import { isPlatformBrowser } from '@angular/common';


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
   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  ngOnInit(): void {
    this.carregarPedidosPendentes();
    if (isPlatformBrowser(this.platformId) && this.isLoading == true) {
    window.location.reload();

    }

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
