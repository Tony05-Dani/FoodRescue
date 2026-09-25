import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarAlimento } from './editar-alimento';

describe('EditarAlimento', () => {
  let component: EditarAlimento;
  let fixture: ComponentFixture<EditarAlimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAlimento],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarAlimento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
