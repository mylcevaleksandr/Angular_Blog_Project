import {Component} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {MatDialog} from "@angular/material/dialog";
import {OrderOfferDialogComponent} from "../../shared/components/order-offer-dialog/order-offer-dialog.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private dialog: MatDialog) {
  }

  customOptionsOffer: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 0,
    dots: true,
    navSpeed: 700,
    navText: [``, ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
    },
    nav: false,
  };

  public orderService(serviceType: string) {
    this.dialog.open(OrderOfferDialogComponent, {
      data: {serviceType}
    });
  }
}
