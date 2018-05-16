import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddobjetComponent } from './addobjet.component';

describe('AddobjetComponent', () => {
  let component: AddobjetComponent;
  let fixture: ComponentFixture<AddobjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddobjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddobjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
