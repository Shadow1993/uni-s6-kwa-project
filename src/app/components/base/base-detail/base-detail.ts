import { Directive, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseModel } from "app/models/base-model";
import { BaseService } from "app/services/base/base-service";

@Directive()
export abstract class BaseDetail<T extends BaseModel> implements OnInit {

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  protected abstract service: BaseService<T>;
  entity: WritableSignal<T | null> = signal(null);

  ngOnInit(): void {
      this.activatedRoute.params.subscribe((parameters) => {
        if (parameters["id"]) {
          this.service.getById(parameters["id"]).subscribe((entity: T) => {
            this.entity.set(entity);
          });
        }
      });
    }
}