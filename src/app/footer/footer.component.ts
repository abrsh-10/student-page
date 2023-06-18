import { Component } from '@angular/core';
import { Feedback } from '../models/feedback';
import { FeedbackService } from './feedback.service';
import { PopupComponent, PopupData } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(
    private feedbackService: FeedbackService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  message!: string;
  feedback!: Feedback;
  submitFeedback() {
    const data: PopupData = {
      title: 'Send Feedback',
      content: ['are you sure you want to send feedback:', this.message],
      positiveButton: 'Yes',
      negativeButton: 'No',
    };
    const dialogRef = this.dialog.open(PopupComponent, { data });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.feedback = new Feedback(
          this.message,
          sessionStorage.getItem('email')!
        );
        this.feedbackService.postFeedback(this.feedback).subscribe();
        this.showSnackbarAction('your feedback is sent successfully', 'Done');
        this.message = ' ';
      } else {
        console.log('Dialog was closed');
        return;
      }
    });
  }
  showSnackbarAction(content: string, action: string | undefined) {
    let snack = this.snackBar.open(content, action);
    snack.afterDismissed().subscribe(() => {
      console.log('This will be shown after snackbar disappeared');
    });
    snack.onAction().subscribe(() => {
      console.log('This will be called when snackbar button clicked');
    });
  }
}
