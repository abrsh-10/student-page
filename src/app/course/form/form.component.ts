import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentSolution } from 'src/app/models/assignment-solution';
import { Assignments } from 'src/app/models/assignments';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

export interface FormData {
  title: string;
  assignments: any[];
  fileIncluded: boolean;
  positiveButton: string;
  negativeButton?: string;
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  email?: string;
  file!: ElementRef;
  description?: string;
  assignmentId?: string;
  selectedFile?: File;
  assignmentSolution?: AssignmentSolution;
  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  returnTrue(): void {
    if (sessionStorage.getItem('token')) {
      const encryptedEmail = sessionStorage.getItem('token');
      const decryptedEmail = CryptoJS.AES.decrypt(
        encryptedEmail!.toString(),
        environment.jwtSecret
      ).toString(CryptoJS.enc.Utf8);
      this.email = decryptedEmail;
    }
    this.assignmentSolution = new AssignmentSolution(
      this.selectedFile!,
      this.email!,
      this.description!,
      this.assignmentId!
    );
    this.dialogRef.close(this.assignmentSolution);
  }

  returnFalse(): void {
    this.dialogRef.close(false);
  }
}
