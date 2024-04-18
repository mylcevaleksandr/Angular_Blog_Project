import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-call-me-dialog',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './call-me-dialog.component.html',
  styleUrls: ['./call-me-dialog.component.scss']
})
export class CallMeDialogComponent implements OnInit {
  public name: string = '';
  public phone: string = '';

  constructor(public dialogRef: MatDialogRef<CallMeDialogComponent>) {
  }

  public callMe(): void {
    console.log(this.name);
    console.log(this.phone);

    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
