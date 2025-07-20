import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService, Order } from '../../services/orders.service';
import { FormsModule } from '@angular/forms';
import { SortArrow } from '../dashboard/sort-arrow.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,SortArrow],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];

  loading = false;
  error = '';

  filterDescription = '';
  filterSource = '';
  filterDate = '';

  // Pagination properties
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  // Sorting properties
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  ordersService = inject(OrdersService);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.error = '';
    this.ordersService.searchOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load orders';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    let tempOrders = this.orders.filter(order => {
      const descMatch = order.description.toLowerCase().includes(this.filterDescription.toLowerCase());
      const sourceMatch = order.source.toLowerCase().includes(this.filterSource.toLowerCase());
      const dateMatch = this.filterDate ? order.dateOrder.startsWith(this.filterDate) : true;
      return descMatch && sourceMatch && dateMatch;
    });

    // Sort
    if (this.sortColumn) {
      tempOrders = tempOrders.sort((a, b) => {
        const valA = this.getFieldValue(a, this.sortColumn);
        const valB = this.getFieldValue(b, this.sortColumn);
        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.totalPages = Math.ceil(tempOrders.length / this.pageSize);

    // Pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredOrders = tempOrders.slice(startIndex, startIndex + this.pageSize);
  }

  getFieldValue(order: Order, field: string) {
    switch(field) {
      case 'id': return order.id;
      case 'description': return order.description.toLowerCase();
      case 'source': return order.source.toLowerCase();
      case 'address': return order.address.toLowerCase();
      case 'dateOrder': return order.dateOrder;
      case 'state': return order.state;
      case 'orderNumber': return order.orderNumber.toLowerCase();
      case 'client': return order.client.firstName.toLowerCase() + ' ' + order.client.lastName.toLowerCase();
      default: return '';
    }
  }

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.currentPage = newPage;
    this.applyFilters();
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      // Toggle sort direction
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

}
