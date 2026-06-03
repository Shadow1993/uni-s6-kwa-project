import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseModel } from 'app/models/base-model';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService<T extends BaseModel> {
  
  protected abstract readonly url: string;

  protected http: HttpClient = inject(HttpClient);

  getAll() {
    return this.http.get<T[]>(this.url);
  }
  getById(id: number) {
    return this.http.get<T>(`${this.url}/${id}`);
  }
  create(entity: T) {
    return this.http.post<T>(this.url, entity);
  }
  update(id: number, entity: T) {
    return this.http.put<T>(`${this.url}/${id}`, entity);
  }
  patch(id: number, entity: any) {
    return this.http.patch<T>(`${this.url}/${id}`, entity);
  }
  delete(id: number) {
    return this.http.delete<T>(`${this.url}/${id}`);
  }
}
