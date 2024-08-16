import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wdm-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() path: string | null = null;

  router = inject(Router);

  redirectRoute() {
    if (this.path) this.router.navigate([this.path]);
  }
}
