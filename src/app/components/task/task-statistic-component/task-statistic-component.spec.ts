import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskStatisticComponent } from './task-statistic-component';

describe('TaskStatisticComponent', () => {
  let component: TaskStatisticComponent;
  let fixture: ComponentFixture<TaskStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskStatisticComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskStatisticComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
