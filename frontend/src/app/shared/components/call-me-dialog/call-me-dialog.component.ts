import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-call-me-dialog',
  templateUrl: './call-me-dialog.component.html',
  styleUrls: ['./call-me-dialog.component.scss']
})
export class CallMeDialogComponent {
  public name: string = '';
  public phone: string = '';

  constructor(public dialogRef: MatDialogRef<CallMeDialogComponent>) {
  }

  public callMe(): void {
    console.log(this.name);
    console.log(this.phone);
    this.dialogRef.close();
  }

}
