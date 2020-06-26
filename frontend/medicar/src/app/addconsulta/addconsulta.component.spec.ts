import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddconsultaComponent } from './addconsulta.component';

describe('AddconsultaComponent', () => {
  let component: AddconsultaComponent;
  let fixture: ComponentFixture<AddconsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddconsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
