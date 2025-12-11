import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-customers',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './customers.component.html',
    styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
    customers: any[] = [];
    loading = true;
    error: string | null = null;

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        this.api.get('/customer-service/api/customers').subscribe({
            next: (data) => {
                this.customers = data._embedded ? data._embedded.customers : data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching customers:', err);
                this.error = 'Failed to load customers.';
                this.loading = false;
            }
        });
    }
}
