import { routes } from './../../app.routes';
import { Component, OnInit, inject, PLATFORM_ID, Inject  } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // Módulos comuns
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService, PedidoResponse } from '../../services/pedidos/pedidoService';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-pedido-detalhado',
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './pedido-detalhado.html',
  styleUrl: './pedido-detalhado.css'
})
export class PedidoDetalhado {
  pedido: PedidoResponse | null = null;
  isLoading = true;

  private route = inject(ActivatedRoute);
  private pedidoService = inject(PedidoService);
  private router = inject(Router);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const pedidoId = Number(params.get('id'));
      if (pedidoId) {
        this.carregarPedido(pedidoId);
      } else {
        this.isLoading = false;
        console.error('ID do pedido não fornecido.');
      }
    });

    if (isPlatformBrowser(this.platformId) && this.isLoading == true) {
    window.location.reload();

    }
   }

   carregarPedido(id: number): void {
    this.isLoading = true;
    this.pedidoService.getPedidoById(id).subscribe({
      next: (data) => {
        this.pedido = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar pedido:', err);
        this.isLoading = false;
      }
    });

   }

  voltarParaLista(): void {
    this.router.navigate(['/pedidos']);
  }
}
