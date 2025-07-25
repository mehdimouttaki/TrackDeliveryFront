import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IntegrationService } from '../../services/integration.service';
import { OrderResponse } from '../../models/OrderResponse';

@Component({
  selector: 'app-modify-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modify-order.component.html',
  styleUrls: ['./modify-order.component.css'],
})
export class ModifyOrderComponent implements OnInit {
  orderId!: number;
  order!: OrderResponse | null;

  integrationService = inject(IntegrationService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadOrder();
  }

  loadOrder() {
    this.integrationService.getOrderById(this.orderId).subscribe({
      next: (order: OrderResponse) => {
        this.order = {
          ...order,
          dateOrder: this.formatDateForInput(order.dateOrder),
        };
      },
      error: () => {
        alert('Erreur lors du chargement de la commande');
        this.router.navigate(['/dashboard']);
      },
    });
  }

  formatDateForInput(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  saveOrder() {
    if (!this.order) return;

    const updatedOrder = {
      address: this.order.address,
      dateOrder: new Date(this.order.dateOrder).toISOString(),
    };

    this.integrationService.updateOrder(this.orderId, updatedOrder).subscribe({
      next: () => {
        alert('Commande modifiée avec succès');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert('Erreur lors de la modification de la commande');
      },
    });
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
