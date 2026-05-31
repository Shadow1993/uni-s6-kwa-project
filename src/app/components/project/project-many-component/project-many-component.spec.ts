import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManyComponent } from './project-many-component';

describe('ProjectManyComponent', () => {
  let component: ProjectManyComponent;
  let fixture: ComponentFixture<ProjectManyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectManyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectManyComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
