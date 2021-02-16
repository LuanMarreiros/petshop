import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAssistenteComponent } from './home-assistente.component';

describe('HomeAssistenteComponent', () => {
  let component: HomeAssistenteComponent;
  let fixture: ComponentFixture<HomeAssistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAssistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAssistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
