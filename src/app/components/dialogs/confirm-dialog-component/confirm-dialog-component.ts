import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialog } from 'app/models/confirm-dialog';

@Component({
  selector: 'app-confirm-dialog-component',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './confirm-dialog-component.html',
  styleUrl: './confirm-dialog-component.scss',
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<ConfirmDialog>(MAT_DIALOG_DATA);

  // ?? = nullish coalescing operator
  title: string = this.data?.title ?? "Confirm";
  message: string = this.data?.message ?? "Are you sure?";
  confirmText: string = this.data?.confirmText ?? "Confirm";
  cancelText: string = this.data?.cancelText ?? "Cancel";

  onNoClick(): void {
    this.dialogRef.close();
  }
}
