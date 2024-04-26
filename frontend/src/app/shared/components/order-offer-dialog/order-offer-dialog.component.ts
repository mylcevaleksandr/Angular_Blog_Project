import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CategoriesService} from "../../services/categories.service";
import {DialogDataType} from "../../../../types/dialog-data.type";
import {CategoriesResponseType} from "../../../../types/categories-response.type";
import {CommonModule} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {OkDialogComponent} from "../ok-dialog/ok-dialog.component";

@Component({
  selector: 'app-order-offer-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './order-offer-dialog.component.html',
  styleUrls: ['./order-offer-dialog.component.scss']
})
export class OrderOfferDialogComponent implements OnInit {
  public serviceForm = this.fb.group({
    userName: ['', Validators.required],
    phone: ['', Validators.required]
  });
  public name: string = '';
  public phone: string = '';
  @ViewChild('serviceSelect') serviceSelect!: ElementRef;
  public services: CategoriesResponseType[] | null = null;
  public requestError: boolean = false;

  constructor(private dialog: MatDialog,
              public dialogRef: MatDialogRef<OrderOfferDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public serviceType: DialogDataType,
              private fb: FormBuilder,
              private categoriesService: CategoriesService) {
  }

  public serviceRequest(): void {
    this.categoriesService.requestService(this.serviceForm.value.userName!, this.serviceForm.value.phone!, this.serviceSelect.nativeElement.value, 'order').subscribe({
      next: (data: DefaultResponseType) => {
        console.log(data);
        if (!(data as DefaultResponseType).error) {
          this.dialog.open(OkDialogComponent);
          this.dialogRef.close();
        }
      },
      error: (err) => {
        console.log(err.error);
        this.requestError = true;
        setTimeout(() => {
          this.requestError = false;
        }, 3000);
      }
    });
  }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((data: CategoriesResponseType[]) => {
      this.services = data;
    });
  }

}
