import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioResumo } from './relatorio-resumo';

describe('RelatorioResumo', () => {
  let component: RelatorioResumo;
  let fixture: ComponentFixture<RelatorioResumo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioResumo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioResumo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
