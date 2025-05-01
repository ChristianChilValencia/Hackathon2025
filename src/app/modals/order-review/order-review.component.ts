import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ProductsService } from 'src/app/services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrderReviewComponent implements OnInit {
  cartItems: any[] = [];
  totalCost: number = 0;
  deliveryAddress: string = '123 Main St, Manila, Philippines';
  billingAddress: string = '123 Main St, Manila, Philippines';
  paymentMethods: string[] = ['Cash on Delivery', 'Credit Card', 'GCash', 'PayMaya'];
  selectedPayment: string = 'Cash on Delivery';

  constructor(
    private modalCtrl: ModalController,
    private productsService: ProductsService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.cartItems = this.productsService.getCartItems();
    this.totalCost = this.productsService.getCartTotal();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async confirmOrder() {
    const orderDetails = {
      deliveryAddress: this.deliveryAddress,
      billingAddress: this.billingAddress,
      paymentMethod: this.selectedPayment,
      status: 'Processing'
    };

    const alert = await this.alertCtrl.create({
      header: 'Confirm Order',
      message: `Are you sure you want to place this order for ₱${this.totalCost.toFixed(2)}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            const success = this.productsService.processOrder(orderDetails);
            if (success) {
              this.presentToast('Order placed successfully!');
              this.modalCtrl.dismiss({ ordered: true });
            } else {
              this.presentToast('Failed to place order. Please try again.');
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
