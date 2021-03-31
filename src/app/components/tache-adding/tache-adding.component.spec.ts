import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheAddingComponent } from './tache-adding.component';

describe('TacheAddingComponent', () => {
  let component: TacheAddingComponent;
  let fixture: ComponentFixture<TacheAddingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheAddingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TacheAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
