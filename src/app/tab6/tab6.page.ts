import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

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
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    this.loadProducts();
  }

  loadProducts() {
    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
    
    // Initialize quantity for each product
    this.products.forEach(product => {
      if (!product.quantity) {
        product.quantity = 0;
      }
    });
    
    // Load cart if available
    const storedCart = localStorage.getItem('cart');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    
    // Update quantities from cart
    if (this.cartItems.length > 0) {
      this.cartItems.forEach(item => {
        const productIndex = this.products.findIndex(p => p.id === item.id);
        if (productIndex !== -1) {
          this.products[productIndex].quantity = item.quantity;
        }
      });
    }
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
            this.adjustQuantity(product, 1);
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
              this.updateQuantity(product, quantity);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  adjustQuantity(product: any, change: number) {
    const newQuantity = (product.quantity || 0) + change;
    if (newQuantity >= 0) {
      this.updateQuantity(product, newQuantity);
    }
  }

  updateQuantity(product: any, quantity: number) {
    // Update product quantity
    product.quantity = quantity;
    
    // Update cart
    const existingItemIndex = this.cartItems.findIndex(item => item.id === product.id);
    
    if (quantity > 0) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      };
      
      if (existingItemIndex !== -1) {
        this.cartItems[existingItemIndex] = cartItem;
      } else {
        this.cartItems.push(cartItem);
      }
    } else if (existingItemIndex !== -1) {
      // Remove item if quantity is 0
      this.cartItems.splice(existingItemIndex, 1);
    }
    
    // Save cart
    this.saveCart();
    
    // Show toast confirmation
    this.presentToast(quantity > 0 ? 
      `${product.name} x ${quantity} added to cart` : 
      `${product.name} removed from cart`);
  }

  removeFromCart(product: any) {
    const existingItemIndex = this.cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      this.cartItems.splice(existingItemIndex, 1);
      product.quantity = 0;
      this.saveCart();
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

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal() {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  async goToCheckout() {
    if (this.cartItems.length === 0) {
      this.presentToast('Your cart is empty');
      return;
    }

    // Calculate total
    const total = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
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
          handler: () => {
            // Here you would normally redirect to a payment page
            // For now, just clear the cart and show success
            this.cartItems = [];
            this.saveCart();
            this.loadProducts(); // Reset product quantities
            this.presentToast('Order placed successfully!');
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
