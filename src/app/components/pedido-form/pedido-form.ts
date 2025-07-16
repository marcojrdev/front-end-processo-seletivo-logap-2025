import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms'; // ReactiveFormsModule
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService, CriarPedidoRequest, ItemPedidoRequest, PedidoResponse } from '../../services/pedidos/pedidoService';
import {  Cliente } from '../../services/cliente/cliente';
import { ProdutoService, Produto } from '../../services/produo/produto-service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-pedido-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pedido-form.html',
  styleUrl: './pedido-form.css'
})
export class PedidoForm implements OnInit {
  pedidoForm: FormGroup;
  clientes: Cliente[] = [];
  produtos: Produto[] = [];
  isEditing = false;
  pedidoId: number | null = null;

  private fb = inject(FormBuilder);
  private pedidoService = inject(PedidoService);
  private clienteService = inject(Cliente);
  private produtoService = inject(ProdutoService);
  public router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.pedidoForm = this.fb.group({
      clienteId: ['', Validators.required],
      itens: this.fb.array([]),
    });
  }

  ngOnInit(): void {
      forkJoin([
        this.clienteService.getClientes(),
        this.produtoService.getProdutos()
      ]).subscribe({
        next: ([clientesData, produtosData]) => {
          this.clientes = clientesData;
          this.produtos = produtosData;
          this.checkEditMode();
        },
        error: (err) => {
          console.error('Erro ao carregar clientes e produtos', err);
        }
      });
  }

  checkEditMode(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.pedidoId = +id;
        this.loadPedidoForEdit(this.pedidoId);
      }else {
        this.isEditing = false;
        this.adicionarItem();
      }
    });
  }

  loadPedidoForEdit(id: number): void {
    this.pedidoService.getPedidoById(id).subscribe({
      next: (pedido) => {
        this.pedidoForm.patchValue({
          clienteId: pedido.clienteId
        });

        this.itens.clear();
        pedido.itens.forEach(item => {
          this.itens.push(this.fb.group({
            produtoId: [item.produtoId, Validators.required],
            quantidade: [item.quantidade, [Validators.required, Validators.min(1)]]

          }));
        });
      },
      error: (err) => {
        console.error('Erro ao carregar pedido para edição', err);
      }

    });
  }

  get itens() {
    return this.pedidoForm.get('itens') as FormArray;
  }

  adicionarItem(): void {
    this.itens.push(this.fb.group({
      produtoId: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(1)]]
    }));
  }

  removerItem(index: number): void {
    this.itens.removeAt(index);
  }

  salvarPedido(): void {
    if (this.pedidoForm.valid) {
      const formValue = this.pedidoForm.value;
      const pedidoRequest: CriarPedidoRequest = {
        clienteId: formValue.clienteId,
        itens: formValue.itens
      };

      if (this.isEditing && this.pedidoId) {
        // Lógica para atualização do pedido (se o backend tiver um endpoint para isso)
        // Atualmente, nosso backend só tem atualização de status e exclusão.
        // Você precisaria de um PUT /api/pedidos/{id} que aceite o corpo completo do pedido.
        // Por agora, este formulário só funcionará para CRIAR novos pedidos.
        console.warn('Funcionalidade de edição completa do pedido não implementada no backend. Este formulário só cria pedidos.');
        alert('Funcionalidade de edição completa do pedido não implementada no backend. Edite o status ou delete o pedido.');
        this.router.navigate(['/pedidos']);
      } else {
        this.pedidoService.criarPedido(pedidoRequest).subscribe({
          next: (pedidoCriado) => {
            console.log('Pedido criado com sucesso:', pedidoCriado);
            this.router.navigate(['/pedidos']);
          },
          error: (err) => {
            console.error('Erro ao criar pedido', err);
            alert('Erro ao criar pedido. Verifique os dados e tente novamente.');
          }
        });
      }
    }
  }

}
