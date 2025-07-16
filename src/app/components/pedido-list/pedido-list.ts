import { PedidoService } from './../../services/pedidos/pedidoService';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PedidoResponse } from '../../services/pedidos/pedidoService';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './pedido-list.html',
  styleUrl: './pedido-list.css'
})
export class PedidoList implements OnInit{
  pedidos: PedidoResponse[] = [];
  isLoading = true;

  private PedidoService = inject(PedidoService);
  private router = inject(Router);

  ngOnInit(): void {
      this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.isLoading = true;
    this.PedidoService.getPedidos().subscribe({
      next: (data) =>{
        this.pedidos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar pedidos:', err);
        this.isLoading = false;
        alert('Erro ao carregar pedidos. Tente novamente mais tarde.');
      }
    });
  }
  verDetalhes(pedidoId: number): void {
    this.router.navigate(['/pedido', pedidoId]);
  }

 mudarStatus(id: number, novoStatus: 'EM_ANDAMENTO' | 'FINALIZADO' | 'CANCELADO'): void {
  if (confirm(`Deseja realmente mudar o status do pedido ${id} para ${novoStatus}?`)) {
    this.PedidoService.atualizarStatusPedido(id, novoStatus).subscribe({
      next: (pedidoAtualizado) => {
        console.log('Status atualizado com sucesso:', pedidoAtualizado);
        this.carregarPedidos();
      },
      error: (err) => {
        console.error('Erro ao atualizar status:', err);
        alert('Erro ao atualizar status. Tente novamente mais tarde.');
      }
    });
  }
 }

 deletarPedido(id: number): void {
  if (confirm('Deseja realmente deletar este pedido?')) {
    this.PedidoService.deletarPedido(id).subscribe({
      next: () => {
        console.log('Pedido deletado com sucesso');
        this.carregarPedidos();
      },
      error: (err) => {
        console.error('Erro ao deletar pedido:', err);
        alert('Erro ao deletar pedido. Tente novamente mais tarde.');
      }
    })
  }
 }

 adicionarPedido(): void {
  this.router.navigate(['/pedido/novo']);
 }

}
