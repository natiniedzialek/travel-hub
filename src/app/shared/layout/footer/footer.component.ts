import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  basketCount: number = 0;

  @Output() basketClicked = new EventEmitter<void>();

  updateBasketCount(newCount: number) {
    this.basketCount = newCount;
  }

  handleBasketClick() {
    return;
  }
}
