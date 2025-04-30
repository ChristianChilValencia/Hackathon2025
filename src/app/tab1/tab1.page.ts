import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddProductComponent } from '../modals/add-product/add-product.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  products: any[] = [];

  constructor(private modalCtrl: ModalController) {
    this.loadProducts();
  }

  async openAddProductModal() {
    const modal = await this.modalCtrl.create({
      component: AddProductComponent,
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      console.log('New product:', data);
      this.products.push(data);
    }
  }

  loadProducts() {
    
    this.products = [
      {
        name: 'Sample Product 1',
        price: 99.99,
        description: 'This is a sample product'
      },
      {
        name: 'Sample Product 2',
        price: 149.99,
        description: 'Another sample product'
      }
    ];
  }
}