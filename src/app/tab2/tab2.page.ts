import { Component } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { AddProductComponent } from '../modals/add-product/add-product.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  products: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.loadProducts();
  }

  // Get formatted display for quantity units
  getUnitDisplay(unit: string): string {
    if (!unit) return 'pieces';
    
    // Singular to plural mapping if needed
    switch (unit) {
      case 'piece': return 'pieces';
      case 'bundle': return 'bundles';
      case 'sack': return 'sacks';
      case 'box': return 'boxes';
      case 'crate': return 'crates';
      default: return unit;
    }
  }

  // Format date from ISO string to readable format
  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  // Check if a product is near its waste date (within 3 days)
  isNearWasteDate(dateString: string): boolean {
    if (!dateString) return false;
    
    const wasteDate = new Date(dateString);
    const today = new Date();
    const daysLeft = Math.floor((wasteDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysLeft <= 3 && daysLeft >= 0;
  }

  // Get days until waste date
  getDaysUntilWaste(dateString: string): number {
    if (!dateString) return 0;
    
    const wasteDate = new Date(dateString);
    const today = new Date();
    return Math.max(0, Math.floor((wasteDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
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
      presentingElement: await this.modalCtrl.getTop() || undefined,
      cssClass: 'fullscreen-modal',
      breakpoints: [0, 0.25, 0.5, 0.75, 1],
      initialBreakpoint: 1,
      backdropDismiss: false,
      backdropBreakpoint: 0.5
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
