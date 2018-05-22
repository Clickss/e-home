import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEtageComponent } from './update-etage.component';

describe('UpdateEtageComponent', () => {
  let component: UpdateEtageComponent;
  let fixture: ComponentFixture<UpdateEtageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEtageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEtageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
