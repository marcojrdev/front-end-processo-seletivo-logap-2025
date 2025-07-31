import { Component, OnInit, inject, PLATFORM_ID, Inject  } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Produto, ProdutoService } from '../../services/produo/produto-service';
import { Subject, takeUntil } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';



@Component({
  selector: 'app-produto-list',
  standalone: true,
  //host: { 'ngSkipHydration': 'true' },
  imports: [
    CommonModule,
    RouterLink,
    CurrencyPipe,
  ],
  templateUrl: './produto-list.html',
  styleUrl: './produto-list.css'
})
export class ProdutoList implements OnInit{
  produtos: Produto[] = [];
  isLoading = true;

  private produtoService = inject(ProdutoService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}



  ngOnInit(): void {
    console.log('ngOnInit foi chamado!');
    this.carregarProdutos();
    if (isPlatformBrowser(this.platformId) && this.isLoading == true) {
    window.location.reload();

    }

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
