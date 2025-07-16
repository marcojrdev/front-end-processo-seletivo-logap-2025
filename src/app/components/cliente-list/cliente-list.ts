import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Cliente} from '../../services/cliente/cliente';

@Component({
  selector: 'app-cliente-list',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './cliente-list.html',
  styleUrl: './cliente-list.css'
})
export class ClienteList implements OnInit{
   clientes: Cliente[] = [];
  isLoading = true;

  private clienteService = inject(Cliente);
  private router = inject(Router);

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.isLoading = true;
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        this.isLoading = false;
      }
    });
  }

  editarCliente(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/clientes/editar', id]);
    }
  }

  deletarCliente(id: number | undefined): void {
    if (id && confirm('Tem certeza que deseja deletar este cliente?')) {
      this.clienteService.deletarCleinte(id).subscribe({
        next: () => {
          console.log('Cliente deletado com sucesso!');
          this.carregarClientes(); // Recarrega a lista
        },
        error: (err) => {
          console.error('Erro ao deletar cliente:', err);
        }
      });
    }
  }

  adicionarCliente(): void {
    this.router.navigate(['/cliente/novo']);
  }
}
