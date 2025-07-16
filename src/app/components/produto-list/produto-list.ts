import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Produto, ProdutoService } from '../../services/produo/produto-service';

@Component({
  selector: 'app-produto-list',
  imports: [
    CommonModule,
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './produto-list.html',
  styleUrl: './produto-list.css'
})
export class ProdutoList {
  produtos: Produto[] = [];
  isLoading = true;

  private produtoService = inject(ProdutoService);
  private router = inject(Router);


  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.isLoading = true;
    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.isLoading = false;
      }
    });
  }

  editarProduto(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/produtos/editar', id]);
    }
  }

  deletarProduto(id: number | undefined): void {
    if (id && confirm('Tem certeza que deseja deletar este produto?')) {
      this.produtoService.deletarProduto(id).subscribe({
        next: () => {
          console.log('Produto deletado com sucesso!');
          this.carregarProdutos();
        },
        error: (err) => {
          console.error('Erro ao deletar produto:', err);
        }
      });
    }
  }

  adicionarProduto(): void {
    this.router.navigate(['/produto/novo']);
  }
}
