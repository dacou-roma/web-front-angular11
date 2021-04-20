import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSpotComponent } from './project-spot.component';

describe('ProjectSpotComponent', () => {
  let component: ProjectSpotComponent;
  let fixture: ComponentFixture<ProjectSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSpotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
