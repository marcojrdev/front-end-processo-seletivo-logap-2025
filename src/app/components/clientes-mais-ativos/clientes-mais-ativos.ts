import { Component, OnInit, inject, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RelatorioService, ClienteAtivo } from '../../services/relatorio/relatorio-service'
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-clientes-mais-ativos',
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './clientes-mais-ativos.html',
  styleUrl: './clientes-mais-ativos.css'
})
export class ClientesMaisAtivos {
  clientesAtivos: ClienteAtivo[] = [];
  isLoading = true;

  private relatorioService = inject(RelatorioService);
   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}


  ngOnInit(): void {
    this.carregarClientesAtivos();
    if (isPlatformBrowser(this.platformId) && this.isLoading == true) {
    window.location.reload();

    }
  }

  carregarClientesAtivos(): void {
    this.isLoading = true;
    this.relatorioService.getClientesMaisAtivos().subscribe({
      next: (data) => {
        this.clientesAtivos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes mais ativos:', err);
        this.isLoading = false;
      }
    });
  }

}
