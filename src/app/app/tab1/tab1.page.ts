import { Component } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { AddProductComponent } from '../modals/add-product/add-product.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  products: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.loadProducts();
  }

  async showActionSheet(product: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Product Options',
      buttons: [
        {
          text: 'Edit',
          icon: 'pencil',
          handler: () => {
            this.openAddProductModal(product);
          }
        },
        {
          text: 'Delete',
          icon: 'trash',
          role: 'destructive',
          handler: () => {
            this.deleteProduct(product);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async openAddProductModal(productToEdit?: any) {
    const modal = await this.modalCtrl.create({
      component: AddProductComponent,
      componentProps: {
        product: productToEdit ? {...productToEdit} : undefined
      },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      if (productToEdit) {
        this.updateProduct(data);
      } else {
        this.addProduct(data);
      }
    }
  }

  loadProducts() {
    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
  }

  addProduct(product: any) {
    product.id = Date.now().toString();
    this.products.push(product);
    this.saveProducts();
  }

  updateProduct(updatedProduct: any) {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.saveProducts();
    }
  }

  deleteProduct(product: any) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    }
  }

  private saveProducts() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}