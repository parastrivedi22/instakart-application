import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  imageSource: String[] = [
    'https://rukminim1.flixcart.com/fk-p-flap/1200/550/image/f633b6a9f3207470.png?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1200/550/image/5ab6382cb06ecbd7.jpg?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/1200/550/image/846f2628252737a2.png?q=20',
    'https://rukminim1.flixcart.com/fk-p-flap/780/347/image/175dc2d004a6bff2.png?q=60',
    'https://rukminim1.flixcart.com/fk-p-flap/3650/1650/image/7ecc1879308d1081.png?q=20'

  ]

}
