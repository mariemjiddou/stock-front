import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../../services/product';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  newProduct = {
    name: '',
    price: 0,
    quantity: 0
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }
addProduct() {
  const payload = {
    name: (this.newProduct.name ?? '').trim(),
    price: Number(this.newProduct.price),
    quantity: Number(this.newProduct.quantity),
  };

  console.log("payload =>", payload);

  this.productService.addProduct(payload).subscribe({
    next: () => {
      this.loadProducts();
      this.newProduct = { name: '', price: 0, quantity: 0 };
    },
  error: (err) => {
  console.log("STATUS =", err.status);
  console.log("ERROR BODY =", err.error);   // ✅ important
  alert(JSON.stringify(err.error, null, 2));
}


  });
}
editingId: string | null = null;

editProduct = {
  name: '',
  price: 0,
  quantity: 0
};
startEdit(p: Product) {
  this.editingId = p.id;
  this.editProduct = {
    name: p.name,
    price: p.price,
    quantity: p.quantity
  };
}

cancelEdit() {
  this.editingId = null;
}

saveEdit() {
  if (!this.editingId) return;

  const payload = {
    name: (this.editProduct.name ?? '').trim(),
    price: Number(this.editProduct.price),
    quantity: Number(this.editProduct.quantity),
  };

  this.productService.updateProduct(this.editingId, payload).subscribe({
    next: () => {
      this.editingId = null;
      this.loadProducts();
    },
    error: (err) => {
      console.log("PUT error =>", err);
      alert("Erreur update");
    }
  });
}

remove(id: string) {
  if (!confirm("Supprimer ce produit ?")) return;

  this.productService.deleteProduct(id).subscribe({
    next: () => this.loadProducts(),
    error: (err) => {
      console.log("DELETE error =>", err);
      alert("Erreur delete");
    }
  });
}


}
