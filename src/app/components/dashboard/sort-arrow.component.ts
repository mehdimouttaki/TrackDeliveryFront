import { Component, Input } from '@angular/core';

@Component({
  selector: 'sort-arrow',
  standalone: true,
  template: `
    <span *ngIf="currentColumn === column" class="inline-block ml-1">

      <svg *ngIf="direction === 'asc'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7" />
      </svg>


      <svg *ngIf="direction === 'desc'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  `,
})
export class SortArrow {
  @Input() column!: string;
  @Input() currentColumn!: string;
  @Input() direction!: 'asc' | 'desc';
}
