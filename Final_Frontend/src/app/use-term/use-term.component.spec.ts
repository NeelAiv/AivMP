import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseTermComponent } from './use-term.component';

describe('UseTermComponent', () => {
  let component: UseTermComponent;
  let fixture: ComponentFixture<UseTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
