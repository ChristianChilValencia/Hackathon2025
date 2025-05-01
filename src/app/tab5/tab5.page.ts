import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: false
})
export class Tab5Page implements OnInit {
  
  // Sample data for dashboard metrics
  metrics = {
    pendingOrders: 2,
    likedProducts: 12,
    successfulOrders: 7
  };
  
  // Sample data for organizations
  organizations = [
    {
      id: 1,
      name: 'Sitio Sapang Saging Farmers Association Inc.',
      address: 'Maxima V. Patalinhug, Jr. Avenue, Lapu-Lapu City, Cebu',
      phone: '(032) 236 0000'
    },
    {
      id: 2,
      name: 'Sta. Cecilia MPC',
      address: '7XX7+86Q, MV. Patalinhug Jr Ave, Lapu-Lapu City, 6015 Cebu',
      phone: '0932 154 1564'
    },
    {
      id: 3,
      name: 'Techno Skills',
      address: 'Natalia B. Bacalso Ave, Cebu City, 6000 Cebu',
      phone: '(032) 265 5833'
    },
    {
      id: 4,
      name: 'Apunan Multipurpose Cooperative',
      address: 'Cabreros St, Cebu City, 6000 Cebu',
      phone: '(032) 418 9477'
    },
    {
      id: 5,
      name: 'Tropical Agriculture Cooperative',
      address: 'Tagunal Street, Cebu City, 6000 Cebu',
      phone: '(032) 239 0068'
    }
  ];

  constructor() { }

  ngOnInit() {
    // You can load data from services here
  }

  // Method for viewing more details about pending orders
  viewPendingOrders() {
    console.log('Viewing pending orders');
    // Implementation for navigating to pending orders page
  }

  // Method for viewing more details about liked products
  viewLikedProducts() {
    console.log('Viewing liked products');
    // Implementation for navigating to liked products page
  }

  // Method for viewing more details about successful orders
  viewSuccessfulOrders() {
    console.log('Viewing successful orders');
    // Implementation for navigating to successful orders page
  }

  // Method for viewing all organizations
  viewAllOrganizations() {
    console.log('Viewing all organizations');
    // Implementation for navigating to all organizations page
  }

  // Method for viewing a specific organization
  viewOrganization(id: number) {
    console.log('Viewing organization with ID:', id);
    // Implementation for navigating to specific organization details
  }
}
