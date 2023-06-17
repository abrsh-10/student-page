import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentSolution } from 'src/app/models/assignment-solution';
import { Assignments } from 'src/app/models/assignments';

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
    this.assignmentSolution = new AssignmentSolution(
      this.selectedFile!,
      sessionStorage.getItem('email')!,
      this.description!,
      this.assignmentId!
    );
    this.dialogRef.close(this.assignmentSolution);
  }

  returnFalse(): void {
    this.dialogRef.close(false);
  }
}
