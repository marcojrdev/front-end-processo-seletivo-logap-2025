import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RelatorioService, ResumoVendas } from '../../services/relatorio/relatorio-service';

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

  ngOnInit(): void {
    this.carregarResumoVendas();
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
