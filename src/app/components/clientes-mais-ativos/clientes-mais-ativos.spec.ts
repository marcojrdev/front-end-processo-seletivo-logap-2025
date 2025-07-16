import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesMaisAtivos } from './clientes-mais-ativos';

describe('ClientesMaisAtivos', () => {
  let component: ClientesMaisAtivos;
  let fixture: ComponentFixture<ClientesMaisAtivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesMaisAtivos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesMaisAtivos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
