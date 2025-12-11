import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { BillingComponent } from './pages/billing/billing.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'inventory', component: InventoryComponent },
    { path: 'billing', component: BillingComponent },
    { path: '**', redirectTo: '' }
];
