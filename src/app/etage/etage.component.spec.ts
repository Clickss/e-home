import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtageComponent } from './etage.component';

describe('EtageComponent', () => {
  let component: EtageComponent;
  let fixture: ComponentFixture<EtageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
