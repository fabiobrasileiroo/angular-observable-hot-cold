import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, NgModule, Pipe } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, Observable, pairwise, pipe, shareReplay, Subscriber } from 'rxjs';

export interface Product {
  title: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-observables-hot-cold';
  http = inject(HttpClient);
  cold$ = new Observable<number>((Subscriber) => {
    const numeroAleatorio = Math.round(Math.random() * 100);
    console.log('Executado', numeroAleatorio);
    Subscriber.next(numeroAleatorio);
  });
  hot$ = new BehaviorSubject<number>(0);
  produto$ = this.http.get<Product>('https://dummyjson.com/products/1')
  .pipe(shareReplay())
  constructor() {
    // this.cold$.subscribe((valor) => console.log('SUB1', valor));

    // this.cold$.subscribe((valor) => console.log('SUB2', valor));
    this.hot$.subscribe((valor) => console.log('Sub1', valor));
    this.hot$.subscribe((valor) => console.log('Sub2', valor));
    setTimeout(() => {
      this.hot$.next(Math.round(Math.random() * 100));
    }, 5000);
  }
}
