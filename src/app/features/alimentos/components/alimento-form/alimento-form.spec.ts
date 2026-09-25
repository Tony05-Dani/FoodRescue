import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlimentoForm } from './alimento-form';

describe('AlimentoForm', () => {
  let component: AlimentoForm;
  let fixture: ComponentFixture<AlimentoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AlimentoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
