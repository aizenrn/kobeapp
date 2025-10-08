import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service'; // ⬅️ NEW IMPORT

interface Shoe {
  name: string;
  price?: number;
  image: string;
  bgColor: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // UI flags
  showSearchBar = false;
  searchTerm = '';

  // shoe data
  shoes: Shoe[] = [
    { name: 'Black Gold', price: 180, image: 'assets/shoes/black-blue.png', bgColor: '#2a2a2aff' },
    { name: 'Grey Edition', price: 150, image: 'assets/shoes/grey.png', bgColor: '#b0b0b0' },
    { name: 'Sky Blue', price: 170, image: 'assets/shoes/blue-white.png', bgColor: '#00a7dfff' },
    { name: 'Gold Rush', price: 200, image: 'assets/shoes/gold.png', bgColor: '#d0b101ff' },
    { name: 'Blue Mamba', price: 160, image: 'assets/shoes/blue.png', bgColor: '#1c50ecff' },
    { name: 'Red Kobe', price: 190, image: 'assets/shoes/red.png', bgColor: '#cc3b3bff' },
    { name: 'Mint Flash', price: 175, image: 'assets/shoes/mint.png', bgColor: '#9af7d1' },
    { name: 'Sunset Blaze', price: 210, image: 'assets/shoes/orange.png', bgColor: '#ff8c42' },
    { name: 'Arctic White', price: 160, image: 'assets/shoes/white.png', bgColor: '#f5f5f5' },
    { name: 'Royal Purple', price: 185, image: 'assets/shoes/purple.png', bgColor: '#9b59b6' },
  ];

  filteredShoes: Shoe[] = [];

  constructor(private router: Router, private toastCtrl: ToastController) {}

  ngOnInit(): void {
    this.filteredShoes = [...this.shoes];
  }

  toggleSearch(): void {
    this.showSearchBar = !this.showSearchBar;
    if (!this.showSearchBar) {
      this.searchTerm = '';
      this.filteredShoes = [...this.shoes];
    }
  }

  filterShoes(): void {
    const term = this.searchTerm?.trim().toLowerCase() ?? '';
    if (term === '') {
      this.filteredShoes = [...this.shoes];
      return;
    }
    this.filteredShoes = this.shoes.filter((s) => s.name.toLowerCase().includes(term));
  }

  async openCart(): Promise<void> {
    this.router.navigateByUrl('/cart');
  }

  logout(): void {
    console.log('User logged out.');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
  
  async addToCart(shoe: any) {
  const toast = await this.toastCtrl.create({
    message: `${shoe.name} added to cart!`,
    duration: 1500,
    color: 'success',
    position: 'bottom',
  });
  await toast.present();
}

async buyNow(shoe: any) {
  const toast = await this.toastCtrl.create({
    message: `Buying ${shoe.name} for $${shoe.price}!`,
    duration: 1500,
    color: 'primary',
    position: 'bottom',
  });
  await toast.present();
}

}
