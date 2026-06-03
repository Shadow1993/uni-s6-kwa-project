import { Directive, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ConfirmDialogComponent } from "app/components/dialogs/confirm-dialog-component/confirm-dialog-component";
import { BaseModel } from "app/models/base-model";
import { ConfirmDialog } from "app/models/confirm-dialog";
import { BaseService } from "app/services/base/base-service";

@Directive()
export abstract class BaseMany<T extends BaseModel> implements OnInit {

  protected abstract service: BaseService<T>;

  private snackBar = inject(MatSnackBar);
  protected router: Router = inject(Router);

  protected entities: WritableSignal<T[]> = signal<T[]>([]);
  protected abstract urlRoute: string;

  protected data: ConfirmDialog = {
    title: 'Confirm Delete Action',
    message: 'Are you sure you want to delete this item?',
    confirmText: 'Yes, Delete',
    cancelText: 'Cancel'
  }

  private dialog: MatDialog = inject(MatDialog);

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.getAll().subscribe((entities: T[]) => this.entities.set(entities));
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {

        this.service.delete(id).subscribe((entity: T) => this.refresh());
        this.snackBar.open("Deleted item successfully", 'X' , { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right'});
      }
    });
  }

  update(id: number) {
    this.router.navigateByUrl(`${this.urlRoute}/${id}/edit`);
  }

  add() {
    this.router.navigateByUrl(`${this.urlRoute}/new`);
  }

  detail(id: number) {
    this.router.navigateByUrl(`${this.urlRoute}/${id}`);
  }
}