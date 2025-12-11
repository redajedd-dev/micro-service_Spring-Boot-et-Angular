import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-inventory',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './inventory.component.html',
    styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
    products: any[] = [];
    loading = true;
    error: string | null = null;

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        this.api.get('/inventory-service/api/products').subscribe({
            next: (data) => {
                this.products = data._embedded ? data._embedded.products : data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching inventory:', err);
                this.error = 'Failed to load inventory.';
                this.loading = false;
            }
        });
    }

    isLowStock(quantity: number): boolean {
        return quantity < 10;
    }
}
