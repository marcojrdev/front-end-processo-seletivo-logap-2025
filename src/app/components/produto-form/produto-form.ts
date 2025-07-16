import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto, ProdutoService } from '../../services/produo/produto-service';

@Component({
  selector: 'app-produto-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyPipe
  ],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.css'
})

export class ProdutoForm implements OnInit {
 produtoForm: FormGroup;
  isEditing = false;
  produtoId: number | null = null;

  private fb = inject(FormBuilder);
  private produtoService = inject(ProdutoService);
  public router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      quantidade: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.produtoId = +id;
        this.produtoService.getProdutoById(this.produtoId).subscribe({
          next: (produto) => {
            this.produtoForm.patchValue(produto);
          },
          error: (err) => {
            console.error('Erro ao carregar produto para edição:', err);
          }
        });
      }
    });
  }

  salvarProduto(): void {
    if (this.produtoForm.valid) {
      const produto: Produto = this.produtoForm.value;
      if (this.isEditing && this.produtoId) {
        this.produtoService.atualizarProduto(this.produtoId, produto).subscribe({
          next: () => {
            console.log('Produto atualizado com sucesso!');
            this.router.navigate(['/produtos']);
          },
          error: (err) => {
            console.error('Erro ao atualizar produto:', err);
          }
        });
      } else {
        this.produtoService.criarProduto(produto).subscribe({
          next: () => {
            console.log('Produto criado com sucesso!');
            this.router.navigate(['/produtos']);
          },
          error: (err) => {
            console.error('Erro ao criar produto:', err);
          }
        });
      }
    }
  }
}
