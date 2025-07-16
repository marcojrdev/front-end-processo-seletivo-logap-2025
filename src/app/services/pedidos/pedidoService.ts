import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

export interface ItemPedidoRequest {
  produtoId: number;
  quantidade: number;
}

export interface CriarPedidoRequest {
  clienteId: number;
  itens: ItemPedidoRequest[];
}

export interface AtualizarStatusPedidoRequest {
  novoStatus: string;
}

export interface ItemPedidoResponse {
  id: number;
  produtoId: number;
  nomeProduto: string;
  valorUnitarioProduto: number;
  quantidade: number;
  subtotal: number;
}

export interface PedidoResponse {
  id: number;
  clienteId: number;
  nomeCliente: string;
  dataPedido: string;
  status: 'EM_ANDAMENTO' | 'FINALIZADO' | 'CANCELADO';
  valorTotal: number;
  itens: ItemPedidoResponse[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/pedidos';
  private http = inject(HttpClient);

  getPedidos(): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(this.apiUrl);
  }

  getPedidoById(id: number): Observable<PedidoResponse> {
    return this.http.get<PedidoResponse>(`${this.apiUrl}/${id}`);
  }

  criarPedido(pedido: CriarPedidoRequest): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(this.apiUrl, pedido);
  }

  atualizarStatusPedido(id: number, novoStatus: string): Observable<PedidoResponse> {
    const body: AtualizarStatusPedidoRequest = { novoStatus: novoStatus };
    return this.http.put<PedidoResponse>(`${this.apiUrl}/${id}/status`, body);
  }

  deletarPedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
