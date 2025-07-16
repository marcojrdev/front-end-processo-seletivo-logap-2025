import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

import { CommonModule } from '@angular/common';

@Component({

  selector: 'app-vogal',
  imports: [FormsModule,  HttpClientModule, NgIf, CommonModule],
  templateUrl: './vogal.html',
  styleUrl: './vogal.css'
})
export class Vogal {
  entrada = "";
  resposta: any;

  constructor(private http: HttpClient) {}

  buscar() {
    this.http.get(`http://localhost:8080/api/vogal?palavra=${this.entrada}`)
    .subscribe({
      next: (data) => this.resposta = data,
      error: (error) => {
        alert("Erro ao buscar dados: " + error.message);
        this.resposta = null;
      }
    });
  }




}
