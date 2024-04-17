import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CallMeDialogComponent} from "../../components/call-me-dialog/call-me-dialog.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private dialog: MatDialog) {
  }

  public openDialog(): void {
    this.dialog.open(CallMeDialogComponent);
  }
}
