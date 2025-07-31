import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { Home } from './components/home/home';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
     FormsModule,
     CommonModule,
     RouterLink,
     HttpClientModule,
     Home,
    ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-end-processo-seletivo-logap-2025');

   constructor(private Router: Router) {}



  irParaPaginahome() {
    this.Router.navigate(['/']);

  }
}
