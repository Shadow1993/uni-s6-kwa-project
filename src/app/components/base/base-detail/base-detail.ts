import { Directive, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmDialogComponent } from "app/components/dialogs/confirm-dialog-component/confirm-dialog-component";
import { BaseModel } from "app/models/base-model";
import { ConfirmDialog } from "app/models/confirm-dialog";
import { BaseService } from "app/services/base/base-service";

@Directive()
export abstract class BaseDetail<T extends BaseModel> implements OnInit {

  protected abstract urlRoute: string;

  protected activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  protected abstract service: BaseService<T>;
  private snackBar = inject(MatSnackBar);
  protected router: Router = inject(Router);
  entity: WritableSignal<T | null> = signal(null);

  protected data: ConfirmDialog = {
    title: 'Confirm Delete Action',
    message: 'Are you sure you want to delete this item?',
    confirmText: 'Yes, Delete',
    cancelText: 'Cancel'
  }

  private dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameters) => {
      if (parameters["id"]) {
        this.service.getById(parameters["id"]).subscribe((entity: T) => {
          this.entity.set(entity);
        });
      }
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {

        this.snackBar.open("Deleted item successfully", 'X', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' });
        this.service.delete(id).subscribe((entity: T) => this.router.navigateByUrl(`${this.urlRoute}`));
      }
    });
  }

  update(id: number) {
    this.router.navigateByUrl(`${this.urlRoute}/${id}/edit`);
  }
}