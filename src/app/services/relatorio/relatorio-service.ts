import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResumoVendas {
  totalPedidosRealizados: number;
  valorTotalFaturado: number;
  quantidadeTotalProdutosVendido: number;
}

export interface PedidoPendente {
  idPedido: number;
  nomeCliente: string;
  dataPedido: string;
  valorTotal: number;
  status: string
}

export interface ClienteAtivo {
  idCliente: number;
  nomeCliente: string;
  totalPedidos: number;
}

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private apiUrl = 'http://localhost:8080/api/relatorios';
  private http = inject(HttpClient);

  getResumoVendas(): Observable<ResumoVendas> {
    return this.http.get<ResumoVendas>(`${this.apiUrl}/resumo-vendas`);
  }

  getPedidosPendentes(): Observable<PedidoPendente[]> {
    return this.http.get<PedidoPendente[]>(`${this.apiUrl}/pedidos-pendentes`);
  }

  getClientesMaisAtivos(): Observable<ClienteAtivo[]> {
    return this.http.get<ClienteAtivo[]>(`${this.apiUrl}/clientes-ativos`);
  }

}
