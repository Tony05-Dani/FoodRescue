import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearAlimento } from './crear-alimento';

describe('CrearAlimento', () => {
  let component: CrearAlimento;
  let fixture: ComponentFixture<CrearAlimento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAlimento],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearAlimento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
