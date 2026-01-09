import { Component } from '@angular/core';
import { ProductsComponent } from './pages/products/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsComponent],
  template: `<app-products></app-products>`
})
export class AppComponent {}
