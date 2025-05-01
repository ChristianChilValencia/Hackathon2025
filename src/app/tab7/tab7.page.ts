import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
  standalone: false
})
export class Tab7Page implements OnInit {
  orders: any[] = [];

  constructor(
    private productsService: ProductsService,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  ionViewWillEnter() {
    this.loadOrders();
  }

  loadOrders() {
    this.orders = this.productsService.loadOrders();
  }

  async showOrderDetails(order: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: `Order #${order.id.substring(order.id.length - 6)}`,
      subHeader: `Date: ${new Date(order.orderDate).toLocaleString()}`,
      buttons: [
        {
          text: 'View Order Details',
          icon: 'information-circle',
          handler: () => {
            this.displayOrderDetails(order);
          }
        },
        {
          text: 'Cancel Order',
          icon: 'close-circle',
          role: 'destructive',
          handler: () => {
            this.confirmCancelOrder(order);
          }
        },
        {
          text: 'Close',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async displayOrderDetails(order: any) {
    // Generate order items list for display
    let itemsList = '';
    order.items.forEach((item: any) => {
      itemsList += `${item.name} x ${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}<br>`;
    });

    const alert = await this.alertCtrl.create({
      header: `Order #${order.id.substring(order.id.length - 6)}`,
      subHeader: `Date: ${new Date(order.orderDate).toLocaleString()}`,
      message: `
        <ion-list lines="none">
          <ion-item>
            <ion-label>
              <p><strong>Items:</strong></p>
              <p>${itemsList}</p>
            </ion-label>
          </ion-item>
          
          <ion-item>
            <ion-label>
              <p><strong>Status:</strong> ${order.status}</p>
            </ion-label>
          </ion-item>
          
          <ion-item>
            <ion-label>
              <p><strong>Total:</strong> ₱${order.total.toFixed(2)}</p>
            </ion-label>
          </ion-item>
          
          <ion-item>
            <ion-label>
              <p><strong>Delivery Address:</strong></p>
              <p>${order.deliveryAddress}</p>
            </ion-label>
          </ion-item>
          
          <ion-item>
            <ion-label>
              <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      `,
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmCancelOrder(order: any) {
    const alert = await this.alertCtrl.create({
      header: 'Cancel Order',
      message: 'Are you sure you want to cancel this order?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes, Cancel Order',
          handler: () => {
            this.cancelOrder(order);
          }
        }
      ]
    });

    await alert.present();
  }

  cancelOrder(order: any) {
    // Find the order in the array
    const orderIndex = this.orders.findIndex(o => o.id === order.id);
    if (orderIndex !== -1) {
      // Update status
      this.orders[orderIndex].status = 'Cancelled';
      
      // Save orders
      this.productsService.saveOrders();
      
      // Show confirmation
      this.showCancelConfirmation();
    }
  }

  async showCancelConfirmation() {
    const alert = await this.alertCtrl.create({
      header: 'Order Cancelled',
      message: 'Your order has been cancelled successfully.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
