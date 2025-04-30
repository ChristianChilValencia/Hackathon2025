import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class AddProductComponent {
  @Input() product: any;

  constructor(private modalCtrl: ModalController) {
    this.initializeProduct();
  }

  ngOnInit() {
    if (!this.product) {
      this.initializeProduct();
    }
  }

  private initializeProduct() {
    this.product = {
      id: '',
      name: '',
      price: 0,
      description: ''
    };
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if (!this.product?.name?.trim()) {
      return;
    }
    if (!this.product?.price || this.product.price <= 0) {
      return;
    }
    return this.modalCtrl.dismiss(this.product, 'confirm');
  }
}