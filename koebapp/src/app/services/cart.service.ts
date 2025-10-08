import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Define a type for a CartItem, which includes the quantity
interface CartItem {
  name: string;
  price: number;
  image: string;
  bgColor: string;
  quantity: number;
}

// Reuse the Shoe interface from home.page.ts for items coming in
interface Shoe {
  name: string;
  price?: number;
  image: string;
  bgColor: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cart: any[] = [];

  addItem(item: any) {
    this.cart.push(item);
    console.log('Cart:', this.cart);
  }

  getItems() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
  }
  // Use a BehaviorSubject to hold the list of items and notify subscribers of changes
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  
  // Expose the cart as an Observable so components can subscribe to updates
  public cart$ = this.cartItems.asObservable();

  constructor() { 
    // Load cart from local storage on service initialization
    this.loadCart();
  }

  private loadCart(): void {
    const storedCart = localStorage.getItem('appCart');
    if (storedCart) {
      this.cartItems.next(JSON.parse(storedCart));
    }
  }

  private saveCart(): void {
    localStorage.setItem('appCart', JSON.stringify(this.cartItems.getValue()));
  }

  getCartItems(): CartItem[] {
    return this.cartItems.getValue();
  }

  addToCart(shoe: Shoe): void {
    const currentItems = this.cartItems.getValue();
    const existingItem = currentItems.find(item => item.name === shoe.name);

    if (existingItem) {
      // If item exists, just increase the quantity
      existingItem.quantity += 1;
    } else {
      // If item is new, add it to the cart
      const newItem: CartItem = {
        name: shoe.name,
        price: shoe.price || 0, // Use 0 if price is undefined/optional
        image: shoe.image,
        bgColor: shoe.bgColor,
        quantity: 1
      };
      currentItems.push(newItem);
    }
    
    // Update the BehaviorSubject and save to storage
    this.cartItems.next(currentItems);
    this.saveCart();
  }
  
  // Method to remove an item from the cart
  removeItem(index: number): void {
    const currentItems = this.cartItems.getValue();
    currentItems.splice(index, 1);
    this.cartItems.next(currentItems);
    this.saveCart();
  }
}