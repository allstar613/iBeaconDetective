import { Component, Input } from '@angular/core';

/**
 * Generated class for the FlashCardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'flash-card',
  templateUrl: 'flash-card.html'
})
export class FlashCardComponent {

  @Input('isFlipped') flipCard: boolean;

  constructor() {

  }

}
