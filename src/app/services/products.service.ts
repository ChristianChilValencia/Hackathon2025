import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: any[] = [];
  private cartItems: any[] = [];
  private completedOrders: any[] = [];

  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

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
    
    return this.products;
  }

  loadOrders() {
    const storedOrders = localStorage.getItem('orders');
    this.completedOrders = storedOrders ? JSON.parse(storedOrders) : [];
    return this.completedOrders;
  }

  getProducts() {
    return this.products;
  }

  getOrders() {
    return this.completedOrders;
  }

  getCartItems() {
    return this.cartItems;
  }

  adjustQuantity(product: any, change: number) {
    const newQuantity = (product.quantity || 0) + change;
    if (newQuantity >= 0) {
      return this.updateQuantity(product, newQuantity);
    }
    return product;
  }

  updateQuantity(product: any, quantity: number) {
    // Update product quantity
    const productIndex = this.products.findIndex(p => p.id === product.id);
    if (productIndex !== -1) {
      this.products[productIndex].quantity = quantity;
    }
    
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
    
    return product;
  }

  removeFromCart(product: any) {
    const existingItemIndex = this.cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      this.cartItems.splice(existingItemIndex, 1);
      
      const productIndex = this.products.findIndex(p => p.id === product.id);
      if (productIndex !== -1) {
        this.products[productIndex].quantity = 0;
      }
      
      this.saveCart();
      return true;
    }
    return false;
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  saveOrders() {
    localStorage.setItem('orders', JSON.stringify(this.completedOrders));
  }

  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal() {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  processOrder(orderDetails: any) {
    if (this.cartItems.length === 0) {
      return false;
    }

    // Calculate total weight (treating quantity as kg)
    const totalWeight = this.cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Create a new order with all details
    const newOrder = {
      id: Date.now().toString(),
      orderDate: new Date(),
      receivedDate: new Date(),
      dispatchedDate: null,
      deliveredDate: null,
      items: [...this.cartItems],
      total: this.getCartTotal(),
      weight: totalWeight,
      status: 'Order Received',
      ...orderDetails
    };

    // Add to completed orders
    this.completedOrders.push(newOrder);
    this.saveOrders();
    
    // Clear cart
    this.cartItems = [];
    this.saveCart();
    
    // Reset product quantities
    this.products.forEach(product => {
      product.quantity = 0;
    });
    
    return true;
  }

  async processCheckout() {
    if (this.cartItems.length === 0) {
      return false;
    }

    // Clear cart
    this.cartItems = [];
    this.saveCart();
    
    // Reset product quantities
    this.products.forEach(product => {
      product.quantity = 0;
    });
    
    return true;
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
