import { Injectable } from '@angular/core';
import { CapacitorSQLite } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private initialized = false;

  constructor() {
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    if (this.initialized) return;
    
    try {
      // Create connection
      await CapacitorSQLite.echo({ value: 'test' });
      
      // Create connection
      await CapacitorSQLite.createConnection({
        database: 'products_db'
      });

      // Create tables
      await CapacitorSQLite.execute({
        database: 'products_db',
        statements: `
          CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            description TEXT
          );
        `
      });

      this.initialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  async getProducts(): Promise<any[]> {
    if (!this.initialized) {
      await this.initializeDatabase();
    }
    try {
      const result = await CapacitorSQLite.query({
        database: 'products_db',
        statement: 'SELECT * FROM products',
        values: []
      });
      return result?.values || [];
    } catch (error) {
      console.error('Error getting products:', error);
      return [];
    }
  }

  async addProduct(product: any): Promise<void> {
    if (!this.initialized) {
      await this.initializeDatabase();
    }
    try {
      await CapacitorSQLite.run({
        database: 'products_db',
        statement: 'INSERT INTO products (id, name, price, description) VALUES (?, ?, ?, ?)',
        values: [product.id, product.name, product.price, product.description]
      });
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  async updateProduct(product: any): Promise<void> {
    if (!this.initialized) {
      await this.initializeDatabase();
    }
    try {
      await CapacitorSQLite.run({
        database: 'products_db',
        statement: 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?',
        values: [product.name, product.price, product.description, product.id]
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    if (!this.initialized) {
      await this.initializeDatabase();
    }
    try {
      await CapacitorSQLite.run({
        database: 'products_db',
        statement: 'DELETE FROM products WHERE id = ?',
        values: [id]
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}