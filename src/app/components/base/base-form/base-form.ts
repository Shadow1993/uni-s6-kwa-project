import { Directive, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseModel } from "app/models/base-model";
import { BaseService } from "app/services/base/base-service";

@Directive()
export abstract class BaseForm<T extends BaseModel> implements OnInit {

  private router: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  protected abstract service: BaseService<T>;
  protected abstract urlRoute: string;
  abstract entity: FormGroup;
  id: WritableSignal<number | null> = signal(null);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameters) => {
      if (parameters["id"]) {
        this.id.set(parameters["id"]);
        this.service.getById(parameters["id"]).subscribe((entity: T) => {
          this.entity.patchValue(entity);
        });
      }
    });
  }

  compare(ent1: T, ent2: T): boolean {
    return ent1?.id === ent2?.id && ent1?.id !== undefined;
  }

  onSubmit(): void {
    const currentId = this.id();
    if (currentId !== null) {
      this.service.update(currentId, this.entity.value).subscribe((r) => {
        this.snackBar.open("Updated item successfully", 'X', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' });
        this.redirect();
      }, (err) => {
        this.snackBar.open("Something went wrong..", 'X', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' });
      });
    } else {
      this.service.create(this.entity.value).subscribe((r) => {
        this.snackBar.open("Created item successfully", 'X', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' });
        this.redirect();
      }, (err) => {
        this.snackBar.open("Something went wrong..", 'X', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'right' });
      });
    }
  }

  private redirect = () => {
    this.router.navigateByUrl(`/${this.urlRoute}`);
  }
}