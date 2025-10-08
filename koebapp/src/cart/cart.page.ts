import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class CartPage implements OnInit {
  // Placeholder cart items structure (you would typically use a service for real data)
  cartItems = [
    { name: 'Black Gold', price: 180, image: 'assets/shoes/black-blue.png', quantity: 1, bgColor: '#2a2a2aff' },
    { name: 'Gold Rush', price: 200, image: 'assets/shoes/gold.png', quantity: 1, bgColor: '#d0b101ff' },
  ];

  total = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  // Example method to remove an item
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.calculateTotal();
  }

  // Navigate back to the home page or previous page
  goBack() {
    this.router.navigateByUrl('/home');
  }

  // Example checkout functionality
  checkout() {
    console.log('Proceeding to checkout...');
    // Implement actual checkout logic here
  }
}