import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManyComponent } from './task-many-component';

describe('TaskManyComponent', () => {
  let component: TaskManyComponent;
  let fixture: ComponentFixture<TaskManyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskManyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskManyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
