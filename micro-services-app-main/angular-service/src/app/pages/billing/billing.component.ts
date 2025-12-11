import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-billing',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './billing.component.html',
    styleUrl: './billing.component.css'
})
export class BillingComponent implements OnInit {
    bills: any[] = [];
    loading = true;
    error: string | null = null;

    constructor(private api: ApiService) { }

    ngOnInit(): void {
        this.api.get('/billing-service/api/bills').subscribe({
            next: (data) => {
                this.bills = data._embedded ? data._embedded.bills : data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching bills:', err);
                this.error = 'Failed to load bills.';
                this.loading = false;
            }
        });

    }
}
