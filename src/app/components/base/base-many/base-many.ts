import { Directive, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { Router } from "@angular/router";
import { BaseModel } from "app/models/base-model";
import { BaseService } from "app/services/base/base-service";

@Directive()
export abstract class BaseMany<T extends BaseModel> implements OnInit {

  protected abstract service: BaseService<T>;
  protected entities: WritableSignal<T[]> = signal<T[]>([]);
  protected router: Router = inject(Router);
  protected abstract urlRoute: string;

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.service.getAll().subscribe((entities: T[]) => this.entities.set(entities));
  }

  delete(id: number): void {
    this.service.delete(id).subscribe((entity: T) => this.refresh());
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