import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Vogal } from '../vogal/vogal';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',

  imports: [ CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

   constructor(private Router: Router) {}

  irParaPagina() {
    this.Router.navigate(['/vogal']);

     }

    PedidosPagina() {
    this.Router.navigate(['/pedidos']);
    }

}
