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
      imageType: '',
      price: 0,
      kilos: 0,
      quantityAmount: 0,
      quantityUnit: 'pieces',
      harvestDate: new Date().toISOString(),
      wasteDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // Default to 14 days from now
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
    
    // Make sure we have all required fields with defaults
    if (!this.product.price) {
      this.product.price = 0;
    }
    
    if (!this.product.kilos) {
      this.product.kilos = 0;
    }
    
    if (!this.product.quantityAmount) {
      this.product.quantityAmount = 0;
    }
    
    if (!this.product.quantityUnit) {
      this.product.quantityUnit = 'pieces';
    }
    
    if (!this.product.harvestDate) {
      this.product.harvestDate = new Date().toISOString();
    }
    
    if (!this.product.wasteDate) {
      this.product.wasteDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
    }
    
    return this.modalCtrl.dismiss(this.product, 'confirm');
  }
}