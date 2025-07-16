import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../services/cliente/cliente';

@Component({
  selector: 'app-cliente-form',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css'
})
export class ClienteForm implements OnInit{
  clienteForm: FormGroup;
  isEditing = false;
  clienteId: number | null = null;

  private fb = inject(FormBuilder);
  private clienteService = inject(Cliente);
  public router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.clienteId = +id;
        this.clienteService.getClienteById(this.clienteId).subscribe({
          next: (cliente) => {
            this.clienteForm.patchValue(cliente);
          },
          error: (err) => {
            console.error('Erro ao carregar cliente para edição:', err);
          }
        });
      }
    });
  }

  salvarCliente(): void {
    if (this.clienteForm.valid) {
      const cliente: Cliente = this.clienteForm.value;
      if (this.isEditing && this.clienteId) {
        this.clienteService.atualizarCliente(this.clienteId, cliente).subscribe({
          next: () => {
            console.log('Cliente atualizado com sucesso!');
            this.router.navigate(['/clientes']);
          },
          error: (err) => {
            console.error('Erro ao atualizar cliente:', err);
          }
        });
      } else {
        this.clienteService.criarCliente(cliente).subscribe({
          next: () => {
            console.log('Cliente criado com sucesso!');
            this.router.navigate(['/clientes']);
          },
          error: (err) => {
            console.error('Erro ao criar cliente:', err);
          }
        });
      }
    }
  }

}
