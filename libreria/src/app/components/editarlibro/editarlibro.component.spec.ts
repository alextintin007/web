import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarlibroComponent } from './editarlibro.component';

describe('EditarlibroComponent', () => {
  let component: EditarlibroComponent;
  let fixture: ComponentFixture<EditarlibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarlibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarlibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
