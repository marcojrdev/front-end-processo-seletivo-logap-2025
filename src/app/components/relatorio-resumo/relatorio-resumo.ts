import { Component, OnInit, inject, PLATFORM_ID, Inject  } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RelatorioService, ResumoVendas } from '../../services/relatorio/relatorio-service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-relatorio-resumo',
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './relatorio-resumo.html',
  styleUrl: './relatorio-resumo.css'
})
export class RelatorioResumo {
   resumo: ResumoVendas | null = null;
  isLoading = true;

  private relatorioService = inject(RelatorioService);
   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}



  ngOnInit(): void {
    this.carregarResumoVendas();
    if (isPlatformBrowser(this.platformId) && this.isLoading == true) {
    window.location.reload();

    }
  }

  carregarResumoVendas(): void {
    this.isLoading = true;
    this.relatorioService.getResumoVendas().subscribe({
      next: (data) => {
        this.resumo = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar resumo de vendas:', err);
        this.isLoading = false;
      }
    });
  }

}
