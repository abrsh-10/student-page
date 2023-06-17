import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PopupData {
  title: string;
  content: any[];
  positiveButton: string;
  negativeButton?: string;
}
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData
  ) {}

  returnTrue(): void {
    this.dialogRef.close(true);
  }

  returnFalse(): void {
    this.dialogRef.close(false);
  }
}
