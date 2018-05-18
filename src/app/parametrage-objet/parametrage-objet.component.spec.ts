import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrageObjetComponent } from './parametrage-objet.component';

describe('ParametrageObjetComponent', () => {
  let component: ParametrageObjetComponent;
  let fixture: ComponentFixture<ParametrageObjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrageObjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrageObjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
