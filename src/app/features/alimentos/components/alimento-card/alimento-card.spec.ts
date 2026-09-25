import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlimentoCard } from './alimento-card';

describe('AlimentoCard', () => {
  let component: AlimentoCard;
  let fixture: ComponentFixture<AlimentoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AlimentoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
