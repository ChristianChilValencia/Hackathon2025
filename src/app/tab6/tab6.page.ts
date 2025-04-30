import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss'],
  standalone: false,
})
export class Tab6Page {
  products: any[] = [];
  cartItems: any[] = [];

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private productsService: ProductsService
  ) {}

  ionViewWillEnter() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productsService.loadProducts();
    this.cartItems = this.productsService.getCartItems();
  }

  // Add this method to handle template calls
  adjustQuantity(product: any, change: number) {
    const updatedProduct = this.productsService.adjustQuantity(product, change);
    if (change > 0) {
      this.presentToast(`${updatedProduct.name} added to cart`);
    } else if (change < 0 && updatedProduct.quantity > 0) {
      this.presentToast(`Removed one ${updatedProduct.name} from cart`);
    } else if (change < 0 && updatedProduct.quantity === 0) {
      this.presentToast(`${updatedProduct.name} removed from cart`);
    }
    return updatedProduct;
  }

  async showCustomerActionSheet(product: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: product.name,
      subHeader: `Price: ₱${product.price}`,
      buttons: [
        {
          text: 'Add to Cart',
          icon: 'cart',
          handler: () => {
            const updatedProduct = this.productsService.adjustQuantity(product, 1);
            this.presentToast(`${updatedProduct.name} added to cart`);
          }
        },
        {
          text: 'Adjust Quantity',
          icon: 'calculator',
          handler: () => {
            this.showQuantityPrompt(product);
          }
        },
        {
          text: product.quantity > 0 ? 'Remove from Cart' : 'View Details',
          icon: product.quantity > 0 ? 'trash' : 'information-circle',
          role: product.quantity > 0 ? 'destructive' : undefined,
          handler: () => {
            if (product.quantity > 0) {
              this.removeFromCart(product);
            } else {
              this.showProductDetails(product);
            }
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

  async showQuantityPrompt(product: any) {
    const alert = await this.alertCtrl.create({
      header: 'Adjust Quantity',
      message: `${product.name} - ₱${product.price}`,
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          min: 0,
          max: 99,
          value: product.quantity.toString()
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (data) => {
            const quantity = parseInt(data.quantity, 10);
            if (!isNaN(quantity) && quantity >= 0) {
              const updatedProduct = this.productsService.updateQuantity(product, quantity);
              this.presentToast(quantity > 0 ? 
                `${updatedProduct.name} x ${quantity} added to cart` : 
                `${updatedProduct.name} removed from cart`);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  removeFromCart(product: any) {
    if (this.productsService.removeFromCart(product)) {
      this.presentToast(`${product.name} removed from cart`);
    }
  }

  async showProductDetails(product: any) {
    const alert = await this.alertCtrl.create({
      header: product.name,
      subHeader: `Price: ₱${product.price}`,
      message: product.description || 'No description available',
      buttons: ['OK']
    });

    await alert.present();
  }

  getTotalItems() {
    return this.productsService.getTotalItems();
  }

  getCartTotal() {
    return this.productsService.getCartTotal();
  }

  async goToCheckout() {
    if (this.cartItems.length === 0) {
      this.presentToast('Your cart is empty');
      return;
    }

    // Calculate total
    const total = this.getCartTotal();
    
    const alert = await this.alertCtrl.create({
      header: 'Checkout',
      message: `Total: ₱${total.toFixed(2)}<br><br>Proceed to payment?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Checkout',
          handler: async () => {
            // Process checkout via service
            const success = await this.productsService.processCheckout();
            if (success) {
              this.loadProducts(); // Refresh products and cart
              this.presentToast('Order placed successfully!');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
